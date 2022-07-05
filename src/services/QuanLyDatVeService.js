import { http } from "../util/setting";
import ThongTinDatVe from "../_core/models/ThongTinDatVe";

class QuanLyDatVeService {

  taoLichChieu = (thongTinLichChieu) => {
    return http.post(`/api/QuanLyDatVe/TaoLichChieu`, thongTinLichChieu)
  }

  layChiTietPhongVe = (maLichChieu) => {
    return http.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
  }

  datVe = (thongTinDatVe = new ThongTinDatVe()) => {
    return http.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe)
  }

}

export const quanLyDatVeService = new QuanLyDatVeService();
