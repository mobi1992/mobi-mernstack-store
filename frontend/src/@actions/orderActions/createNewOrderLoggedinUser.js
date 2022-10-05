import { CREATE_NEW_ORDER_REQUEST_LOGGEDIN_USER, CREATE_NEW_ORDER_SUCCESS_LOGGEDIN_USER, CREATE_NEW_ORDER_FAILURE_LOGGEDIN_USER} from "../../@constants/orderConstants";
import { apis } from "../../@services/apis";
export const createNewOrderLoggedinUser = ({shippingInfo, paymentInfo, shippingPrice}) => async(dispatch) => {
    try {
        dispatch({
            type : CREATE_NEW_ORDER_REQUEST_LOGGEDIN_USER
        })

        const {data} = await apis.createNewOrderLoggedinUsr({shippingInfo, paymentInfo, shippingPrice})
        dispatch({
            type : CREATE_NEW_ORDER_SUCCESS_LOGGEDIN_USER,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : CREATE_NEW_ORDER_FAILURE_LOGGEDIN_USER,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}