import { LOGGEDIN_USER_CHANGE_QTY_CART_REQUEST, LOGGEDIN_USER_CHANGE_QTY_CART_SUCCESS, LOGGEDIN_USER_CHANGE_QTY_CART_FAILURE} from "../../@constants/loggedinUserCartConstants";
import { apis } from "../../@services/apis";
export const loggedinUserChangeQty = ({product, quantity}) => async(dispatch) => {
    try {
        dispatch({
            type : LOGGEDIN_USER_CHANGE_QTY_CART_REQUEST
        })

        const {data} = await apis.loggedinUsrChangeQty({product, quantity})
        dispatch({
            type : LOGGEDIN_USER_CHANGE_QTY_CART_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : LOGGEDIN_USER_CHANGE_QTY_CART_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}