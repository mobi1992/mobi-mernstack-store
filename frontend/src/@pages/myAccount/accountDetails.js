import React, { useState, useEffect } from 'react'
import AccountLayout from '../../@components/accountLayout'
import { Link, useNavigate } from 'react-router-dom'
import './index.css'
import { routePaths } from '../../@services/constants'
import { Button } from 'react-bootstrap'
const AccountDetails = ({ userDetails }) => {
  // const [userInfo, setUserInfo] = useState(undefined)
  // useEffect(() => {
  //   setUserInfo(userDetails)
  //   // setNoUserDetails(false)
  //   // console.log('user details', userInfo.user)
  // }, [userDetails])
  console.log(userDetails)
  return (
    <div>
      <AccountLayout>
        <div className='account_details'>
          <h5 style={{ fontWeight: 'bold' }}>Full Name</h5>
          <p>{userDetails.user.firstName} {userDetails.user.lastName}</p>
          <br></br>

          <h5 style={{ fontWeight: 'bold' }}>Email</h5>
          <p>{userDetails.user.email}</p>
          <br></br>

          <h5 style={{ fontWeight: 'bold' }}>Joined on</h5>
          <p>{String(userDetails.user.createdAt).substr(0, 10)}</p>
          <br></br>

          <Link to={routePaths.edit_details} style={{ color: 'black', textDecoration: 'none' }}>
            <div className='text-center mb-3'>
              <Button variant='light'>Edit Account Details</Button>
            </div>
          </Link>

          <Link to = {routePaths.password_update} style = {{color : 'black', textDecoration : 'none'}}>
          <div className = 'text-center mb-5'>
          <Button variant = 'dark'>Change Password</Button>
          </div>
          </Link>
        </div>
      </AccountLayout>
    </div>
  )
}

export default AccountDetails