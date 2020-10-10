import styled from "styled-components";

export const TableWrapperStyle = styled.div`
	margin: 0 16px;
	padding-bottom: 16px;
	.m-rb-table {
		width: 100%;
		display: flex;
		font-size: 0.22rem;
		.right-side {
			flex: 1;
			overflow: auto;
			&::-webkit-scrollbar-track-piece {
				background-color: rgba(0, 0, 0, 0);
				border-left: 1px solid rgba(0, 0, 0, 0);
			}
			&::-webkit-scrollbar {
				width: 5px;
				height: 5px;
				-webkit-border-radius: 5px;
				-moz-border-radius: 5px;
				border-radius: 5px;
			}
			&::-webkit-scrollbar-thumb {
				background-color: rgba(138, 143, 153, 0.3);
				background-clip: padding-box;
				-webkit-border-radius: 5px;
				-moz-border-radius: 5px;
				border-radius: 5px;
				min-height: 5px;
			}
			&::-webkit-scrollbar-thumb:hover {
				background-color: rgba(138, 143, 153, 0.3);
				-webkit-border-radius: 5px;
				-moz-border-radius: 5px;
				border-radius: 5px;
			}
			.m-table-cell {
				font-weight: 400;
			}
		}

		.right-side-table,
		.left-side-table {
			min-width: 100%;
			.nex-grid-col {
				/* min-width: 60px; */
				min-width: 1.2rem;
				border-right: 1px solid #ededf2;
				border-bottom: 1px solid #ededf2;
			}

			.v-process {
				position: absolute;
				left: 0;
				z-index: 1;
				/* height: 28px; */
				height: 0.56rem;
			}

			.v-process-text {
				z-index: 2;
			}

			th {
				/* text-align: center; */
				text-align: right;
				&.nex-grid-col[colspan="2"] {
					text-align: center;
				}
				&.nex-grid-col[colspan="3"] {
					text-align: center;
				}
				&.nex-grid-col[colspan="4"] {
					text-align: center;
				}
				&.nex-grid-col[colspan="5"] {
					text-align: center;
				}
			}
			td {
				text-align: right;
			}

			.m-table-cell {
				overflow: hidden;
				box-sizing: border-box;
				position: relative;
				padding-left: 6px;
				padding-right: 6px;
				/* height: 28px; */
				/* line-height: 28px; */
				height: 0.56rem;
				line-height: 0.56rem;
				color: #666666;
				white-space: nowrap;
				word-wrap: normal;
				text-overflow: ellipsis;
			}

			td.nex-grid-col {
				background-color: #ffffff;
			}
			th.nex-grid-col {
				background-color: #ededf2;
				color: #6d7380;
				font-weight: 400;
				/* border-bottom: 1px solid #ededf2; */
			}
		}

		.left-side-table {
			border-left: 1px solid #ededf2;
			th {
				text-align: left;
				&.nex-grid-col[colspan="2"] {
					text-align: center;
				}
				&.nex-grid-col[colspan="3"] {
					text-align: center;
				}
				&.nex-grid-col[colspan="4"] {
					text-align: center;
				}
				&.nex-grid-col[colspan="5"] {
					text-align: center;
				}
			}
			.nex-grid-col {
				background-color: #ffffff;
				&[rowspan="1"] {
					color: #17181a;
				}
			}
			tbody .nex-grid-col {
				background-color: #ffffff;
				text-align: left;
				.m-table-cell {
					font-weight: 500;
					color: #17181a;
					font-size: 0.24rem;
				}
			}
		}
	}
`;
