const stateDefault = {
    userInfo: {},
}

export const RegisterReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'REGISTER_USER':
            state.userInfo = action.userInfo;
            return { ...state }
        default:
            return state
    }
}