import styled from "styled-components";

export const IndexPanelItem = styled.div`
	display: flex;
	padding: 0.4rem 16px 0.32rem;
	background: #fff;
	.index-item {
		flex: 1;
		.metrice_value_1d {
			/* font-size: 20px;
			line-height: 20px; */
			font-size: 0.4rem;
			line-height: 0.4rem;
			color: #333333;
			font-weight: 500;
			/* margin-bottom: 8px; */
			margin-bottom: 0.16rem;
		}
		.metrice_name {
			/* font-size: 11px;
			line-height: 11px; */
			font-size: 0.22rem;
			line-height: 0.22rem;
			color: #333333;
			font-weight: 400;
			/* margin-bottom: 8px; */
			margin-bottom: 0.16rem;
		}
		.increase_pct_against_p1d {
			/* font-size: 10px;
			line-height: 10px; */
			font-size: 0.2rem;
			line-height: 0.2rem;
			color: #666666;
			font-weight: 500;
			/* margin-bottom: 4px; */
			margin-bottom: 0.08rem;
			&:last-child {
				/* margin-bottom: 16px; */
				margin-bottom: 0.32rem;
			}
		}
		.increase_value {
			/* margin-left: 4px; */
			margin-left: 0.08rem;
		}
	}
`;

export const IndexPanelContainer = styled.div`
	overflow: hidden;
	.swiper-pagination-bullets {
		.swiper-pagination-bullet {
			width: 12px;
			height: 2px;
			border-radius: 0;
			margin: 0 2px;
		}
	}
`;
