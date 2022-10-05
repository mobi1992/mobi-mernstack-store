import { DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE } from "../../@constants/userConstants";
import { apis } from "../../@services/apis";

export const adminDeleteUser = (id) => async(dispatch) => {
    try {
        dispatch({
            type : DELETE_USER_REQUEST
        })

        const {data} = await apis.deleteUser(id)

        dispatch({
            type : DELETE_USER_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : DELETE_USER_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
    }
}