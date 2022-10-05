import { DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILURE, CLEAR_ERRORS } from "../../@constants/categoryConstants"

export const deleteCategoryReducer = (state = { deletedCategory: {} }, action) => {
    switch (action.type) {
        case DELETE_CATEGORY_REQUEST:
            return {
                deletedCategoryLoading: true,
                deletedCategorySuccess : false,
                deletedCategory: {}
            }
        case DELETE_CATEGORY_SUCCESS:
            return {
                deletedCategoryLoading: false,
                deletedCategorySuccess : action.payload.success,
                deletedCategory: action.payload.category
            }
        case DELETE_CATEGORY_FAILURE:
            return {
                deletedCategoryLoading: false,
                deletedCategorySuccess : false,
                deletedCategoryError: action.payload,
                deletedCategory : {}
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
