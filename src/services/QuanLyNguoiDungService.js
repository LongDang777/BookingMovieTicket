import { http } from "../util/setting";
import { GROUP_ID } from "./TypeService";


class QuanLyNguoiDungService {
  layDanhSachNguoiDung = (tuKhoa) => {
    if (tuKhoa) {
      return http.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${GROUP_ID}&tuKhoa=${tuKhoa}`)
    }
    return http.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${GROUP_ID}`)
  };

  themNguoiDung = (formData) => {
    return http.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, formData)
  }

  layThongND = (taiKhoan) => {
    return http.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`)
  };

  capNhatThongTinNguoiDung = (formData) => {
    return http.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, formData)
  };

  xoaND = (taiKhoan) => { return http.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`) };

  layThongTinTaiKhoan = () => { return http.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan')};

}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();