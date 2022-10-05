import { UNKNOWN_USER_CHANGE_QTY_CART_REQUEST, UNKNOWN_USER_CHANGE_QTY_CART_SUCCESS, UNKNOWN_USER_CHANGE_QTY_CART_FAILURE} from "../../@constants/unknownUserCartConstants";
import { apis } from "../../@services/apis";
export const unknownUserChangeQty = ({product, quantity}) => async(dispatch) => {
    try {
        dispatch({
            type : UNKNOWN_USER_CHANGE_QTY_CART_REQUEST
        })

        const {data} = await apis.unknownUsrChangeQty({product, quantity})
        dispatch({
            type : UNKNOWN_USER_CHANGE_QTY_CART_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : UNKNOWN_USER_CHANGE_QTY_CART_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}