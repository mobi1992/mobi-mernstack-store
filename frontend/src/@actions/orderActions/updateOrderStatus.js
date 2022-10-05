import { UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS, UPDATE_ORDER_STATUS_FAILURE} from "../../@constants/orderConstants";
import { apis } from "../../@services/apis";

export const updateOrderStatus = (id, status) => async(dispatch) => {
    try {
        dispatch({
            type : UPDATE_ORDER_STATUS_REQUEST
        })

        const {data} = await apis.updateOrdStatus(id, status)
        dispatch({
            type : UPDATE_ORDER_STATUS_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : UPDATE_ORDER_STATUS_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}
