import React, { useEffect, useState} from 'react'
import { Card, Container, Col, Row, Form, Button, Modal, InputGroup } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateOrderStatus } from '../../@actions/orderActions/updateOrderStatus'

const OrderStatusInput = ({adminAllOrders, id}) => {
    const {orderStatus, orderStatusError, orderStatusSuccess} = useSelector(state => state.orderStatus)
    const dispatch = useDispatch()
    const [status, setStatus] = useState('')
    
     const updateOS = () => {
        dispatch(updateOrderStatus(id, status))
     } 
     
     const handleChange = (e) => {
        setStatus(e.target.value)
     }
     useEffect(() => {
        if(orderStatusSuccess) {
        window.location.reload(false).scrollTo(0, 0)
        }
     }, [orderStatusSuccess])
  return (
    <div>
        
                         {orderStatusError ? <div style = {{color : 'red'}}>{orderStatusError}</div> : 
                          <Form.Group>
                          <InputGroup>
                          <Form.Control type='text' value={status} onChange={handleChange} />
                          <InputGroup.Text>
                          <span onClick = {updateOS}><i class="fas fa-paper-plane"></i></span>
                          </InputGroup.Text>
                          </InputGroup>
                        </Form.Group>}
                        
                     
    </div>
  )
}

export default OrderStatusInput