import React, { useEffect } from "react";
import { Rate, Tabs } from "antd";
import "../../assets/style/circle.css";
import "../../assets/style/reset.scss";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapAction";
import { NavLink } from "react-router-dom";
import moment from "moment";

const { TabPane } = Tabs;

const DetailDay = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // get data from url
    let { id } = props.match.params;

    dispatch(layThongTinChiTietPhim(id));
  }, []);

  const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail);

  return (
    <div>
      <div className="bg-slate-700 h-max p-t-120 p-b-80">
        <div className="grid grid-cols-12">
          <div className="col-span-5 col-start-3">
            <div className="grid grid-cols-3">
              <img
                className="col-span-1"
                src={filmDetail.hinhAnh}
                style={{ width: "300px", height: "320px" }}
                alt="123"
              />
              <div className="col-span-2 ml-5 mt-1 mr-6">
                <p className=" text-cyan-50 text-sm mb-3">
                  Ngày chiếu:
                  <span className="ml-2 text-green-500">
                    {moment(filmDetail.ngayKhoiChieu).format("DD - MM - YYYY")}
                  </span>
                </p>
                <p className=" text-orange-500 text-3xl mb-3">
                  {filmDetail.tenPhim}
                </p>
                <p className="text-cyan-50">{filmDetail.moTa}</p>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <p style={{ color: "#307bbb" }} className="text-xl  ml-4 mb-1">
              Đánh giá
            </p>
            <h1
              style={{ color: "#307bbb" }}
              className="text-blue-700 text-xl mb-3"
            >
              <Rate allowHalf value={filmDetail.danhGia / 2} />
            </h1>
            <div className={`c100 p${filmDetail.danhGia * 10} medium`}>
              <span>{filmDetail.danhGia * 10}%</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
          </div>
        </div>

        <Tabs
          defaultActiveKey="1"
          centered
          className="container mt-20 ml-72 w-2/3 bg-white px-5 py-5"
        >
          <TabPane tab="Lịch chiếu" key="1">
            <div>
              <Tabs tabPosition={"left"}>
                {filmDetail.heThongRapChieu?.map((htr, index) => (
                  <TabPane
                    tab={
                      <div className="text-center">
                        <img
                          className="rounded-full"
                          src={htr.logo}
                          width={70}
                          alt={htr.logo}
                        />
                      </div>
                    }
                    key={index}
                  >
                    {htr.cumRapChieu?.map((cumRap, index) => (
                      <div className="mb-5" key={index}>
                        <div className="flex flex-row">
                          <img
                            alt={cumRap.hinhAnh}
                            src={cumRap.hinhAnh}
                            style={{ height: "80px", width: "80px" }}
                          />
                          <div>
                            <p className="ml-2 text-xl font-bold  ">
                              {" "}
                              {cumRap.tenCumRap}
                            </p>
                            <p className="ml-2">{cumRap.diaChi}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 mt-3">
                          {cumRap.lichChieuPhim
                            ?.slice(0, 12)
                            .map((lichChieu, index) => (
                              <NavLink
                                to={`/checkout/${lichChieu.maLichChieu}`}
                                key={index}
                                className="col-span-1 text-green-800 font-semibold"
                              >
                                {moment(lichChieu.ngayChieuGioChieu).format(
                                  "hh:mm A"
                                )}
                              </NavLink>
                            ))}
                        </div>
                      </div>
                    ))}
                  </TabPane>
                ))}
              </Tabs>
            </div>
          </TabPane>
          <TabPane tab="Thông Tin" key="2">
            Thông Tin
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default DetailDay;
