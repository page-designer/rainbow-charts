import React, { memo } from "react";
import { Line } from "@ant-design/charts";
import _ from "lodash";
import { getGroupData, getLegendData } from "../../utils";
import Legend from "../Legend";
import { theme } from "../../theme";

function RBLine({ item, sourceData }) {
	const { height, legendShow, smooth, labelShow, pointShow, pointSize, pointShape } = item;

	const data = getGroupData(sourceData);
	const legendData = getLegendData(data);

	const config = _.merge({}, theme, {
		height: height - 50,
		data,
		xField: "xValue",
		yField: "yValue",
		seriesField: "type",
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
			<Line {...config} />
		</div>
	);
}

export default memo(RBLine);
