import { ADMIN_GET_ALL_ORDERS_REQUEST, ADMIN_GET_ALL_ORDERS_SUCCESS, ADMIN_GET_ALL_ORDERS_FAILURE} from "../../@constants/orderConstants";
import { apis } from "../../@services/apis";

export const getAdminAllOrders = (currentPage = 1) => async(dispatch) => {
    try {
        dispatch({
            type : ADMIN_GET_ALL_ORDERS_REQUEST
        })

        const {data} = await apis.getAdminOrders(currentPage)
        dispatch({
            type : ADMIN_GET_ALL_ORDERS_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : ADMIN_GET_ALL_ORDERS_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}
