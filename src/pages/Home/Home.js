import React, { Fragment, useEffect } from "react";
import "../../assets/style/home.css";
import FilmDetail from "../../components/FilmDetail";
import DetailDays from "../Detail/DetailDays";
import { useSelector, useDispatch } from "react-redux";
import { layDSHeThongRapAction } from "../../redux/actions/QuanLyRapAction";
import { HomeCarousel } from "../../components/HomeCarousel/HomeCarousel";

export default function Home() {
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const action = layDSHeThongRapAction();
    dispatch(action);
  }, []);

  return (
    <Fragment>
      <HomeCarousel />
      <div>
        <FilmDetail />
        <DetailDays heThongRapChieu={heThongRapChieu} />
      </div>
    </Fragment>
  );
}
