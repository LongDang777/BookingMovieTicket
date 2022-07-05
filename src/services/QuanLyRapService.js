import { http } from "../util/setting";
import { GROUP_ID } from "./TypeService";

class QuanLyRapService {
  layDanhSachHeThongRap = ()=>{ 
    return http.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`)
  };

  layThongTinLichChieuPhim = (maPhim)=>{ 
    return http.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
  };
  layThongTinHeThongRap =()=>{
    return http.get(`/api/QuanLyRap/LayThongTinHeThongRap`)
  }
  layThongTinCumRap =(maHeThongRap)=>{
    return http.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
  }
  layDanhSachRap = ()=> {
      return http.get('/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP03')
  }
}


export const quanLyRapService = new QuanLyRapService()
