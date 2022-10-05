import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminGetAllUsers } from '../../@actions/userActions/adminGetAllUsers'
import Loader from '../../@components/loader'
import SideBar from '../../@components/sideBar'
import AllUsers from './allUsers'


const AdminAllUsers = () => {
    window.onpopstate = function (event) {
        if (event) {
            window.location.reload(false).scrollTo(0, 0)
        }
    }

    const dispatch = useDispatch()
    const { allUsers, allUsersLoading, allUsersSuccess, allUsersError, allUsersResultPerPage, allUsersCount } = useSelector(state => state.allUsers)
    const [currentPage, setCurrentPage] = useState(1)
    const setCurrentPageNo = () => {
        setCurrentPage(page => page + 1)
    }
    useEffect(() => {
        dispatch(adminGetAllUsers(currentPage))
    }, [dispatch, currentPage])

    console.log('allusers', allUsers)
    const [allTheUsers, setAllTheUsers] = useState([])
    
    useEffect(() => {
        if(allUsersSuccess) {
            setAllTheUsers(allTheUsers.concat(allUsers.users))
        }
    }, [allUsersSuccess, allUsers])


    return (
        <>
         <SideBar>
        {allUsersLoading ? <Loader />
        : allUsersSuccess && 
        <AllUsers allUsersLoading = {allUsersLoading} allUsersSuccess = {allUsersSuccess} allUsersResultPerPage = {allUsersResultPerPage} allUsersCount = {allUsersCount} currentPage = {currentPage} setCurrentPageNo = {setCurrentPageNo} allTheUsers = {allTheUsers}/>}
        </SideBar>
        </>
    )
}

export default AdminAllUsers