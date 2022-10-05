import { GET_ORDER_WITH_ORDER_NO_EMAIL_REQUEST, GET_ORDER_WITH_ORDER_NO_EMAIL_SUCCESS, GET_ORDER_WITH_ORDER_NO_EMAIL_FAILURE} from "../../@constants/orderConstants";
import { apis } from "../../@services/apis";

export const getUnknownUserOrderWithOrderNo = ({orderNo, email, id}) => async(dispatch) => {
    try {
        dispatch({
            type : GET_ORDER_WITH_ORDER_NO_EMAIL_REQUEST
        })

        const {data} = await apis.getUnkUserOrderWithOrderNo({orderNo, email, id})
        dispatch({
            type : GET_ORDER_WITH_ORDER_NO_EMAIL_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : GET_ORDER_WITH_ORDER_NO_EMAIL_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}
