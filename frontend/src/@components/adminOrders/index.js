import React, { useEffect, useState } from 'react'
import SideBar from '../sideBar'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminAllOrders } from '../../@actions/orderActions/getAdminAllOrders'
import './index.css'
import Loader from '../loader'
import { Link } from 'react-router-dom'
import OrderStatusInput from './orderStatusInput'
import { Modal, Button, Container, Row } from 'react-bootstrap'
import { adminDeleleOrder } from '../../@actions/orderActions/adminDeleteOrder'

const AdminOrders = ({allOrders, adminAllOrdersLoading, adminAllOrdersSuccess}) => {
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
            {adminAllOrdersLoading ? <Loader /> : adminAllOrdersSuccess &&
         <div>
                    {allOrders.length === 0 ? 
                    <Container>
                        <Row className = 'justify-content-center mt-5'>No Orders to Show</Row>
                    </Container> :
                    <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Order No</th>
                                <th>First Name</th>
                                <th>Last Name</th>
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
                                    <td data-label = 'First Name'>{order.shippingInfo.firstName}</td>
                                    <td data-label = 'Last Name'>{order.shippingInfo.lastName}</td>
                                    <td data-label = 'Date'>{order.placedAt}</td>
                                    <td data-label = 'Status' onClick={(e) => clickOrderStatus(e, order.orderNo)} style={{ color: 'blue', cursor: 'default' }}>{input === order.orderNo ? <OrderStatusInput id={order._id} /> : <span>{order.orderStatus}</span>}</td>
                                    <td data-label = 'Total'> <span style={{ fontWeight: 'bolder' }}>Rs{order.totalPrice}</span> for <span style={{ fontWeight: 'bolder' }}>{order.cart.totalQty}</span> {order.cart.totalQty === 1 ? <span>item</span> : <span>items</span>}</td>
                                    <td data-label = 'Actions'>
                                        {deletedOrderError && deleteOr === order._id ? <div className = 'text-danger'>{deletedOrderError}</div> : 
                                        <div style={{ display: 'flex', cursor : 'default' }}>
                                        <div style={{ display: 'flex', flex: '1' }}>
                                            <Link to={`/admin/order/${order._id}`} style={{ textDecoration: 'none', paddingRight: '1vh' }}>
                                                View
                                            </Link>
                                        </div>
                                        <div onClick = {() => setShow(true)} style={{ display: 'flex', flex: '1', justifyContent: 'right', color: 'red'}}>
                                            Delete
                                        </div>
                                        <Modal show={show} onHide={() => setShow(false)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Delele Order</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Are you sure that you want to delete this order, Remember that it cannot be undone!</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => setShow(false)}>
                                                    Cancel
                                                </Button>
                                                <Button variant="danger" onClick={() => deleteTheOrder(order._id)}>
                                                    Delete
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>}

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

export default AdminOrders