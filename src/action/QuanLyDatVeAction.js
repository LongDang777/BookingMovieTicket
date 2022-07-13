import { quanLyDatVeService } from "../services/QuanLyDatVeService";
import ThongTinDatVe from "../_core/models/ThongTinDatVe";
import { message } from "antd";
import { displayLoadingAction, hiddenLoadingAction } from "../redux/actions/LoadingAction";
import { connection } from "..";

export const layChiTietPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    dispatch(displayLoadingAction)
    try {
      const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
      if (result.status === 200) {
        dispatch({
          type: 'SET_CHI_TIET_PHONG_VE',
          chiTietPhongVe: result.data.content
        })
      }
      dispatch(hiddenLoadingAction)

    } catch (error) {
      dispatch(hiddenLoadingAction)
      console.log(error);
    }
  }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch, getState) => {
    dispatch(displayLoadingAction)
    try {
      const result = await quanLyDatVeService.datVe(thongTinDatVe);
      await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
      await dispatch({ type: 'DAT_VE_HOAN_TAT' })
      await dispatch(hiddenLoadingAction)

      let userLogin  = getState().LogReducer.userLogin
        connection.invoke('datGheThanhCong', userLogin.taiKhoan, thongTinDatVe.maLichChieu)

      dispatch({ type: 'CHUYEN_TAB' })
      message.success('Đặt vé thành công')
    } catch (error) {
      dispatch(hiddenLoadingAction)
      message.warn('vì lí dó API không ổn định vui lòng chọn ghế khác')
      console.log(error.response.data);
    }
  }
}

export const datGheAction = (ghe, maLichChieu) => {

  //getState là param từ redux-thunk
  return async (dispatch, getState) => {

    await dispatch({
      type: 'DAT_VE',
      gheDuocChon: ghe
    })
    let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
    let taiKhoan = getState().LogReducer.userLogin.taiKhoan;

    //chuyen  arr thanh string
    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat)

    //call api signalR
    connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu)



  }
}