import { WRITE_PRODUCT_REVIEW_FOR_LOGGEDIN_USER_FAILURE, WRITE_PRODUCT_REVIEW_FOR_LOGGEDIN_USER_REQUEST, WRITE_PRODUCT_REVIEW_FOR_LOGGEDIN_USER_SUCCESS } from "../../@constants/productConstants";
import { apis } from "../../@services/apis";

export const productReviewsLoggedinUser = (productId, comment, rating) => async (dispatch) =>  {
    try {
        dispatch({
            type : WRITE_PRODUCT_REVIEW_FOR_LOGGEDIN_USER_REQUEST
        })

        const {data} = await apis.writeReviewLoggedinUser(productId, comment, rating)

        dispatch({
            type : WRITE_PRODUCT_REVIEW_FOR_LOGGEDIN_USER_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : WRITE_PRODUCT_REVIEW_FOR_LOGGEDIN_USER_FAILURE,
            payload : error.response,
        })
        console.log(error)
    }
}
