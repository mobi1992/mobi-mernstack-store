import { LOGGEDIN_USER_ADD_TO_CART_REQUEST, LOGGEDIN_USER_ADD_TO_CART_SUCCESS, LOGGEDIN_USER_ADD_TO_CART_FAILURE} from "../../@constants/loggedinUserCartConstants";
import { apis } from "../../@services/apis";
export const loggedinUserAddToCart = ({name, price, quantity, image, product, productStock}) => async(dispatch) => {
    try {
        dispatch({
            type : LOGGEDIN_USER_ADD_TO_CART_REQUEST
        })

        const {data} = await apis.loggedinUsrAddToCart({name, price, quantity, image, product, productStock})
        dispatch({
            type : LOGGEDIN_USER_ADD_TO_CART_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : LOGGEDIN_USER_ADD_TO_CART_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
       
    }
}