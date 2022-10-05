import { UPDATE_PRODUCT_STOCK_REQUEST, UPDATE_PRODUCT_STOCK_SUCCESS, UPDATE_PRODUCT_STOCK_FAILURE } from "../../@constants/productConstants"
import { apis } from '../../@services/apis'

export const updateProductStock = ({id, quantity}) => async (dispatch) =>  {
    try {
        dispatch({
            type : UPDATE_PRODUCT_STOCK_REQUEST
        })

        const {data} = await apis.updateProductStk({id, quantity})

        dispatch({
            type : UPDATE_PRODUCT_STOCK_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : UPDATE_PRODUCT_STOCK_FAILURE,
            payload : error.response,
        })
        console.log(error)
    }
}

