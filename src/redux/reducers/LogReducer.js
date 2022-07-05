let user = {};
if (localStorage.getItem('LOGIN_USER')) {
    user = JSON.parse(localStorage.getItem('LOGIN_USER'));
}

const stateDefault = {
    userLogin: user,
}

export const LogReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            const { userLogin } = action
            localStorage.setItem('LOGIN_USER', JSON.stringify(userLogin))
            localStorage.setItem('TOKEN_MOVIE', userLogin.accessToken)
            state.userLogin = userLogin;
            return { ...state }
        case 'LOG_OUT_USER':
            localStorage.removeItem('LOGIN_USER');
            localStorage.removeItem('TOKEN_MOVIE')
            state.userLogin = action.userLogin;
            return { ...state }
        default:
            return state
    }
}