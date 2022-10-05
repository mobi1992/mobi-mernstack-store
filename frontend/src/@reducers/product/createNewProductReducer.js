import { CREATE_NEW_PRODUCT_REQUEST, CREATE_NEW_PRODUCT_SUCCESS, CREATE_NEW_PRODUCT_FAILURE, CLEAR_ERRORS } from "../../@constants/productConstants"

export const createNewProductReducer = (state = { createNewprod: [] }, action) => {
    switch (action.type) {
        case CREATE_NEW_PRODUCT_REQUEST:
            return {
                createNewprodLoading: true,
                createNewprod : null,
                createNewprodSuccess : null
            }
        case CREATE_NEW_PRODUCT_SUCCESS:
            return {
                createNewprodLoading: false,
                createNewprod : action.payload.product,
                createNewprodSuccess : action.payload.success
            }
        case CREATE_NEW_PRODUCT_FAILURE:
            return {
                createNewprodLoading: false,
                createNewprodError: action.payload.data.error,
                code : action.payload.status,
                createNewprod : null,
                createNewprodSuccess : null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                createNewprodError: null
            }
        default:
            return state
    }
}