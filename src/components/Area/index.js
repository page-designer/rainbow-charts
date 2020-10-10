import React, { memo } from "react";
import { Area, StackedArea } from "@ant-design/charts";
import _ from "lodash";
import { getGroupData, getLegendData } from "../../utils";
import Legend from "../Legend";
import { theme } from "../../theme";

function RBArea({ item, sourceData }) {
	const {
		height,
		legendShow,
		smooth,
		labelShow,
		pointShow,
		pointSize,
		pointShape,
		isStacked,
	} = item;

	const data = getGroupData(sourceData);

	const legendData = getLegendData(data);

	const config = _.merge({}, theme, {
		height: height - 50,
		data,
		xField: "xValue",
		yField: "yValue",
		seriesField: "type",
		stackField: "type",
		legend: {
			visible: false,
		},
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
	});

	return (
		<div>
			{legendShow && <Legend data={legendData} />}
			{isStacked ? (
				// 堆叠
				<StackedArea {...config} />
			) : (
				<Area {...config} />
			)}
		</div>
	);
}

export default memo(RBArea);
