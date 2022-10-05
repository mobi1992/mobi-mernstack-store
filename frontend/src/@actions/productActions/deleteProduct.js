import { DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE } from "../../@constants/productConstants"
import { apis } from '../../@services/apis'

export const deleteProduct = (id) => async (dispatch) =>  {
    try {
        dispatch({
            type : DELETE_PRODUCT_REQUEST
        })

        const {data} = await apis.deleteProd(id)

        dispatch({
            type : DELETE_PRODUCT_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : DELETE_PRODUCT_FAILURE,
            payload : error.response,
        })
        console.log(error)
    }
}

