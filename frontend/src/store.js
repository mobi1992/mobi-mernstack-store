import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productReducer } from './@reducers/product/productReducer'
import { categoryReducer } from './@reducers/category/categoryReducer'
import { productDetailReducer } from './@reducers/product/productDetailsReducer'
import { categoryItemsReducer } from './@reducers/category/categoryItemsReducer'
import { loginReducer } from './@reducers/user/loginReducer'
import { userDetailsReducer } from './@reducers/user/userDetailsReducer'
import { productReviewsLoggedinUserReducer } from './@reducers/product/productReviewLoggedinUserReducer'
import {productReviewsUnknownUserReducer} from './@reducers/product/productReviewUnknownUserReducer'
import { signUpReducer } from './@reducers/user/signUpReducer'
import { logoutReducer } from './@reducers/user/logoutReducer'
import { updateProfileReducer } from './@reducers/user/updateProfileReducer'
import { updatePasswordReducer } from './@reducers/user/updatePasswordReducer'
import { forgetPasswordReducer } from './@reducers/user/forgetPasswordReducer'
import { resetPasswordReducer } from './@reducers/user/resetPasswordReducer'
import { addToCartReducerUnk } from './@reducers/unknownUserCart/addToCartReducer'
import { getCartItemsReducerUnk } from './@reducers/unknownUserCart/getCartItemsReducer'
import { incrementQtyReducerUnk } from './@reducers/unknownUserCart/incrementQtyReducer'
import { decrementQtyReducerUnk } from './@reducers/unknownUserCart/decrementQtyReducer'
import { removeFromCartReducerUnk } from './@reducers/unknownUserCart/removeFromCartReducer'
import { changeQtyReducerUnk } from './@reducers/unknownUserCart/changeQtyReducer'
import { addToCartReducerLoggedin } from './@reducers/loggedinUserCart/addToCartReducer'
import { getCartItemsReducerLoggedin } from './@reducers/loggedinUserCart/getCartItemsReducer'
import { incrementQtyReducerLoggedin } from './@reducers/loggedinUserCart/incrementQtyReducer'
import { decrementQtyReducerLoggedin } from './@reducers/loggedinUserCart/decrementQtyReducer'
import { removeFromCartReducerLoggedin } from './@reducers/loggedinUserCart/removeFromCartReducer'
import { changeQtyReducerLoggedin } from './@reducers/loggedinUserCart/changeQtyReducer'
import { createNewOrderUnkReducer } from './@reducers/order/createNewOrderUnkReducer'
import { getOrderUnkWithOrderIdReducer } from './@reducers/order/getUnknownUserOrderWithOrderIdReducer'
import { getOrderUnkWithOrderNoReducer } from './@reducers/order/getOrderUnkWithOrderNoReducer'
import { emptyCartReducerLoggedin } from './@reducers/loggedinUserCart/emptyCartReducer'
import { emptyCartReducerUnk } from './@reducers/unknownUserCart/emptyCartReducer'
import { updateProductStockReducer } from './@reducers/product/updateProductStockReducer'
import { getOrdersLoggedinUserReducer } from './@reducers/order/getLoggedinUserOrdersReducer'
import { updateAddressReducer } from './@reducers/user/updateAddressReducer'
import { createNewOrderLoggedinUserReducer } from './@reducers/order/createNewOrderLoggedinUserReducer'
import { getSingleOrderLoggedinUserReducer } from './@reducers/order/getLoggedinUserSingleOrderReducer'
import { createNewProductReducer } from './@reducers/product/createNewProductReducer'
import { createNewCategoryReducer } from './@reducers/category/createNewCategoryReducer'
import { updateCategoryReducer } from './@reducers/category/updateCategoryReducer'
import { deleteCategoryReducer } from './@reducers/category/deleteCategoryReducer'
import { updateProductReducer } from './@reducers/product/updateProductReducer'
import { deleteRelatedProductReducer } from './@reducers/product/deleteRelatedProductReducer'
import { deleteProductCategoryReducer } from './@reducers/product/deleteProductCategoryReducer'
import { deleteProductReducer } from './@reducers/product/deleteProductReducer'
import { getAdminAllOrdersReducer } from './@reducers/order/getAdminAllOrdersReducer'
import { updateOrderStatusReducer } from './@reducers/order/updateOrderStatusReducer'
import { adminDeleteOrderReducer } from './@reducers/order/adminDeleteOrderReducer'
import { adminGetSingleOrderReducer } from './@reducers/order/adminGetSingleOrderReducer'
import { adminGetAllUserReducer } from './@reducers/user/adminGetAllUsersReducer'
import { adminUpdateUserRoleReducer } from './@reducers/user/adminUpdateUserRoleReducer'
import { adminDeleteUserReducer } from './@reducers/user/adminDeleteUserReducer'
import { adminDeleteProductReviewReducer } from './@reducers/product/adminDeleteProductReviewReducer'
import { createNewsLetterReducer } from './@reducers/newsLetter/createNewsLetterReducer'
const reducer = combineReducers({
    products : productReducer,
    product : productDetailReducer,
    createNewprod : createNewProductReducer,
    updateProduct : updateProductReducer,
    deleteRelatedProd : deleteRelatedProductReducer,
    deleteProdCategory : deleteProductCategoryReducer,
    deletedProductReview : adminDeleteProductReviewReducer,
    updateProductStk : updateProductStockReducer,
    categories : categoryReducer,
    categoryProducts : categoryItemsReducer,
    newCategory : createNewCategoryReducer,
    updatedCategory : updateCategoryReducer,
    deletedCategory : deleteCategoryReducer,
    deleteProd : deleteProductReducer,
    user : loginReducer,
    userDetails : userDetailsReducer,
    allUsers : adminGetAllUserReducer,
    userRole : adminUpdateUserRoleReducer,
    deletedUser : adminDeleteUserReducer,
    reviewsLoggedinUser : productReviewsLoggedinUserReducer,
    reviewsUnknownUser : productReviewsUnknownUserReducer,
    userSignUp : signUpReducer,
    logoutUser : logoutReducer,
    updatedUser : updateProfileReducer,
    updatedUserAddress : updateAddressReducer,
    updatedPassword : updatePasswordReducer,
    forgotPassword : forgetPasswordReducer,
    resetPassword : resetPasswordReducer,
    addToCartUnknownUser : addToCartReducerUnk,
    getCartItemsUnknownUser : getCartItemsReducerUnk,
    incrementQtyUnknownUser : incrementQtyReducerUnk,
    decrementQtyUnknownUser : decrementQtyReducerUnk,
    removeFromCartUnknownUser : removeFromCartReducerUnk,
    emptyCartUnknownUser : emptyCartReducerUnk,
    changeQtyUnknownUser : changeQtyReducerUnk,
    addToCartLoggedinUser : addToCartReducerLoggedin,
    getCartItemsLoggedinUser : getCartItemsReducerLoggedin,
    incrementQtyLoggedinUser : incrementQtyReducerLoggedin,
    decrementQtyLoggedinUser : decrementQtyReducerLoggedin,
    removeFromCartLoggedinUser : removeFromCartReducerLoggedin,
    emptyCartLoggedinUser : emptyCartReducerLoggedin,
    changeQtyLoggedinUser : changeQtyReducerLoggedin,
    createNewOrderUnk : createNewOrderUnkReducer,
    createNewOrderloggedinUsr : createNewOrderLoggedinUserReducer,
    getOrderUnkWithOrderId : getOrderUnkWithOrderIdReducer,
    getOrderUnkWithOrderNo : getOrderUnkWithOrderNoReducer,
    getOrdersLoggedinUser : getOrdersLoggedinUserReducer,
    getSingleOrderLoggedinUser : getSingleOrderLoggedinUserReducer,
    adminAllOrders : getAdminAllOrdersReducer,
    orderStatus : updateOrderStatusReducer,
    deletedOrder : adminDeleteOrderReducer,
    singleOrderAdmin : adminGetSingleOrderReducer,
    newsLetter : createNewsLetterReducer
})
let initialState = {}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store