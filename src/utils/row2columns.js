import _ from "lodash";
//行转列 数据横向倒置

/*
	* 						list : data.data.list,
							columns : data.data.columns,
							defaultValue : '',
							columnFileds : '日用户新增',
							groupFileds : '日活跃用户;日付费用户'
	*/

/*{
		defaultValue : '', //横向倒置时无数据时的默认值
		columnFileds : '',   //需要倒置的列多个用","分割
		groupFileds : '',   //横向倒置列中 对应的列数据 用";"分割，用","分割则是对应上面";"
		columns : [], //数据列
		list : [],   // 数据
		prefix : 'CFX_PREFIX'
	}*/
function row2columns(props = {}) {
	const defaultProps = {
		defaultValue: "",
		columnFileds: "", // 多个用","分割
		groupFileds: "", // 多个用";"分割，多组用","分割,对应columnFileds中的每项
		columns: [],
		list: [],
		prefix: "PREFIX",
	};
	const data = _.extend({}, defaultProps, props);
	// 源数据
	const sourceData = {
		columns: data.columns,
		list: data.list,
	};
	const { columnFileds, groupFileds, defaultValue: COL_default, prefix: CFX_PREFIX } = data;
	// 所有相关的列
	const allConfigColumns = getAllConfigColumns(columnFileds, groupFileds);

	// 没有配置则返回原数据
	if (columnFileds === "" || groupFileds === "") return sourceData;
	//检测  columnFileds,columnFileds的列是否存在 否则直接返回
	if (!checkConfig(sourceData.columns, allConfigColumns)) {
		throw new TypeError("横向倒置中有列不存在！");
	}

	var array_splice = function (index, arr) {
		// console.log("index----------arr", JSON.parse(JSON.stringify({ index, arr })));

		var self = this,
			undef;
		if (!_.isArray(arr)) return false;
		if (index === undef) return arr;

		var call = index;

		var _arr = copy(arr);
		var index = _.isArray(index) ? index : _.isFunction(index) ? [] : [index];
		var _index = {};
		_.each(index, function (v, i) {
			_index[v] = true;
		});

		arr.length = 0;

		_.each(_arr, function (v, i) {
			if (_.isFunction(call)) {
				var r = call.call(v, i, v);
				if (r === true) {
					_index[i] = true;
				}
			}
			if (!(i in _index)) {
				arr.push(v);
			}
		});

		return arr;
	};
	//并不是深复制
	var copy = function (data) {
		if (_.isArray(data)) {
			return [].concat(data);
		} else if (_.isPlainObject(data)) {
			return _.extend({}, data);
		} else {
			return data;
		}
	};

	//分类列 如果没有设置columnFileds 那么就把出了columnFileds的所有列作为分类
	//var _mf = $.trim( options.transferGroupColumns ) ? options.transferGroupColumns.split(";") : [];
	//mfield = _mf || (...)();
	var mfield = (function () {
		//剔除  columnFileds groupFileds 后的列信息
		var columns = sourceData.columns;
		var __cols = {};
		_.each(allConfigColumns, function (v, i) {
			__cols[v] = true;
		});

		var cols = copy(columns);
		// console.log("cols前", JSON.parse(JSON.stringify(cols)));

		array_splice(function (i, v) {
			if (v in __cols) return true;
		}, cols);

		// console.log("cols后", JSON.parse(JSON.stringify(cols)));
		return cols;
	})();

	// console.log("mfield", JSON.parse(JSON.stringify(mfield)));

	function setCFX_PREFIX(s) {
		var s = s.toString();
		return CFX_PREFIX + s;
	}
	function unsetCFX_PREFIX(s) {
		var s = s.toString();
		return s.replace(CFX_PREFIX, "");
	}
	function parseData(columns, list) {
		var data = [],
			undef;
		_.each(list, function (d, i) {
			var _d = {};
			_.each(columns, function (key, i) {
				var value = d[i] === undef ? "" : d[i];
				_d[setCFX_PREFIX(key)] = value;
			});
			data.push(_d);
		});
		return data;
	}
	function _switchColumnsStep(c, d, data) {
		// console.log("_switchColumnsStep", JSON.parse(JSON.stringify({ c, d, data })));

		//c计算列eg：游戏名 d数据列用 ;分割 eg新增人数;付费人数 data源数据
		var undef;
		data = data === undef ? [] : data;
		if (c === "" || d === "") return data;
		//转换成后面需要用的array格式
		c = c.split(",");
		d = d.split(",");
		_.each(d, function (v, i) {
			// d[i] = v.split([";"]);
			d[i] = v.split(";");
		});
		/*
                    遍历数据源data,并把需要倒置的列换成如下格式
                    前：
                        列信息 : {日期:true}
                        [
                            {日期:'2014-06-06','游戏名':'水果忍者',新增人数:120,付费人数:80},
                            {日期:'2014-06-05','游戏名':'水果忍者',新增人数:120,付费人数:80},
                            {日期:'2014-06-05','游戏名':'神庙逃亡',新增人数:120,付费人数:80}
                        ] 
                        
                    后: 
                        列信息 : {日期:true,水果忍者_新增人数:true,水果忍者_付费人数:true,神庙逃亡_新增人数:true,神庙逃亡_付费人数:true}
                        [
                            {日期:'2014-06-06',水果忍者_新增人数:120,水果忍者_付费人数:80},
                            {日期:'2014-06-05',水果忍者_新增人数:120,水果忍者_付费人数:80},
                            {日期:'2014-06-05',神庙逃亡_新增人数:120,神庙逃亡_付费人数:80},
                        ]	
                    并按	列信息分组合并 注意如果分组里有相同列信息 那么后面的列会替换原来的信息，这不属于BUG而是要确保数据源的唯一性
                    分组信息:
                        {
                            2014-06-06 : {水果忍者_新增人数:120,水果忍者_付费人数:80},
                            2014-06-05 : {水果忍者_新增人数:120,水果忍者_付费人数:80,神庙逃亡_新增人数:120,神庙逃亡_付费人数:80}
                        }
                    分组信息才是想得到的结果
                */
		//统计需要用到的所有列信息
		var columns = {};
		var group_data = {};
		_.each(mfield, function (v, i) {
			columns[setCFX_PREFIX(v)] = true; //列信息 前
		});
		// console.log("columns----", JSON.parse(JSON.stringify(columns)));

		_.each(data, function (dt, i) {
			var _d = _.extend({}, dt); //副本

			_.each(c, function (_c, i) {
				// 删除原数据
				delete dt[setCFX_PREFIX(_c)];

				// 原数据副本
				var m_c = _d[setCFX_PREFIX(_c)];

				// 每一列的要倒置的数据集c[0] = [活跃_人数,活跃_占比,新增_人数,新增_占比,付费_人数,付费_占比]
				var _dd = d[i];
				_.each(_dd, function (m_dd, i) {
					delete dt[setCFX_PREFIX(m_dd)];
					var _m_c = _dd.length > 1 ? [m_c, m_dd].join("_") : m_c;
					dt[setCFX_PREFIX(_m_c)] = _d[setCFX_PREFIX(m_dd)];
					columns[setCFX_PREFIX(_m_c)] = COL_default; ////列信息 后
				});
			});
			var gname = [setCFX_PREFIX("")];
			_.each(mfield, function (v, i) {
				gname.push(dt[setCFX_PREFIX(v)]);
			});
			group_data[gname.join("_")] = group_data[gname.join("_")] || {};
			_.extend(group_data[gname.join("_")], dt);
		});
		// console.log("group_data----", group_data);
		/*
                    
                    对分组数据处理 主要是设置列 和 对分组数据的列保持一致
                    列信息 : {日期:true,水果忍者_新增人数:true,水果忍者_付费人数:true,神庙逃亡_新增人数:true,神庙逃亡_付费人数:true}
                    分组信息:
                        {
                            2014-06-06 : {水果忍者_新增人数:120,水果忍者_付费人数:80},
                            2014-06-05 : {水果忍者_新增人数:120,水果忍者_付费人数:80,神庙逃亡_新增人数:120,神庙逃亡_付费人数:80}
                        }
                    处理后
                        列信息 : {日期:true,水果忍者_新增人数:true,水果忍者_付费人数:true,神庙逃亡_新增人数:true,神庙逃亡_付费人数:true}
                        {
                            2014-06-06 : {水果忍者_新增人数:120,水果忍者_付费人数:80,神庙逃亡_新增人数:0,神庙逃亡_付费人数:0},
                            2014-06-05 : {水果忍者_新增人数:120,水果忍者_付费人数:80,神庙逃亡_新增人数:120,神庙逃亡_付费人数:80}
                        }
                    最后得到最终的数据
                        columns : [日期,水果忍者_新增人数,水果忍者_付费人数,神庙逃亡_新增人数,神庙逃亡_付费人数]
                        list : [
                            [2014-06-06,120,80,0,0],
                            [2014-06-05,120,80,0,0]
                        ]	
                */
		var _data = [];
		var _columns = [];
		_.each(columns, function (v, col) {
			_columns.push(unsetCFX_PREFIX(col));
		});
		_.each(group_data, function (dt, i) {
			dt = _.extend({}, columns, dt);
			var _d = [];
			_.each(_columns, function (col, i) {
				_d.push(dt[setCFX_PREFIX(col)]);
			});
			_data.push(_d);
		});
		// console.log(
		// 	"result----",
		// 	JSON.parse(
		// 		JSON.stringify({
		// 			columns: _columns,
		// 			list: _data,
		// 		})
		// 	)
		// );

		return {
			columns: _columns,
			list: _data,
		};
	}

	return _switchColumnsStep(
		columnFileds,
		groupFileds,
		parseData(sourceData.columns, sourceData.list)
	);
	// return _switchColumns(data);
}

// 计算所有涉及到的列
function getAllConfigColumns(columnFileds, groupFileds) {
	const cols = columnFileds.split(",");
	// 有多组就展开成一维数组
	const groups = groupFileds.split(",").reduce((result, item) => {
		result = result.concat(item.split(";"));
		return result;
	}, []);
	// console.log("cols=================groups", cols, groups);

	return [...cols, ...groups];
}

// 检查配置参数
function checkConfig(columns, allConfigColumns) {
	for (let i = 0; i < allConfigColumns.length; i++) {
		if (!columns.includes(allConfigColumns[i])) {
			return false;
		}
	}
	return true;
}
export default row2columns;
