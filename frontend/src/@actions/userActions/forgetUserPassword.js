import { FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_FAILURE } from "../../@constants/userConstants";
import { apis } from "../../@services/apis";

export const forgetUserPassword = ({email}) => async(dispatch) => {
    try {
        dispatch({
            type : FORGET_PASSWORD_REQUEST
        })

        const {data} = await apis.forgetPassword({email})

        dispatch({
            type : FORGET_PASSWORD_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : FORGET_PASSWORD_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
    }
}