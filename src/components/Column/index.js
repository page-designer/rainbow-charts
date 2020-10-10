import React, { memo } from "react";
import { GroupedColumn } from "@ant-design/charts";
import _ from "lodash";
import { getGroupData, getLegendData } from "../../utils";
import Legend from "../Legend";
import { theme } from "../../theme";

function RBColumn({ item, sourceData }) {
	const { height, legendShow, labelShow, labelPosition } = item;

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
		label: {
			visible: labelShow,
			position: labelPosition,
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
		},
		groupField: "type",
		stackField: "type",
	});

	return (
		<div>
			{legendShow && <Legend data={legendData} />}
			<GroupedColumn {...config} />
		</div>
	);
}

export default memo(RBColumn);
