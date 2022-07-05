import axios from 'axios'
import { DOMAIN } from '../util/config'
import { TOKEN_MOVIE } from '../util/setting'

export const LoginAction = (UserLogin) => {
    return async (dispatch) => {
        try {
            const result = await axios({
                method: 'POST',
                url: `${DOMAIN}/api/QuanLyNguoiDung/DangNhap`,
                data: UserLogin,
                headers: {
                    "TokenCybersoft": TOKEN_MOVIE
                }
            });
            if (result.data.statusCode === 200) {
                dispatch({
                    type: 'LOGIN_USER',
                    userLogin: result.data.content,
                })
            }
        }

        catch (errors) {
            console.log(errors);
        }
    }
}
