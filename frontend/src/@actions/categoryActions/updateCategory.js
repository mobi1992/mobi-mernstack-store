import axios from 'axios'
import { UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAILURE} from "../../@constants/categoryConstants"
import { apis } from '../../@services/apis'

export const updateCategory = (id, name) => async(dispatch) => {
    try {
        dispatch({
            type : UPDATE_CATEGORY_REQUEST
        })

        const {data} = await apis.updateCatg(id, name)
        
        dispatch({
            type : UPDATE_CATEGORY_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : UPDATE_CATEGORY_FAILURE,
            payload : error.response.data.error
        })
        console.log(error)
    }
}