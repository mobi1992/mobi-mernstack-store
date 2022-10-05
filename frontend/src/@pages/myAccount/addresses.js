import React from 'react'
import AccountLayout from '../../@components/accountLayout'
import { routePaths } from '../../@services/constants'
import { Link } from 'react-router-dom'

const Addresses = ({userDetails}) => {
  console.log(userDetails)
  return (
    <div>
      <AccountLayout>
        <div style = {{marginLeft : '1vw'}}>
          <div style = {{display : 'flex'}}>
        <h4 style = {{flex : '7', fontWeight : 'bold'}}>Address</h4>
        {userDetails.user.address && 
        <div style = {{display : 'flex', flex : '1', justifyContent : 'right', marginRight : '2vw', fontWeight : 'bold', cursor : 'default'}}> 
        <Link style = {{textDecoration : 'none'}} to = {routePaths.edit_address}>
        Edit
        </Link>
        </div>}
        </div>
        <p>{userDetails.user.address}, {userDetails.user.city} {userDetails.user.postalCode} 
        <br></br>  {userDetails.user.province}, {userDetails.user.country} <br></br>
        {userDetails.user.phoneNo}</p>
        </div>
      </AccountLayout>
    </div>
  )
}

export default Addresses