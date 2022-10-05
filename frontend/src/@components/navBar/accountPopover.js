import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { routePaths } from '../../@services/constants'
import { useDispatch, useSelector } from 'react-redux'
import { logoutuser } from '../../@actions/userActions/logout'
const AccountPopover = ({userDetails}) => {
  const dispatch = useDispatch()
  const {logoutUser, loading, isAuthenticated, error} = useSelector(state => state.logoutUser)
  const [userInfo, setUserInfo] = useState(undefined)
  useEffect(() => {
    setUserInfo(userDetails)
    // setNoUserDetails(false)
    // console.log('user details', userInfo.user)
  }, [userDetails])

  // if (userInfo) {
  //   console.log('user details', userInfo.user.name)

  // }

  const logoutTheUser = () => {
    dispatch(logoutuser())
    console.log('message is', logoutUser)
    window.location.reload(false).scrollTo(0, 0)
  }

  return (
    <>
      {userInfo ?
        <div className='popover_content'>
         <Link style = {{color : 'black', textDecoration : 'none'}} to = {routePaths.my_account}>
         <div  style={{ marginBottom: '1vh', cursor : 'pointer' }}>Hi {userInfo.user.firstName}</div>
         </Link>
          <div onClick = {logoutTheUser} style = {{cursor : 'pointer'}}>Logout</div>
        </div> :
        <div className='popover_content'>
         <Link style = {{color : 'black', textDecoration : 'none'}} to = {routePaths.signup}>
          <div style={{ marginBottom: '1vh', cursor : 'pointer' }}>Create an account</div>
          </Link>
         <Link style = {{color : 'black', textDecoration : 'none'}} to = {routePaths.login}>
          <div style = {{cursor : 'pointer'}}>Sign in</div>
          </Link>
        </div>}
    </>
  )
}

export default AccountPopover