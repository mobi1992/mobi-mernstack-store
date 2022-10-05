import { UPDATE_USER_ROLE_REQUEST, UPDATE_USER_ROLE_SUCCESS, UPDATE_USER_ROLE_FAILURE } from "../../@constants/userConstants";
import { apis } from "../../@services/apis";

export const adminUpdateUserRole = (id, role) => async(dispatch) => {
    try {
        dispatch({
            type : UPDATE_USER_ROLE_REQUEST
        })

        const {data} = await apis.updateUserRole(id, role)

        dispatch({
            type : UPDATE_USER_ROLE_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : UPDATE_USER_ROLE_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
    }
}