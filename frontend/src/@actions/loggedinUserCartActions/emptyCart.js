import { LOGGEDIN_USER_EMPTY_CART_REQUEST, LOGGEDIN_USER_EMPTY_CART_SUCCESS, LOGGEDIN_USER_EMPTY_CART_FAILURE} from "../../@constants/loggedinUserCartConstants";
import { apis } from "../../@services/apis";
export const loggedinUserEmptyCart = () => async(dispatch) => {
    try {
        dispatch({
            type : LOGGEDIN_USER_EMPTY_CART_REQUEST
        })

        const {data} = await apis.loggedinUsrEmptyCart()
        dispatch({
            type : LOGGEDIN_USER_EMPTY_CART_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : LOGGEDIN_USER_EMPTY_CART_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}