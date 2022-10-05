import { CLEAR_ERRORS } from "../../@constants/productConstants"
export const clearProductErrors = () => async (dispatch) => {
    dispatch({
        type : CLEAR_ERRORS
    })
}