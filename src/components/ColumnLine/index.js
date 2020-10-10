import React, { memo } from "react";
import { GroupedColumnLine } from "@ant-design/charts";
import _ from "lodash";
import { convertUnit, getGroupData, getLegendData } from "../../utils";
import Legend from "../Legend";
import { theme, color } from "../../theme";

function RBColumnLine({ item, sourceData }) {
	const {
		height,
		chartTypes,
		legendShow,
		labelShow,
		labelPosition,
		smooth,
		pointShow,
		pointShape,
		pointSize,
	} = item;

	const data = getGroupData(sourceData);
	const legendData = getLegendData(data);

	const columnCharts = chartTypes
		.filter(item => item.type === "column")
		.map(item => item.columnName);

	const lineCharts = chartTypes.filter(item => item.type === "line").map(item => item.columnName);

	const y1Data = data
		.filter(item => columnCharts.includes(item.type))
		.map(item => ({
			xValue: item.xValue,
			type1: item.type,
			yValue1: item.yValue,
		}));
	const y2Data = data
		.filter(item => lineCharts.includes(item.type))
		.map(item => ({
			xValue: item.xValue,
			type2: item.type,
			yValue2: item.yValue,
		}));

	const config = _.merge({}, theme, {
		height: height - 50,
		data: [y1Data, y2Data],
		xField: "xValue",
		yField: ["yValue1", "yValue2"],
		columnGroupField: "type1",
		lineSeriesField: "type2",
		legend: {
			visible: false,
		},
		xAxis: {
			title: {
				visible: false,
			},
		},
		yAxis: {
			title: {
				visible: false,
			},
			leftConfig: {
				grid: {
					visible: true,
					line: {
						style: {
							stroke: "#EDEDF2",
							lineDash: [4, 5],
							lineWidth: 1,
						},
					},
				},
				tickCount: 6,
				label: {
					autoRotate: true,
					style: {
						fontSize: 9,
						fill: "#333333",
					},
					formatter: convertUnit,
				},
			},
			rightConfig: {
				grid: {
					visible: true,
					line: {
						style: {
							stroke: "#EDEDF2",
							lineDash: [4, 5],
							lineWidth: 0.5,
						},
					},
				},
				tickCount: 6,
				label: {
					autoRotate: true,
					style: {
						fontSize: 9,
						fill: "#333333",
					},
					formatter: convertUnit,
				},
			},
		},
		columnConfig: {
			label: {
				visible: labelShow,
				position: labelPosition,
			},
			// 柱状图先取色
			color: color.slice(0, columnCharts.length),
		},
		lineConfig: {
			lineSize: 1.5,
			smooth: smooth,
			label: {
				visible: labelShow,
				type: "point",
			},
			point: {
				visible: pointShow,
				size: pointSize,
				shape: pointShape,
			},
			// 折线图后取色
			color: color.slice(columnCharts.length, columnCharts.length + lineCharts.length),
		},
	});

	return (
		<div>
			{legendShow && <Legend data={legendData} />}
			<GroupedColumnLine {...config} />
		</div>
	);
}

export default memo(RBColumnLine);
