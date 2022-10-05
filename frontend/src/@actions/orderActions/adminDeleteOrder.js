import { ADMIN_DELETE_ORDER_REQUEST, ADMIN_DELETE_ORDER_SUCCESS, ADMIN_DELETE_ORDER_FAILURE} from "../../@constants/orderConstants";
import { apis } from "../../@services/apis";

export const adminDeleleOrder = (id) => async(dispatch) => {
    try {
        dispatch({
            type : ADMIN_DELETE_ORDER_REQUEST
        })

        const {data} = await apis.adminDelOrder(id)
        dispatch({
            type : ADMIN_DELETE_ORDER_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : ADMIN_DELETE_ORDER_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}
