import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../../@constants/userConstants";
import { apis } from "../../@services/apis";
export const loginUser = ({email, password}) => async(dispatch) => {
    try {
        dispatch({
            type : LOGIN_REQUEST
        })

        const {data} = await apis.login({email, password})
        await sessionStorage.setItem('AUTH_TOKEN', data.token)
        dispatch({
            type : LOGIN_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : LOGIN_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}