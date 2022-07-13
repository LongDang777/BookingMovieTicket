import React from "react";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import styleSlick from "./MultipleRowSlick.module.css";
import './buttonPhim.css'
import { useDispatch } from "react-redux";
import {
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
} from "../../redux/type/quanLyPhimType";


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
  


  return (
    <div className="container border-top border-bottom py-4 mt-4">
      <div className="border-bottom buttonPhimDangChieuSapChieu">
      <button className="ml-4 mr-4 btnPhim" 
        onClick={() => {
          const action = {
            type: SET_PHIM_DANG_CHIEU,
          };
          dispatch(action);
        }}
      >
        PHIM ĐANG CHIẾU
      </button>
      <button className="btnPhim"
       
        onClick={() => {
          const action = {
            type: SET_PHIM_SAP_CHIEU,
          };
          dispatch(action);
        }}
      >
        PHIM SẮP CHIẾU
      </button>
      </div>
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
                  MUA VÉ
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
