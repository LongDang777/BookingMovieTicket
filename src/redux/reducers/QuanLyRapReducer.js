import { SET_DS_RAP } from "../type/quanLyRapType"

const stateDefault = {
    heThongRapChieu: []
}

export const QuanLyRapReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case SET_DS_RAP: {
            state.heThongRapChieu = action.heThongRapChieu
            return {...state}
        }
        default:
            return {...state}
    }
}