import { GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAILURE } from "../../@constants/userConstants";
import { apis } from "../../@services/apis";

export const adminGetAllUsers = (currentPage) => async(dispatch) => {
    try {
        dispatch({
            type : GET_ALL_USERS_REQUEST
        })

        const {data} = await apis.getAllUsers(currentPage)

        dispatch({
            type : GET_ALL_USERS_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : GET_ALL_USERS_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
    }
}