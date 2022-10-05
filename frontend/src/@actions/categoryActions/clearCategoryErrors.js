import { CLEAR_ERRORS } from "../../@constants/categoryConstants"
export const clearCategoryErrors = () => async (dispatch) => {
    dispatch({
        type : CLEAR_ERRORS
    })
}