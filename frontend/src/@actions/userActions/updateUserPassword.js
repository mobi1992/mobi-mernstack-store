import { UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE } from "../../@constants/userConstants";
import { apis } from "../../@services/apis";

export const updateUserPassword = ({oldPassword, newPassword, confirmPassword}) => async(dispatch) => {
    try {
        dispatch({
            type : UPDATE_PASSWORD_REQUEST
        })

        const {data} = await apis.updatePassword({oldPassword, newPassword, confirmPassword})

        dispatch({
            type : UPDATE_PASSWORD_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : UPDATE_PASSWORD_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
    }
}