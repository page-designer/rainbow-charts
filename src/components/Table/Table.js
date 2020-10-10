import React from "react";

export default class Table extends React.Component {
	static defaultProps = {
		fixColumns: [],
		columns: [],
		data: [],
		cellRender: null,
		headCellRender: null,
	};

	fixThs = [];

	saveFixTh = th => {
		this.fixThs.push(th);
	};

	componentDidMount() {
		if (!this._thead) return;

		const h = this._thead.offsetHeight;
		this.fixThs.forEach(th => {
			th.style.height = h + "px";
		});
	}

	componentDidUpdate() {
		this.componentDidMount();
	}

	renderLeftSide() {
		const { fixColumns, data, headCellRender, cellRender, cellMerge } = this.props;

		if (!fixColumns.length) return null;

		const fixData = data.map(rowData => {
			const column = fixColumns[0];

			return rowData[column.dataIndex];
		});

		function groupData(data) {
			const map = {};
			data.forEach(v => {
				map[v] = map[v] || [];
				map[v].push(v);
			});

			return map;
		}

		const fixDataGroupUser = {};
		const fixDataGroup = groupData(fixData);

		return (
			<div className="left-side">
				<table className="left-side-table nex-grid-table">
					{/* <colgroup>
						{fixColumns.map(column => {
							return (
								<col
									style={
										{
											// width: column.width || 100
										}
									}
								/>
							);
						})}
					</colgroup> */}
					<thead>
						<tr>
							{fixColumns.map((column, colIndex) => {
								let title = column.title;
								if (headCellRender) {
									title = headCellRender(column.title, column);
								}

								return (
									<th
										key={colIndex}
										ref={this.saveFixTh}
										className={`nex-grid-col ${
											colIndex === 0
												? "nex-grid-col-first"
												: "nex-grid-col-leaf"
										}`}>
										<div className="m-table-cell">{title}</div>
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{data.map((rowData, rowIndex) => {
							return (
								<tr key={rowIndex}>
									{fixColumns.map((column, columnIndex) => {
										let rowSpan = 1;

										let cellText = rowData[column.dataIndex];

										const g = fixDataGroup[cellText];

										const hasUse = fixDataGroupUser[cellText];

										let style = {};

										if (!hasUse && g && cellMerge) {
											rowSpan = g.length;
											fixDataGroupUser[cellText] = true;

											style = {
												// height: 28 * rowSpan,
												height: `calc(0.56rem * ${rowSpan} + 1px * ${rowSpan})`,
											};
										} else if (hasUse) {
											return null;
										}

										// style.fontWeight = columnIndex === 0 ? 700 : 500;
										// style.fontWeight = 500;

										if (cellRender) {
											cellText = cellRender(cellText, data);
										}

										return (
											<th
												key={columnIndex}
												rowSpan={rowSpan}
												style={style}
												className="nex-grid-col">
												<div className="m-table-cell">{cellText}</div>
											</th>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}

	renderRightSide() {
		const { columns, data, leafColumns, headCellRender, cellRender } = this.props;

		if (!columns.length) return null;

		return (
			<div className="right-side">
				<table className="right-side-table nex-grid-table">
					<colgroup>
						{leafColumns.map((column, index) => {
							return (
								<col
									key={index}
									style={
										{
											// width: column.width || 100
										}
									}
								/>
							);
						})}
					</colgroup>
					<thead ref={dom => (this._thead = dom)}>
						{columns.map((rows, rowIndex) => {
							return (
								<tr key={rowIndex}>
									{rows.map((column, index) => {
										let title = column.title;

										if (headCellRender) {
											title = headCellRender(column.title, column);
										}

										return (
											<th
												key={index}
												rowSpan={column.rowSpan}
												colSpan={column.colSpan}
												className="nex-grid-col">
												<div className="m-table-cell">{title}</div>
											</th>
										);
									})}
								</tr>
							);
						})}
					</thead>
					<tbody>
						{data.map((rowData, rowIndex) => {
							return (
								<tr key={rowIndex}>
									{leafColumns.map((column, index) => {
										let cellText = rowData[column.dataIndex];
										let style = {};
										if (cellRender) {
											cellText = cellRender(cellText, data);
										}

										return (
											<td className="nex-grid-col" key={index}>
												<div className="m-table-cell" style={style}>
													{cellText}
												</div>
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}

	render() {
		return (
			<div className="m-rb-table">
				{this.renderLeftSide()}
				{this.renderRightSide()}
			</div>
		);
	}
}
