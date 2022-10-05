import { GET_LOGGEDIN_USER_ORDERS_REQUEST, GET_LOGGEDIN_USER_ORDERS_SUCCESS, GET_LOGGEDIN_USER_ORDERS_FAILURE} from "../../@constants/orderConstants";
import { apis } from "../../@services/apis";

export const getloggedinUserOrders = (currentPage) => async(dispatch) => {
    try {
        dispatch({
            type : GET_LOGGEDIN_USER_ORDERS_REQUEST
        })

        const {data} = await apis.getLoggedinUsrOrders(currentPage)
        dispatch({
            type : GET_LOGGEDIN_USER_ORDERS_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : GET_LOGGEDIN_USER_ORDERS_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}
