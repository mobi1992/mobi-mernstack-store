import React, { useEffect, useState } from 'react'
import Home from './home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Loader from '../@components/loader'
import CategoryItems from './categoryItems'
import AllProducts from './allProducts'
import ProductDetail from './productDetail'
import SearchPopover from '../@components/navBar/searchPopover'
import SearchedProduct from './searchedProduct'
import LogIn from './login'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../@actions/userActions/getUserDetails'
import Announcement from '../@components/announcement'
import NavBar from '../@components/navBar'
import MyAccount from './myAccount/account'
import Addresses from './myAccount/addresses'
import AccountDetails from './myAccount/accountDetails'
import SignUp from './signUp'
import { routePaths } from '../@services/constants'
import UpdateTheProfile from './myAccount/updateTheProfile'
import UpdateThePassword from './myAccount/updateThePassword'
import ForgetThePassword from './myAccount/forgetThePassword'
import ResetThePassword from './myAccount/resetThePassword'
import { unknownUserGetCart } from '../@actions/unknownUserCartActions/getCartItems'
import { loggedinUserGetCart } from '../@actions/loggedinUserCartActions/getCartItems'
import NavBar2 from '../@components/navBarNoCart'
import MainCartContainer from './unknownUserMainCart'
import MainCartContainer2 from './mainCart'
import CheckoutUnk from './checkoutUnkUser'
import Checkout from './checkoutLoggedinUser'
import { createNewOrderUnknownUser } from '../@actions/orderActions/createNewOrderUnknownUser'
import UnknownUserNewOrder from './order/unknownUserNewOrder'
import UnknownUserGetOrder from './order/unknownUserGetOrder'
import { getUnknownUserOrderWithOrderId } from '../@actions/orderActions/getUnknownUserOrderWithOrderId'
import LoggedinUserOrder from './order/loggedinUserGetOrder'
import AdminAccount from './adminAccount/account'
import CreateProduct from './admin/createProduct'
import { getCategories } from '../@actions/categoryActions/getAllCategories'
import CreateCategory from './admin/createCategory'
import AdminAllProducts from './admin/allProducts'
import AdminHome from './admin/homeProducts'
import AdminCategoryItems from './admin/categoryItems'
import AdminProductDetail from './admin/adminProductDetails'
import AdminUpdateProduct from './admin/adminUpdateProduct'
import AdminAllOrders from './admin/adminAllOrders'
import AdminViewSingleOrder from './admin/adminViewSingleOrder'
import AdminAllUsers from './admin/adminAllUsers'
import NewsLetter from '../@components/newsLetter'
import Footer from '../@components/footer'
import UpdateTheAddress from './myAccount/updateAddress'
import UserAllOrders from './myAccount/userAllOrders'
const MainApp = () => {
  // const navigate = useNavigate()
  // const [searchParams, setSearchParams] = useSearchParams()
  // const keyword = searchParams.get('keyword') || ''
  const { loading, userDetails, error, isAuthenticated, isAdmin} = useSelector(state => state.userDetails)
  const {catgLoading, categories} = useSelector(state => state.categories)
  const {getCartItemsUnknownUser,getCartItemsUnknownUserSuccess, getCartItemsUnknownUserError} = useSelector(state => state.getCartItemsUnknownUser)
  const {getCartItemsLoggedinUser,getCartItemsLoggedinUserSuccess, getCartItemsLoggedinUserError} = useSelector(state => state.getCartItemsLoggedinUser)
  console.log('get cart items logged in user', getCartItemsLoggedinUser)
  console.log('loggedin user cart error', getCartItemsLoggedinUserError)
  console.log('user detaials ', userDetails)
  // console.log('role of user is', isAdmin)

  const dispatch = useDispatch()

  // const createNewOrderForUnknownUser = async ({shippingInfo, paymentInfo, shippingPrice}) => {
  //   await dispatch(createNewOrderUnknownUser({shippingInfo, paymentInfo, shippingPrice}))
  //   // dispatch(getUnknownUserOrderWithOrderId(routePaths.order))
  // }

  // const {createNewOrderUnkSuccess, createNewOrderUnk, createNewOrderUnkError, createNewOrderUnkLoading} = useSelector(state => state.createNewOrderUnk)

  const {getOrderUnkWithOrderIdSuccess, getOrderUnkWithOrderId, getOrderUnkWithOrderIdError, getOrderUnkWithOrderIdLoading} = useSelector(state => state.getOrderUnkWithOrderId)

  useEffect(() => {
    dispatch(getUserDetails())
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loggedinUserGetCart())
    }
    else {
      dispatch(unknownUserGetCart())
      // dispatch(getUnknownUserOrderWithOrderId(routePaths.order))
    }
  }, [isAuthenticated])
  
  
  return (
    <>
      {loading === false &&
        <Router>
          {isAdmin ? <div style = {{display : 'none'}}>
            <Announcement />
          {isAuthenticated && getCartItemsLoggedinUserSuccess ? <NavBar userDetails={userDetails} getCartItems = {getCartItemsLoggedinUser}/> : !isAuthenticated && getCartItemsUnknownUserSuccess && <NavBar userDetails={userDetails} getCartItems = {getCartItemsUnknownUser} />}
          
          {/* we have tp check the conditions carefully otherwise navbar is shown multiple times, whensoever a conditions becomes true */}
          {isAuthenticated && getCartItemsLoggedinUserError ? <NavBar2 userDetails={userDetails} cartError = {getCartItemsLoggedinUserError}/> : !isAuthenticated && getCartItemsUnknownUserError && <NavBar2 userDetails={userDetails} cartError = {getCartItemsUnknownUserError}/>}
          </div> : 
          <div>
            <Announcement />
          {isAuthenticated && getCartItemsLoggedinUserSuccess ? <NavBar userDetails={userDetails} getCartItems = {getCartItemsLoggedinUser}/> : !isAuthenticated && getCartItemsUnknownUserSuccess && <NavBar userDetails={userDetails} getCartItems = {getCartItemsUnknownUser} />}
          
          {/* we have tp check the conditions carefully otherwise navbar is shown multiple times, whensoever a conditions becomes true */}
          {isAuthenticated && getCartItemsLoggedinUserError ? <NavBar2 userDetails={userDetails} cartError = {getCartItemsLoggedinUserError}/> : !isAuthenticated && getCartItemsUnknownUserError && <NavBar2 userDetails={userDetails} cartError = {getCartItemsUnknownUserError}/>}</div>
          }
  
          <Routes>
            <Route exact path='/' element={isAdmin ? <Navigate to = {routePaths.adminAccount} replace /> : <Home isAuthenticated = {isAuthenticated} />} />
            <Route exact path={routePaths.allProducts} element={isAdmin ? <Navigate to = {routePaths.adminAccount} replace /> :  <AllProducts isAuthenticated = {isAuthenticated}/>} />
            <Route exact path={routePaths.category_items} element={isAdmin ? <Navigate to = {routePaths.adminAccount} replace /> :  <CategoryItems isAuthenticated = {isAuthenticated}/>} />
            <Route exact path={routePaths.product_detail} element={isAdmin ? <Navigate to = {routePaths.adminAccount} replace /> :  <ProductDetail userDetails={userDetails} isAuthenticated={isAuthenticated}/>} />
            <Route exact path={routePaths.searched_product} element={isAdmin ? <Navigate to = {routePaths.adminAccount} replace /> :  <SearchedProduct isAuthenticated = {isAuthenticated}/>} />
            <Route exact path={routePaths.login} element={isAdmin ? <Navigate to = {routePaths.adminAccount} replace /> :  <LogIn/>} />
            <Route exact path={routePaths.signup} element={isAdmin ? <Navigate to = {routePaths.adminAccount} replace /> :  <SignUp />} />
            <Route exact path={routePaths.my_account} element={!isAuthenticated ? <Navigate to = {routePaths.login} replace/> : <MyAccount userDetails={userDetails} /> } />
            <Route exact path={routePaths.orders} element={!isAuthenticated ? <Navigate to = {routePaths.login} replace/> : <UserAllOrders userDetails={userDetails}/>} />
            <Route exact path={routePaths.addresses} element={!isAuthenticated ? <Navigate to = {routePaths.login} replace/> : <Addresses userDetails={userDetails}/>} />
            <Route exact path={routePaths.account_detail} element={!isAuthenticated ? <Navigate to = {routePaths.login} replace/> : <AccountDetails userDetails={userDetails}/> } />
            <Route exact path={routePaths.edit_details} element={!isAuthenticated ? <Navigate to = {routePaths.login} replace/> :<UpdateTheProfile userDetails = {userDetails}/>}/>
            <Route exact path={routePaths.edit_address} element={!isAuthenticated ? <Navigate to = {routePaths.login} replace/> :<UpdateTheAddress userDetails = {userDetails}/>}/>
            <Route exact path={routePaths.password_update} element={!isAuthenticated ? <Navigate to = {routePaths.login} replace/> : <UpdateThePassword userDetails = {userDetails}/>}/>
            <Route exact path={routePaths.forget_password} element={<ForgetThePassword />}/>
            <Route exact path={routePaths.reset_password} element={<ResetThePassword />}/>
            <Route exact path={routePaths.mainCart} element={isAuthenticated ? <MainCartContainer2 /> : <MainCartContainer />} />
            {/* <Route exact path={routePaths.mainCart} element={<MainCartContainer2 />}/> */}
            <Route exact path={routePaths.checkout} element={isAuthenticated ? <Checkout userDetails = {userDetails} getCartItemsLoggedinUser = {getCartItemsLoggedinUser} getCartItemsLoggedinUserError = {getCartItemsLoggedinUserError} getCartItemsLoggedinUserSuccess = {getCartItemsLoggedinUserSuccess}/> : <CheckoutUnk  getCartItemsUnknownUser = {getCartItemsUnknownUser} getCartItemsUnknownUserError = {getCartItemsUnknownUserError} getCartItemsUnknownUserSuccess = {getCartItemsUnknownUserSuccess} />}/>
            <Route exact path = {routePaths.order} element = {<UnknownUserNewOrder />} />
            <Route exact path = {routePaths.loggedinUserOrder} element = {<LoggedinUserOrder />} />
            <Route exact path={routePaths.adminAccount} element = {!isAdmin ? <Navigate to = {routePaths.login} replace/> : <AdminAccount userDetails = {userDetails}/>} />
            {catgLoading === false && <Route exact path = {routePaths.createProduct} element = {!isAdmin ? <Navigate to = {routePaths.login} replace /> : <CreateProduct categories={categories} catgLoading = {catgLoading}/>}/>}
            {catgLoading === false && <Route exact path = {routePaths.createCategory} element = {!isAdmin ? <Navigate to = {routePaths.login} replace /> : <CreateCategory categories = {categories} catgLoading = {catgLoading} />} />}
            <Route exact path = {routePaths.adminAllProducts} element = {!isAdmin ? <Navigate to = {routePaths.login} replace /> : <AdminAllProducts />}/>
            <Route exact path = {routePaths.adminHome} element = {!isAdmin ? <Navigate to = {routePaths.login} replace /> : <AdminHome />}/>
            <Route exact path = {routePaths.adminCategoryItems} element = {!isAdmin ? <Navigate to = {routePaths.login} replace /> : <AdminCategoryItems />}/>
            <Route exact path = {routePaths.admin_product_detail} element = {!isAdmin ? <Navigate to = {routePaths.login} replace /> : <AdminProductDetail categories = {categories} catgLoading = {catgLoading}/>}/>
            <Route exact path = {routePaths.admin_update_product} element = {!isAdmin ? <Navigate to = {routePaths.login} replace /> : <AdminUpdateProduct categories = {categories} catgLoading = {catgLoading}/>}/>
            <Route exact path = {routePaths.admin_all_orders} element = {!isAdmin ? <Navigate to = {routePaths.login} replace /> : <AdminAllOrders />}/>
            <Route exact path = {routePaths.admin_single_order} element = {!isAdmin ? <Navigate to = {routePaths.login} replace /> : <AdminViewSingleOrder />}/>
            <Route exact path = {routePaths.admin_get_all_users} element = {!isAdmin ? <Navigate to = {routePaths.login} replace /> : <AdminAllUsers />}/>
          </Routes>
          {!isAdmin && <>
          <NewsLetter />
          <Footer />
          </>}
        </Router>
}
    </>
  )
}

export default MainApp












