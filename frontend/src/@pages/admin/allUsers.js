import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminAllTheUsers from '../../@components/adminAllUsers'
import AdminOrders from '../../@components/adminOrders'
import NoMoreOrders from '../../@components/noMoreOrders'
import NoMoreUsers from '../../@components/noMoreUsers'
import ShowMoreUsers from '../../@components/showMoreUsers'

const AllUsers = ({ allUsersLoading, allUsersSuccess, allUsersError, allUsersResultPerPage, allUsersCount, currentPage, setCurrentPageNo, allTheUsers}) => {
    
    
   

    console.log('currentPage................', currentPage)
    if (allUsersResultPerPage * currentPage < allUsersCount) {
        return (
            <>
            <AdminAllTheUsers allTheUsers = {allTheUsers} allUsersLoading = {allUsersLoading} allUsersSuccess ={allUsersSuccess} allUsersError = {allUsersError} />
                <ShowMoreUsers setCurrentPageNo={setCurrentPageNo} /> 
        </>
        )
    }

    else if (currentPage === 1) {
        return (
            <>
            <AdminAllTheUsers allTheUsers = {allTheUsers} allUsersLoading = {allUsersLoading} allUsersSuccess ={allUsersSuccess} allUsersError = {allUsersError} /> 
        </>
        )
    }
    else {
    return (
        <>
            <AdminAllTheUsers allTheUsers = {allTheUsers} allUsersLoading = {allUsersLoading} allUsersSuccess ={allUsersSuccess} allUsersError = {allUsersError} />
                <NoMoreUsers />
        </>
    )
}
}

export default AllUsers