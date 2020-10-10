import _ from "lodash";
import { color } from "../theme";

export { default as row2columns } from "./row2columns";

export function uuid() {
	return Math.random().toString(16).slice(2, 8);
}

function toNumber(value) {
	if (value === "" || value === null) {
		return null;
	}
	return isNaN(_.toNumber(value)) ? value : _.toNumber(value);
}

export function convertUnit(inputNum) {
	let num = 0;
	let absNum;
	if (typeof inputNum === "string") {
		num = Number(inputNum);
	} else {
		num = inputNum;
	}
	if (isNaN(num)) {
		return inputNum;
	}

	absNum = Math.abs(num);

	if (absNum >= 10000000) {
		num = num / 10000000;
		num = num.toFixed(1) + "kw";
	} else if (absNum >= 10000) {
		num = num / 10000;
		num = num.toFixed(1) + "w";
	}

	return num;
}

// 优化性能，判断参数是否相等，返回false的时候才更新组件
export function isPropsEqual(prevProps, nextProps) {
	if (JSON.stringify(prevProps.item) !== JSON.stringify(nextProps.item)) {
		return false;
	}
	return true;
}

// 转换columns, list的数据格式为对象数组形式
export function columnsToObj(data) {
	const { columns, list } = data;
	return list.reduce((acc, item) => {
		acc.push(
			item.reduce((obj, it, index) => {
				obj[columns[index]] = toNumber(it);
				return obj;
			}, {})
		);
		return acc;
	}, []);
}

// 分割换行和空格成标准数据
export function transformMockData(mockData) {
	const data = mockData.split(/\n/).map(item => item.split(/\s/));
	const [columns, ...list] = data;
	return {
		columns,
		list,
	};
}
// 千分位
export function toThousands(num, decimal = 2) {
	if (/^[0-9.]*$/.test(num)) {
		num = _.round(num, decimal)
			.toString()
			.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
	} else {
		return num;
	}
}

export function getGroupData(data) {
	const { columns, list } = data;
	const groupData = list.reduce((dataArray, item) => {
		dataArray = dataArray.concat(
			item.reduce((arr, it, ind) => {
				if (ind > 0) {
					arr.push({
						xValue: item[0],
						type: columns[ind],
						yValue: toNumber(it),
						// yValue: it,
					});
				}
				return arr;
			}, [])
		);
		return dataArray;
	}, []);
	return groupData;
}

export function getLegendData(data) {
	return data.reduce((acc, item) => {
		if (!acc.find(it => it.name === item.type)) {
			acc.push({
				name: item.type,
				color: color[acc.length],
			});
		}
		return acc;
	}, []);
}
