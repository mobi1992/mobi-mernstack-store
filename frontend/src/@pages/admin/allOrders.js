import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminAllOrders } from '../../@actions/orderActions/getAdminAllOrders'
import AdminOrders from '../../@components/adminOrders'
import NoMoreOrders from '../../@components/noMoreOrders'
import ShowMoreOrders from '../../@components/showMoreOrders'

const AllOrders = ({adminAllOrders, adminAllOrdersLoading, adminAllOrdersSuccess, adminAllOrdersError, adminAllOrdersResultPerPage, adminAllOrdersCount, currentPage, setCurrentPageNo, allOrders}) => {
    
    
   

    console.log('currentPage................', currentPage)
    if (adminAllOrdersResultPerPage * currentPage < adminAllOrdersCount) {
        return (
            <>
            <AdminOrders allOrders = {allOrders} adminAllOrdersLoading = {adminAllOrdersLoading} adminAllOrdersSuccess ={adminAllOrdersSuccess} adminAllOrdersError = {adminAllOrdersError} />
                <ShowMoreOrders setCurrentPageNo={setCurrentPageNo} /> 
        </>
        )
    }

    else if (currentPage === 1) {
        return (
            <>
            <AdminOrders allOrders = {allOrders} adminAllOrdersLoading = {adminAllOrdersLoading} adminAllOrdersSuccess ={adminAllOrdersSuccess} adminAllOrdersError = {adminAllOrdersError} /> 
        </>
        )
    }
    else {
    return (
        <>
            <AdminOrders allOrders = {allOrders} adminAllOrdersLoading = {adminAllOrdersLoading} adminAllOrdersSuccess ={adminAllOrdersSuccess} adminAllOrdersError = {adminAllOrdersError} />
                <NoMoreOrders />
        </>
    )
}
}

export default AllOrders


