
import React, { useEffect, useState } from 'react'
import UserOrders from '../../@components/userOrders'
import UsersNoMoreOrders from '../../@components/usersNoMoreOrders'
import UsersShowMoreOrders from '../../@components/usersShowMoreOrders'

const AllOrders = ({getOrdersLoggedinUser, getOrdersLoggedinUserLoading, getOrdersLoggedinUserSuccess, getOrdersLoggedinUserError, getOrdersLoggedinUserResultPerPage, getOrdersCountLoggedinUser, currentPage, setCurrentPageNo, allOrders}) => {
    
    
   

    console.log('currentPage................', currentPage)
    if (getOrdersLoggedinUserResultPerPage * currentPage < getOrdersCountLoggedinUser) {
        return (
            <>
            <UserOrders allOrders = {allOrders} getOrdersLoggedinUserLoading = {getOrdersLoggedinUserLoading} getOrdersLoggedinUserSuccess ={getOrdersLoggedinUserSuccess} getOrdersLoggedinUserError = {getOrdersLoggedinUserError} />
                <UsersShowMoreOrders setCurrentPageNo={setCurrentPageNo} /> 
        </>
        )
    }

    else if (currentPage === 1) {
        return (
            <>
            <UserOrders allOrders = {allOrders} getOrdersLoggedinUserLoading = {getOrdersLoggedinUserLoading} getOrdersLoggedinUserSuccess ={getOrdersLoggedinUserSuccess} getOrdersLoggedinUserError = {getOrdersLoggedinUserError} /> 
        </>
        )
    }
    else {
    return (
        <>
            <UserOrders allOrders = {allOrders} getOrdersLoggedinUserLoading = {getOrdersLoggedinUserLoading} getOrdersLoggedinUserSuccess ={getOrdersLoggedinUserSuccess} getOrdersLoggedinUserError = {getOrdersLoggedinUserError} />
                <UsersNoMoreOrders />
        </>
    )
}
}

export default AllOrders