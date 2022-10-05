import axios from 'axios'
import { DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILURE} from "../../@constants/categoryConstants"
import { apis } from '../../@services/apis'

export const deleteCategory = (id) => async(dispatch) => {
    try {
        dispatch({
            type : DELETE_CATEGORY_REQUEST
        })

        const {data} = await apis.deleteCatg(id)
        
        dispatch({
            type : DELETE_CATEGORY_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : DELETE_CATEGORY_FAILURE,
            payload : error.response.data.error
        })
        console.log(error)
    }
}