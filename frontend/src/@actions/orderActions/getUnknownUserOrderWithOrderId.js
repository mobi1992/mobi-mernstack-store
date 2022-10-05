import { GET_ORDER_WITH_ORDER_ID_UA_REQUEST, GET_ORDER_WITH_ORDER_ID_UA_SUCCESS, GET_ORDER_WITH_ORDER_ID_UA_FAILURE} from "../../@constants/orderConstants";
import { apis } from "../../@services/apis";

export const getUnknownUserOrderWithOrderId = (id) => async(dispatch) => {
    try {
        dispatch({
            type : GET_ORDER_WITH_ORDER_ID_UA_REQUEST
        })

        const {data} = await apis.getUnkUserOrderWithOrderId(id)
        dispatch({
            type : GET_ORDER_WITH_ORDER_ID_UA_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : GET_ORDER_WITH_ORDER_ID_UA_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}
