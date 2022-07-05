// rxr
import { LAY_DS_PHIM, LAY_THONGTIN_PHIM } from "../actions/types/PhimType";
import {
  SET_DS_PHIM,
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
} from "../type/quanLyPhimType";
import { SET_CHI_TIET_FILM } from "../type/quanLyRapType";

const stateDefaut = {
  mangPhim: [],
  thongTinPhim: {},
  arrPhim: [],
  arrPhimDefault: [],
  sapChieu: true,
  dangChieu: false,

  filmDetail: {},
};

export const QuanLyPhimReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case LAY_DS_PHIM:
      state.mangPhim = action.mangPhim;
      return { ...state };

    case LAY_THONGTIN_PHIM:
      state.thongTinPhim = action.thongTinPhim;
      return { ...state };

    case SET_DS_PHIM: {
      state.arrPhim = action.arrPhim;
      state.arrPhimDefault = state.arrPhim;
      return { ...state };
    }

    case SET_PHIM_DANG_CHIEU: {
      state.arrPhim = state.arrPhimDefault.filter((item) => {
        return item.sapChieu === true;
      });
      return { ...state };
    }

    case SET_PHIM_SAP_CHIEU: {
      state.arrPhim = state.arrPhimDefault.filter((item) => {
        return item.dangChieu === true;
      });
      return { ...state };
    }

    case SET_CHI_TIET_FILM: {
      state.filmDetail = action.filmDetail;
      return { ...state };
    }
    default:
      return state;
  }
};
