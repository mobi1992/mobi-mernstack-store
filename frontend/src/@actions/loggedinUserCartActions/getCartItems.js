import { LOGGEDIN_USER_GET_CART_REQUEST, LOGGEDIN_USER_GET_CART_SUCCESS, LOGGEDIN_USER_GET_CART_FAILURE} from "../../@constants/loggedinUserCartConstants";
import { apis } from "../../@services/apis";
export const loggedinUserGetCart = () => async(dispatch) => {
    try {
        dispatch({
            type : LOGGEDIN_USER_GET_CART_REQUEST
        })

        const {data} = await apis.loggedinUsrGetCart()
        dispatch({
            type : LOGGEDIN_USER_GET_CART_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : LOGGEDIN_USER_GET_CART_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}