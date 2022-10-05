import { CREATE_NEW_CATEGORY_REQUEST, CREATE_NEW_CATEGORY_SUCCESS, CREATE_NEW_CATEGORY_FAILURE, CLEAR_ERRORS } from "../../@constants/categoryConstants"

export const createNewCategoryReducer = (state = { newCategory: {} }, action) => {
    switch (action.type) {
        case CREATE_NEW_CATEGORY_REQUEST:
            return {
                newCategoryLoading: true,
                newCategorySuccess : false,
                newCategory: {}
            }
        case CREATE_NEW_CATEGORY_SUCCESS:
            return {
                newCategoryLoading: false,
                newCategorySuccess : action.payload.success,
                newCategory: action.payload.category
            }
        case CREATE_NEW_CATEGORY_FAILURE:
            return {
                newCategoryLoading: false,
                newCategorySuccess : false,
                newCategoryError: action.payload,
                newCategory : {}
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
