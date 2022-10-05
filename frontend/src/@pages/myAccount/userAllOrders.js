import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminAllOrders } from '../../@actions/orderActions/getAdminAllOrders'
import { getloggedinUserOrders } from '../../@actions/orderActions/getLoggedinUserOrders'
import AccountLayout from '../../@components/accountLayout'
import AdminOrders from '../../@components/adminOrders'
import Loader from '../../@components/loader'
import SideBar from '../../@components/sideBar'
import AllOrders from './allOrders'

const UserAllOrders = () => {
    window.onpopstate = function (event) {
        if (event) {
            window.location.reload(false).scrollTo(0, 0)
        }
    }

    const dispatch = useDispatch()
    const { getOrdersLoggedinUser, getOrdersLoggedinUserLoading, getOrdersLoggedinUserSuccess, getOrdersLoggedinUserError, getOrdersCountLoggedinUser, getOrdersLoggedinUserResultPerPage } = useSelector(state => state.getOrdersLoggedinUser)
    const [currentPage, setCurrentPage] = useState(1)
    const setCurrentPageNo = () => {
        setCurrentPage(page => page + 1)
    }

    useEffect(() => {
        dispatch(getloggedinUserOrders(currentPage))
    }, [dispatch, currentPage])
    console.log(getOrdersLoggedinUser)
    
    const [allOrders, setAllOrders] = useState([])

    useEffect(() => {
        if (getOrdersLoggedinUserSuccess) {
            setAllOrders(allOrders.concat(getOrdersLoggedinUser.orders))
        }
    }, [getOrdersLoggedinUserSuccess, getOrdersLoggedinUser])

    console.log('allOrders......', allOrders)

    return (
        <>
            <AccountLayout>
                {getOrdersLoggedinUserLoading ? <Loader />
                    : getOrdersLoggedinUserSuccess &&
                    <AllOrders getOrdersLoggedinUser={getOrdersLoggedinUser} getOrdersLoggedinUserLoading={getOrdersLoggedinUserLoading} getOrdersLoggedinUserSuccess={getOrdersLoggedinUserSuccess} getOrdersLoggedinUserResultPerPage={getOrdersLoggedinUserResultPerPage} getOrdersCountLoggedinUser={getOrdersCountLoggedinUser} getOrdersLoggedinUserError = {getOrdersLoggedinUserError} currentPage={currentPage} setCurrentPageNo={setCurrentPageNo} allOrders={allOrders} />}
            </AccountLayout>
        </>
    )
}

export default UserAllOrders