import { LAY_THONGTIN_PHIM, LAY_DS_PHIM } from "./types/PhimType";
import { history } from "../../App";
import { SET_DS_PHIM } from "../type/quanLyPhimType";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { message } from "antd";

export const layDanhSachPhimAction = (tenPhim = '') => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.layDanhSachPhim(tenPhim);
            dispatch({
                type: LAY_DS_PHIM,
                mangPhim: result.data.content
            })
        } catch (err) {
            console.log('err', err);
        }
    }
}
export const themPhimUploadHinh = (formData) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.themPhimUploadHinh(formData);
            message.success('Thêm Phim thành công')
            history.push('/admin/films')
        } catch (err) {
            console.log('err', err);
        }
    }
}
export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.layThongTinPhim(maPhim);
            dispatch({
                type: LAY_THONGTIN_PHIM,
                thongTinPhim: result.data.content
            })
        } catch (err) {
            console.log('err', err);
        }
    }
}
export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.capNhatPhimUpload(formData);
            message.success('Cập nhật thành công')
            history.push('/admin/films')
            dispatch(layDanhSachPhimAction())
        } catch (err) {
            console.log('err', err);
        }
    }
}
export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.xoaPhim(maPhim);
            message.success('Xoá Phim thành công')
            dispatch(layDanhSachPhimAction())
        } catch (err) {
            console.log('err', err);
        }
    }
}

export const layDanhSachReducer = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachPhim();
            dispatch({
                type: SET_DS_PHIM,
                arrPhim: result.data.content
            })
        }
        catch (error) {
            console.log("error", error);
        }
    }
}
