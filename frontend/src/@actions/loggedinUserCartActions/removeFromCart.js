import { LOGGEDIN_USER_REMOVE_ITEM_CART_REQUEST, LOGGEDIN_USER_REMOVE_ITEM_CART_SUCCESS, LOGGEDIN_USER_REMOVE_ITEM_CART_FAILURE} from "../../@constants/loggedinUserCartConstants";
import { apis } from "../../@services/apis";
export const loggedinUserRemoveFromCart = ({product}) => async(dispatch) => {
    try {
        dispatch({
            type : LOGGEDIN_USER_REMOVE_ITEM_CART_REQUEST
        })

        const {data} = await apis.loggedinUsrRemoveFromCart({product})
        dispatch({
            type : LOGGEDIN_USER_REMOVE_ITEM_CART_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : LOGGEDIN_USER_REMOVE_ITEM_CART_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}