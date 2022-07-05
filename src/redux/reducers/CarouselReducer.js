const stateDefault = {
    arrBanner: [
        {
            maBanner: 1,
            maPhim: 1282,
            hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png"
        }
    ]
}

export const CarouselReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'LAY_DS_BANNER':
            state.arrBanner = action.arrBanner;
            return { ...state }
        default:
            return state
    }
}