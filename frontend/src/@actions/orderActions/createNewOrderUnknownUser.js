import { CREATE_NEW_ORDER_REQUEST_UNKNOWN_USER, CREATE_NEW_ORDER_SUCCESS_UNKNOWN_USER, CREATE_NEW_ORDER_FAILURE_UNKNOWN_USER} from "../../@constants/orderConstants";
import { apis } from "../../@services/apis";
export const createNewOrderUnknownUser = ({shippingInfo, paymentInfo, shippingPrice}) => async(dispatch) => {
    try {
        dispatch({
            type : CREATE_NEW_ORDER_REQUEST_UNKNOWN_USER
        })

        const {data} = await apis.createNewOrderUnk({shippingInfo, paymentInfo, shippingPrice})
        dispatch({
            type : CREATE_NEW_ORDER_SUCCESS_UNKNOWN_USER,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : CREATE_NEW_ORDER_FAILURE_UNKNOWN_USER,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}