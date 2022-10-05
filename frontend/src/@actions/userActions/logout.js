import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from "../../@constants/userConstants";
import { apis } from "../../@services/apis";
export const logoutuser = () => async(dispatch) => {
    try {
        dispatch({
            type : LOGOUT_REQUEST
        })

        const {data} = await apis.logout()
        await sessionStorage.removeItem('AUTH_TOKEN')
        dispatch({
            type : LOGOUT_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : LOGOUT_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}