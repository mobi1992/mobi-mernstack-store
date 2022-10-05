import React, { useEffect, useState} from 'react'
import { Card, Container, Col, Row, Form, Button, Modal, InputGroup } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { adminUpdateUserRole } from '../../@actions/userActions/adminUpdateUserRole'

const UserRoleInput = ({id}) => {
    const {userRole, userRoleError, userRoleSuccess} = useSelector(state => state.userRole)
    const dispatch = useDispatch()
    const [role, setRole] = useState('')
    
     const updateOS = () => {
        dispatch(adminUpdateUserRole(id, role))
     } 
     
     const handleChange = (e) => {
        setRole(e.target.value)
     }
     useEffect(() => {
        if(userRoleSuccess) {
        window.location.reload(false).scrollTo(0, 0)
        }
     }, [userRoleSuccess])
  return (
    <div>
        
                         {userRoleError ? <div style = {{color : 'red'}}>{userRoleError}</div> : 
                          <Form.Group>
                          <InputGroup>
                          <Form.Control type='text' value={role} onChange={handleChange} />
                          <InputGroup.Text>
                          <span onClick = {updateOS}><i class="fas fa-paper-plane"></i></span>
                          </InputGroup.Text>
                          </InputGroup>
                        </Form.Group>}
                        
                     
    </div>
  )
}

export default UserRoleInput