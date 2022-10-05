import { GET_LOGGEDIN_USER_SINGLE_ORDER_REQUEST, GET_LOGGEDIN_USER_SINGLE_ORDER_SUCCESS, GET_LOGGEDIN_USER_SINGLE_ORDER_FAILURE} from "../../@constants/orderConstants";
import { apis } from "../../@services/apis";

export const getloggedinUserSingleOrder = (id) => async(dispatch) => {
    try {
        dispatch({
            type : GET_LOGGEDIN_USER_SINGLE_ORDER_REQUEST
        })

        const {data} = await apis.getLoggedinUsrOrder(id)
        dispatch({
            type : GET_LOGGEDIN_USER_SINGLE_ORDER_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : GET_LOGGEDIN_USER_SINGLE_ORDER_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}
