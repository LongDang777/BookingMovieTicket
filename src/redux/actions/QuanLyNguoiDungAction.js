
import { history } from "../../App";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { LAY_DS_ND, LAY_THONGTIN_ND,LAY_THONGTIN_TAIKHOAN } from "./types/NguoiDungType";
import { message } from "antd";



export const layDanhSachNDAction =(tuKhoa='')=>{
    return async (dispatch)=>{
        try {
            let result = await quanLyNguoiDungService.layDanhSachNguoiDung(tuKhoa);
            dispatch({
                type:LAY_DS_ND,
                mangND: result.data.content
            })
        }catch(err){
            console.log('err',err.response.data);
        }
    }
}
export const xoaNDAction = (taiKhoan) => {
  return async (dispatch)=>{
      try {
          let result = await quanLyNguoiDungService.xoaND(taiKhoan);
          message.success('Xoá tài khoản thành công')
          dispatch(layDanhSachNDAction())  
      }catch(err){
          console.log('err',err);
      }
  }

}
export const themNguoiDungAction = (formData) =>{
    return async (dispatch)=>{
        try {
            let result = await quanLyNguoiDungService.themNguoiDung(formData);
            message.success('Thêm người dùng thành công')
            history.push('/admin')
        }catch(err){
            console.log('err',err);
            
        }
    }
}
export const layThongTinNDAction = (taiKhoan) => {
    return async (dispatch)=>{
        try {
            let result = await quanLyNguoiDungService.layThongND(taiKhoan);
            dispatch({
                type:LAY_THONGTIN_ND,
                thongTinND: result.data.content
            })
        }catch(err){
            console.log('err',err);
        }
    }
}
export const CapNhatThongTinNguoiDungAction = (formData) =>{
    return async (dispatch)=>{
        try {
            let result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(formData);
            message.success('Cập nhật người dùng thành công')
            history.push('/admin')
            dispatch(layDanhSachNDAction())   
        }catch(err){
            console.log('err',err);
        }
    }
}
export const layThongTinTaiKhoanAction = () => {
    return async (dispatch)=>{
        try {
            let result = await quanLyNguoiDungService.layThongTinTaiKhoan();
            
                dispatch({
                    type:LAY_THONGTIN_TAIKHOAN,
                    thongTinTK: result.data.content
                })
            
        }catch(err){
            console.log('err',err);
        }
    }
}



