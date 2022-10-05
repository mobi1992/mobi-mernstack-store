import React, { useEffect, useState } from 'react'
import SideBar from '../sideBar'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminAllOrders } from '../../@actions/orderActions/getAdminAllOrders'
import './index.css'
import Loader from '../loader'
import { Link } from 'react-router-dom'
import { Modal, Button, Container, Row } from 'react-bootstrap'
import { adminDeleleOrder } from '../../@actions/orderActions/adminDeleteOrder'

const UserOrders = ({allOrders, getOrdersLoggedinUserLoading, getOrdersLoggedinUserSuccess}) => {
    const dispatch = useDispatch()
    
    const [input, showInput] = useState('')
    const [show, setShow] = useState(false);
    const [deleteOr, setDeleteOr] = useState('')
    const clickOrderStatus = (e, orderNo) => {
        e.stopPropagation()
        showInput(orderNo)
    }

    const {deletedOrder, deletedOrderLoading, deletedOrderSuccess, deletedOrderError} = useSelector(state => state.deletedOrder)
    const deleteTheOrder = (id) => {
        setDeleteOr(id)
        dispatch(adminDeleleOrder(id))
    }

    useEffect(() => {
        if(deletedOrderSuccess) {
        window.location.reload(false).scrollTo(0, 0)
        }
    }, [deletedOrderSuccess])
    console.log('alloredrs.................................',allOrders)
  return (
    
    <div onClick={() => showInput('')}>
            {getOrdersLoggedinUserLoading ? <Loader /> : getOrdersLoggedinUserSuccess &&
         <div style = {{marginLeft : '2vw'}}>
                    {allOrders.length === 0 ? 
                    <Container>
                        <Row className = 'justify-content-center mt-5'>No Orders to Show</Row>
                    </Container> :
                    <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Order No</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allOrders.map(order => (
                                <tr>
                                    <td data-label = 'Order No'>#{order.orderNo}</td>
                                    <td data-label = 'Date'>{order.placedAt}</td>
                                    <td data-label = 'Status'>{order.orderStatus}</td>
                                    <td data-label = 'Total'> <span style={{ fontWeight: 'bolder' }}>Rs{order.totalPrice}</span> for <span style={{ fontWeight: 'bolder' }}>{order.cart.totalQty}</span> {order.cart.totalQty === 1 ? <span>item</span> : <span>items</span>}</td>
                                    <td data-label = 'Actions'>
                                            <Link to={`/order/me/${order._id}`} style={{ textDecoration: 'none', paddingRight: '1vh' }}>
                                                View
                                            </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>}
                </div>}
        </div>
  )
}

export default UserOrders