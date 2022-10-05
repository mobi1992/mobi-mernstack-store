import { CREATE_NEW_PRODUCT_REQUEST, CREATE_NEW_PRODUCT_SUCCESS, CREATE_NEW_PRODUCT_FAILURE } from "../../@constants/productConstants"
import { apis } from '../../@services/apis'

export const createNewProduct = ({name, price, ingredients, description, stock, catgs, image, relatedProducts}) => async (dispatch) =>  {
    try {
        dispatch({
            type : CREATE_NEW_PRODUCT_REQUEST
        })

        const {data} = await apis.createProd({name, price, ingredients, description, stock, catgs, image, relatedProducts})

        dispatch({
            type : CREATE_NEW_PRODUCT_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : CREATE_NEW_PRODUCT_FAILURE,
            payload : error.response,
        })
        console.log(error)
    }
}

