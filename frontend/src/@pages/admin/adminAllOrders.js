import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminAllOrders } from '../../@actions/orderActions/getAdminAllOrders'
import AdminOrders from '../../@components/adminOrders'
import Loader from '../../@components/loader'
import SideBar from '../../@components/sideBar'
import AllOrders from './allOrders'

const AdminAllOrders = () => {
    window.onpopstate = function (event) {
        if (event) {
            window.location.reload(false).scrollTo(0, 0)
        }
    }

    const dispatch = useDispatch()
    const { adminAllOrders, adminAllOrdersLoading, adminAllOrdersSuccess, adminAllOrdersError, adminAllOrdersResultPerPage, adminAllOrdersCount } = useSelector(state => state.adminAllOrders)
    const [currentPage, setCurrentPage] = useState(1)
    const setCurrentPageNo = () => {
        setCurrentPage(page => page + 1)
    }
    useEffect(() => {
        dispatch(getAdminAllOrders(currentPage))
    }, [dispatch, currentPage])

    
    const [allOrders, setAllOrders] = useState([])
    
    useEffect(() => {
        if(adminAllOrdersSuccess) {
            setAllOrders(allOrders.concat(adminAllOrders.orders))
        }
    }, [adminAllOrdersSuccess, adminAllOrders])


    return (
        <>
         <SideBar>
        {adminAllOrdersLoading ? <Loader />
        : adminAllOrdersSuccess && 
        <AllOrders adminAllOrders={adminAllOrders} adminAllOrdersLoading = {adminAllOrdersLoading} adminAllOrdersSuccess = {adminAllOrdersSuccess} adminAllOrdersResultPerPage = {adminAllOrdersResultPerPage} adminAllOrdersCount = {adminAllOrdersCount} currentPage = {currentPage} setCurrentPageNo = {setCurrentPageNo} allOrders = {allOrders}/>}
        </SideBar>
        </>
    )
}

export default AdminAllOrders