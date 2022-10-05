import { RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../../@constants/userConstants";
import { apis } from "../../@services/apis";

export const resetUserPassword = (token, {password, confirmPassword}) => async(dispatch) => {
    try {
        dispatch({
            type : RESET_PASSWORD_REQUEST
        })

        const {data} = await apis.resetPassword(token, {password, confirmPassword})

        dispatch({
            type : RESET_PASSWORD_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : RESET_PASSWORD_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
    }
}