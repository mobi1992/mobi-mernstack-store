import { UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE } from "../../@constants/productConstants"
import { apis } from '../../@services/apis'

export const updateTheProduct = ({name, price, ingredients, description, stock, catgs, image, relatedProducts}, id) => async (dispatch) =>  {
    try {
        dispatch({
            type : UPDATE_PRODUCT_REQUEST
        })

        const {data} = await apis.updateProd({name, price, ingredients, description, stock, catgs, image, relatedProducts}, id)

        dispatch({
            type : UPDATE_PRODUCT_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : UPDATE_PRODUCT_FAILURE,
            payload : error.response,
        })
        console.log(error)
    }
}

