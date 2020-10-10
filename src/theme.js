import { convertUnit } from "./utils";
export const color = [
	"#276FFE",
	"#30BF60",
	"#E65322",
	"#FFC619",
	"#40C0FF",
	"#955CE6",
	"#FF668C",
	"#00CCCC",
	"#637599",
	"#223073",
	"#F24848",
];
export const theme = {
	forceFit: true,
	padding: "auto",
	title: {
		visible: false,
	},
	description: {
		visible: false,
	},
	lineSize: 1.5,
	// 设备像素比
	pixelRatio: window.devicePixelRatio,
	legend: {
		visible: true,
		flipPage: true,
		marker: {
			symbol: "circle",
			style: {
				r: 2,
			},
		},
		text: {
			style: {
				fontSize: 11,
			},
		},
	},
	xAxis: {
		line: {
			style: {
				stroke: "#E1E1E6",
				lineWidth: 0.5,
			},
		},
		tickLine: {
			visible: false,
		},
		tickCount: 8,
		label: {
			autoRotate: true,
			style: {
				fontSize: 9,
				fill: "#333333",
			},
		},
	},
	yAxis: {
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
	tooltip: {
		domStyles: {
			"g2-tooltip-title": {
				color: "#333333",
				fontSize: "11px",
				fontWeight: 500,
			},
			"g2-tooltip-list": {
				color: "#666666",
				fontWeight: 400,
				fontSize: "11px",
				paddingBottom: "6px",
			},
			"g2-tooltip-marker": {
				width: "5px",
				height: "5px",
			},
			"g2-tooltip-value": {
				color: "#333333",
				fontWeight: 400,
				fontSize: "11px",
			},
			"g2-tooltip-list-item": {
				margin: "6px 0",
			},
		},
	},
	color,
};
