import { UNKNOWN_USER_EMPTY_CART_REQUEST, UNKNOWN_USER_EMPTY_CART_SUCCESS, UNKNOWN_USER_EMPTY_CART_FAILURE} from "../../@constants/unknownUserCartConstants";
import { apis } from "../../@services/apis";
export const unknownUserEmptyCart = () => async(dispatch) => {
    try {
        dispatch({
            type : UNKNOWN_USER_EMPTY_CART_REQUEST
        })

        const {data} = await apis.unknowUsrEmptyCart()
        dispatch({
            type : UNKNOWN_USER_EMPTY_CART_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : UNKNOWN_USER_EMPTY_CART_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}