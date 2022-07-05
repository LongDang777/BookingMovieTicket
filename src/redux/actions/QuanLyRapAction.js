import { quanLyRapService } from "../../services/QuanLyRapService";
import { SET_CHI_TIET_FILM, SET_DS_RAP } from "../type/quanLyRapType";

export const layDSHeThongRapAction = () => {
  return async (dispath) => {
    try {
      const result = await quanLyRapService.layDanhSachRap();

      if (result.status === 200) {
        dispath({
          type: SET_DS_RAP,
          heThongRapChieu: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error.respone?.data);
    }
  };
};

export const layThongTinChiTietPhim = (id) => {
  return async (dispath) => {
    try {
      const result = await quanLyRapService.layThongTinLichChieuPhim(id);

      //   update data from api to reducer
      dispath({
        type: SET_CHI_TIET_FILM,
        filmDetail: result.data.content,
      });
    } catch (error) {}
  };
};
