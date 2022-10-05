import { USER_DETAILS_REQUEST, USER_DETAILS_FAILURE, USER_DETAILS_SUCCESS } from "../../@constants/userConstants";
import { apis } from "../../@services/apis";

export const getUserDetails = () => async(dispatch) => {
    try {
        dispatch({
            type : USER_DETAILS_REQUEST
        })

        const {data} = await apis.getUserDetails()

        dispatch({
            type : USER_DETAILS_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : USER_DETAILS_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
    }
}