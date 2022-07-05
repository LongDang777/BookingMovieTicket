import React, { Component, useState } from "react";
import Slider from "react-slick";
import styleSlick from "./MultipleRowSlick.module.css";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
} from "../../redux/type/quanLyPhimType";
import { NavLink } from "react-router-dom";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        color: "black",
        background: "green",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

export default function MultipleRows(props) {
  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "5px",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 7000,
    rows: 1,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const dispatch = useDispatch();

  const { sapChieu, dangChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  const [styleDang, setStyleDang] = useState(false);
  const [styleSap, setStyleSap] = useState(false);

  return (
    <div className="container border-top border-bottom py-4 mt-4">
      <Button
        style={
          styleDang === sapChieu
            ? {
              color: "#fff",
              borderColor: " #1890ff",
              background: "#1890ff",
              textShadow: "0 -1px 0 rgb(0 0 0 / 12%)",
              boxhadow: "0 2px 0 rgb(0 0 0 / 5%)",
            }
            : {}
        }
        className="mr-4"
        onClick={() => {
          const action = {
            type: SET_PHIM_DANG_CHIEU,
          };
          dispatch(action);
          setStyleDang(true);
          setStyleSap(false);
        }}
      >
        Phim đang chiếu
      </Button>
      <Button
        style={
          styleSap === dangChieu
            ? {}
            : {
              color: "#fff",
              borderColor: " #1890ff",
              background: "#1890ff",
              textShadow: "0 -1px 0 rgb(0 0 0 / 12%)",
              boxhadow: "0 2px 0 rgb(0 0 0 / 5%)",
            }
        }
        onClick={() => {
          const action = {
            type: SET_PHIM_SAP_CHIEU,
          };
          dispatch(action);
          setStyleSap(true);
          setStyleDang(false);
        }}
      >
        Phim sắp chiếu
      </Button>
      <Slider {...settings}>
        {props.arrPhim.slice(0, 12).map((item, index) => (
          <div
            key={`${item}-${item.tenPhim}`}
            className={`${styleSlick["width-item"]}`}
          >
            <div className="filmDetail__content">
              <div
                className="filmDetail__content__img"
                style={{ background: `url(${item.hinhAnh}) no-repeat` }}
              >
                <img
                  className="opacity-0 w-full"
                  style={{ height: "340px" }}
                  alt=""
                />
              </div>
              <p className="filmDetail__content__name">{item.tenPhim}</p>
              <div className="filmDetail__descrip">
                <div className="filmDetail__descrip__heading">
                  <p className="filmDetail__descrip__heading__name">
                    {item.tenPhim}
                  </p>
                  <p className="filmDetail__descrip__heading__rate">
                    {item.danhGia}/10
                  </p>
                </div>
                <p className="filmDetail__descrip__content">{item.moTa}</p>
                <NavLink
                  to={`/detail/${item.maPhim}`}
                  className="filmDetail__descrip__button"
                >
                  Mua vé
                </NavLink>
              </div>
              <div className="overlay"></div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
