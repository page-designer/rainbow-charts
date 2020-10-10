import styled from "styled-components";

export const LegendWrapper = styled.ul`
	padding: 0 20px;
	font-size: 11px;
	line-height: 11px;
	color: #6d7380;
`;
export const LegendItem = styled.li`
	position: relative;
	display: inline-block;
	margin: 0 16px 8px 0;
	padding-left: 9px;
	&:last-child {
		margin-right: 0;
	}
	&::before {
		position: absolute;
		content: "";
		width: 5px;
		height: 5px;
		left: 0;
		top: 3px;
		border-radius: 50%;
		background: ${props => props.color};
	}
`;
