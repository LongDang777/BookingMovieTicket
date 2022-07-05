import { message } from 'antd'
import axios from 'axios'
import { DOMAIN } from '../util/config'
import { TOKEN_MOVIE } from '../util/setting'

export const RegisterAction = (UserInfo) => {
    return async (dispatch) => {
        try {
            const result = await axios({
                method: 'POST',
                url: `${DOMAIN}/api/QuanLyNguoiDung/DangKy`,
                data: UserInfo,
                headers: {
                    "TokenCybersoft": TOKEN_MOVIE
                }
            });
            if (result.data.statusCode != 400 &&
                result.data.message != "Không tìm thấy tài nguyên!" &&
                result.data.content != "Email đã tồn tại!") {
                dispatch({
                    type: 'REGISTER_USER',
                    userInfo: result.data.content,
                })
            }
            message.success('Đăng kí thành công')
        }

        catch (err) {
            message.warn(err.response.data)
        }
    }
}
