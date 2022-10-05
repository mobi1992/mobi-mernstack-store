import { ADMIN_GET_SINGLE_ORDER_REQUEST, ADMIN_GET_SINGLE_ORDER_SUCCESS, ADMIN_GET_SINGLE_ORDER_FAILURE} from "../../@constants/orderConstants";
import { apis } from "../../@services/apis";

export const adminGetSingleOrder = (id) => async(dispatch) => {
    try {
        dispatch({
            type : ADMIN_GET_SINGLE_ORDER_REQUEST
        })

        const {data} = await apis.adminGetSnglOrder(id)
        dispatch({
            type : ADMIN_GET_SINGLE_ORDER_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : ADMIN_GET_SINGLE_ORDER_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}
