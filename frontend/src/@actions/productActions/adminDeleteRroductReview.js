import { ADMIN_DELETE_PRODUCT_REVIEW_REQUEST, ADMIN_DELETE_PRODUCT_REVIEW_SUCCESS, ADMIN_DELETE_PRODUCT_REVIEW_FAILURE } from "../../@constants/productConstants"
import { apis } from '../../@services/apis'

export const adminDeleteProductReview = (id, reviewId) => async (dispatch) =>  {
    try {
        dispatch({
            type : ADMIN_DELETE_PRODUCT_REVIEW_REQUEST
        })

        const {data} = await apis.deleteProductReview(id, reviewId)

        dispatch({
            type : ADMIN_DELETE_PRODUCT_REVIEW_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : ADMIN_DELETE_PRODUCT_REVIEW_FAILURE,
            payload : error.response,
        })
        console.log(error)
    }
}

