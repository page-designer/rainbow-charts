import React, { memo } from "react";
import { LegendWrapper, LegendItem } from "./style";

// antv 的图表库legend文字多了会省略，还是自己写吧~
function Legend({ data }) {
	return (
		<LegendWrapper>
			{data.map(item => (
				<LegendItem color={item.color} key={item.name}>
					{item.name}
				</LegendItem>
			))}
		</LegendWrapper>
	);
}

export default memo(Legend);
