import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "../../@constants/userConstants";
import { apis } from "../../@services/apis";
export const signUpUser = (userData) => async(dispatch) => {
    try {
        dispatch({
            type : SIGNUP_REQUEST
        })

        const {data} = await apis.signup(userData)
        await sessionStorage.setItem('AUTH_TOKEN', data.token)
        dispatch({
            type : SIGNUP_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : SIGNUP_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}