import axios from 'axios'
import { DOMAIN } from '../util/config'
import { TOKEN_MOVIE } from '../util/setting'

export const LayDanhSachBanner = () => {

    return async (dispatch) => {
        try {
            const result = await axios({
                method: 'get',
                url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachBanner`,
                headers: {
                    "TokenCybersoft": TOKEN_MOVIE
                }
            });
            dispatch({
                type: 'LAY_DS_BANNER',
                arrBanner: result.data.content,
            })
        }

        catch (errors) {
            console.log(errors);
        }
    }
}
