import React, { memo, useState, useEffect } from "react";
import { chunk } from "lodash";
// import Swiper from "swiper";
// swiper bug https://github.com/nolimits4web/swiper/issues/3768
import Swiper from "swiper/swiper-bundle.esm.js";
import "swiper/swiper-bundle.css";
import { IndexPanelItem, IndexPanelContainer } from "./style";

function IndexSlide({ list, columns, symbolColumns, onlyOne }) {
	return (
		<IndexPanelItem style={{ paddingBottom: onlyOne ? "0px" : "16px" }}>
			{list.map((item, index) => (
				<div className="index-item" key={index}>
					<h2 className="metrice_value_1d">{item[0]}</h2>
					<h3 className="metrice_name">{item[1]}</h3>
					{item.map((value, ind) => {
						// 第一二位为指标值和指标名
						if (ind < 2) return null;
						return (
							<p className="increase_pct_against_p1d" key={columns[ind]}>
								{columns[ind]}
								<span
									className="increase_value"
									style={{
										color: value > 0 ? "#008D5E" : value < 0 ? "#F42828" : "",
									}}>
									{value > 0 ? "+" : ""}
									{value}
									{symbolColumns.includes(columns[ind]) ? "%" : ""}
								</span>
							</p>
						);
					})}
				</div>
			))}
		</IndexPanelItem>
	);
}

function IndexPanelPreview({ item, sourceData }) {
	const [sliderSwiper, setSliderSwiper] = useState(null);
	const { symbolColumns } = item;
	const { columns, list } = sourceData;
	// const dataList = columnsToObj({ columns, list });
	const slideList = chunk(list, 3);

	useEffect(() => {
		if (slideList.length > 1 && !sliderSwiper) {
			let newSliderSwiper = new Swiper(".slider-container", {
				pagination: {
					el: ".swiper-pagination",
					type: "bullets",
					dynamicMainBullets: 2,
				},
			});
			setSliderSwiper(newSliderSwiper);
		}
	}, [slideList.length, sliderSwiper]);

	return (
		<IndexPanelContainer>
			<div className="slider-container">
				<div className="swiper-wrapper">
					{slideList.map((slider, index) => {
						return (
							<div className="swiper-slide" key={index}>
								<IndexSlide
									list={slider}
									columns={columns}
									symbolColumns={symbolColumns.split(",")}
									onlyOne={slideList.length === 1}
								/>
							</div>
						);
					})}
				</div>
				{slideList.length > 1 && <div className="swiper-pagination"></div>}
			</div>
		</IndexPanelContainer>
	);
}

export default memo(IndexPanelPreview);
