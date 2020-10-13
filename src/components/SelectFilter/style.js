import styled from "styled-components/macro";
import checkedIcon from "./images/checked.png";

export const SelectFilterWrapper = styled.div`
	height: ${props => `${props.height}px`};
`;
export const SelectFilterContent = styled.div`
	position: fixed;
	width: 100%;
	z-index: 11;
	background: #fff;
	.am-menu {
		position: absolute;
		width: 100%;
		top: 100%;
		left: 0;
		z-index: 11;
		background: #fff;
		input {
			font-size: 0.26rem;
		}
	}
	.am-list-item {
		min-height: 32px;
		padding-left: 16px;
		margin-bottom: 4px;
		.am-list-line {
			padding-right: 16px;
		}
	}
	.am-list .am-list-item.am-radio-item .am-list-line .am-list-extra .am-radio {
		height: 32px;
	}
	.am-list-item .am-list-line .am-list-content {
		padding-top: 0;
		padding-bottom: 0px;
	}
	.am-list-body {
		border: none;
		background-color: #f5f5fa;
	}
	.am-menu .am-flexbox .am-flexbox-item:first-child .am-list .am-list-body {
		background-color: #fff;
		&::before {
			display: none;
		}
	}
	.am-menu
		.am-flexbox
		.am-flexbox-item:last-child
		.am-list
		.am-list-item.am-sub-menu-item-selected
		.am-list-line
		.am-list-content {
		color: #276ffe;
	}
	.am-radio-inner {
		width: 16px;
		height: 16px;
		background-size: 16px 16px;
		&::after {
			border: none;
		}
	}
	.am-list .am-list-item.am-radio-item .am-list-line .am-list-extra .am-radio-inner {
		top: 8px;
		right: 16px;
	}
	.am-menu .am-flexbox .am-flexbox-item:first-child .am-list .am-list-item {
		background-color: #fff;
		&.am-menu-selected {
			background-color: #f5f5fa;
			position: relative;
			&::before {
				position: absolute;
				left: 0;
				top: 0;
				width: 4px;
				height: 100%;
				background-color: #276ffe;
				content: "";
			}
		}
	}
	.am-menu .am-flexbox .am-flexbox-item:first-child {
		background-color: #fff;
		.am-radio.am-radio-checked .am-radio-inner {
			background-image: ${`url(${checkedIcon})`};
		}
	}
	.am-menu .am-flexbox .am-flexbox-item:last-child:not(:only-child) {
		background-color: #f5f5fa;
		.am-list-item {
			background-color: #f5f5fa;
		}
	}
`;
export const SearchBar = styled.div`
	padding: 0 16px;
	font-size: 0.24rem;
	color: #333333;
`;
export const ArrowIcon = styled.i`
	display: inline-block;
	width: 8px;
	height: 8px;
	margin: 0 4px;
	background-size: 8px 8px;
`;
export const SelectFilterMask = styled.div`
	position: fixed;
	width: 100%;
	z-index: 10;
	left: 0;
	right: 0;
	top: 100px;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
`;
