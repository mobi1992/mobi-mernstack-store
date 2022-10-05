import React, { useEffect, useState } from 'react'
import './index.css'
import AccountLayout from '../../@components/accountLayout'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '../../@services/constants'

const MyAccount = ({ userDetails }) => {
  // const [userInfo, setUserInfo] = useState(undefined)
  // useEffect(() => {
  //   setUserInfo(userDetails)
  //   // setNoUserDetails(false)
  //   // console.log('user details', userInfo.user)
  // }, [userDetails])
const navigate = useNavigate()

  const linkToOrders = () => {
    navigate(routePaths.orders)
}

const linkToAccountDetails = () => {
    navigate(routePaths.account_detail)
}

const linkToAddresses = () => {
    navigate(routePaths.addresses)
}
  return (
    <AccountLayout>
      <div className='account_details'>
      <div>
        <p style={{ display: 'inline' }}>Hello</p> <p style={{ fontWeight: 'bolder', display: 'inline' }}>{userDetails.user.firstName} !</p>
      </div>
      <p style={{ display: 'inline' }}>From your account dashboard you will be able to view </p> <p className='my-account' style={{ display: 'inline' }} onClick = {linkToOrders}> recent orders</p>, <p style={{ display: 'inline' }}>manage your </p> <p className='my-account' style={{ display: 'inline' }} onClick = {linkToAddresses}>addresses</p><p style={{ display: 'inline' }}>, and edit your </p> <p className='my-account' style={{ display: 'inline' }} onClick = {linkToAccountDetails}>account details</p><p style={{ display: 'inline' }}> and </p> <p className='my-account' style={{ display: 'inline' }} onClick = {linkToAccountDetails}>passwords</p>
      </div>
    </AccountLayout>
  )
}

export default MyAccount