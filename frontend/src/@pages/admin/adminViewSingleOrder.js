import { Badge } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { Container, Button, Card, Col, Row } from 'react-bootstrap'
import Loader from '../../@components/loader'
import { Link } from 'react-router-dom'
import { routePaths } from '../../@services/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ShoppingCartOutlined } from '@material-ui/icons'
import './index.css'
import { getloggedinUserSingleOrder } from '../../@actions/orderActions/getLoggedinUserSingleOrder'
import { adminGetSingleOrder } from '../../@actions/orderActions/adminGetSingleOrder'
import SideBar from '../../@components/sideBar'

const AdminViewSingleOrder = () => {
    window.onpopstate = function (event) {
        if (event) {
          window.location.reload(false).scrollTo(0, 0)
        }
      }
    
      const { id } = useParams()
      const dispatch = useDispatch()
      const [orderSummary, setOrderSummary] = useState(false)
      const [msg, setMsg] = useState('Show Order Summary')
      const showTheOrderSummary = () => {
        setOrderSummary(true)
        setMsg('Hide Order Summary')
      }
      const hideTheOrderSummary = () => {
        setOrderSummary(false)
        setMsg('Show Order Summary')
      }
      useEffect(() => {
        dispatch(adminGetSingleOrder(id))
      }, [dispatch])
  

      const {singleOrderAdmin, singleOrderAdminSuccess, singleOrderAdminError, singleOrderAdminLoading} = useSelector(state => state.singleOrderAdmin)
      if (singleOrderAdminSuccess) {
        return (
          <SideBar>
            <>
              <div className='order_display_on_large_screens mt-3'>
                <Row >
                  <Col lg='6' md='6'>
                    <Container>
                      <div>Order {singleOrderAdmin.order.orderNo}</div>
                      <h1 style={{ fontWeight: 'bolder' }}>Thank you {singleOrderAdmin.order.shippingInfo.firstName}!</h1>
                      <Card>
                        <Card.Body>
                          <div style={{ fontWeight: 'bold' }}>Your order is confirmed</div>
                          <div>We’ve accepted your order, and we’re getting it ready. You can come back to this page for updates on your shipment status.</div>
                          <hr></hr>
                          <div style={{ fontWeight: 'bold' }}>Note</div>
                          <div>An email has been sent to your email id as well. </div>
                          <hr></hr>
                          <div style={{ fontWeight: 'bold' }}>Order Status</div>
                          <div>{singleOrderAdmin.order.orderStatus} </div>
                        </Card.Body>
                      </Card>
                      <br></br>
    
                      <Card>
                        <Card.Body>
                          <div style={{ fontWeight: 'bold' }}>Order Updates</div>
                          <div>You’ll get shipping and delivery updates by email.</div>
                        </Card.Body>
                      </Card>
                      <br></br>
    
                      <Card>
                        <Card.Body>
                          <div style={{ fontWeight: 'bold' }}>Customer Information</div>
                          <div style={{ marginBottom: '10px' }} className='text-center'>Kindly note that your order will be delivered within 3-5 working days, but the delivery time may be longer in case of public holidays, protests or strikes.</div>
                          <div style={{ display: 'flex', fontWeight: 'bold' }}>
                            <div style={{ flex: '1' }}>Contact Information</div>
                            <div style={{ flex: '1' }}>Payment Method</div>
                          </div>
                          <div style={{ display: 'flex', marginBottom: '10px' }}>
                            <div style={{ flex: '1' }}>{singleOrderAdmin.order.shippingInfo.email}</div>
                            <div style={{ flex: '1' }}>Cash On Delivery ({singleOrderAdmin.order.paymentInfo}) - Rs. {singleOrderAdmin.order.totalPrice}</div>
                          </div>
                          <div style={{ display: 'flex', fontWeight: 'bold' }}>
                            <div style={{ flex: '1' }}>Shipping Address</div>
                            <div style={{ flex: '1' }}>Billing Address</div>
                          </div>
                          <div style={{ display: 'flex', marginBottom: '10px' }}>
                            <div style={{ flex: '1' }}>{singleOrderAdmin.order.shippingInfo.address} {singleOrderAdmin.order.shippingInfo.city} {singleOrderAdmin.order.shippingInfo.postalCode}, {singleOrderAdmin.order.shippingInfo.province}, {singleOrderAdmin.order.shippingInfo.country}, {singleOrderAdmin.order.shippingInfo.phoneNo}</div>
                            <div style={{ flex: '1' }}>{singleOrderAdmin.order.shippingInfo.address} {singleOrderAdmin.order.shippingInfo.city} {singleOrderAdmin.order.shippingInfo.postalCode}, {singleOrderAdmin.order.shippingInfo.province}, {singleOrderAdmin.order.shippingInfo.country}, {singleOrderAdmin.order.shippingInfo.phoneNo}</div>
                          </div>
    
                          <div style={{ fontWeight: 'bold' }}>Shipping Method</div>
                          {singleOrderAdmin.totalCost < 3000 ? <div>Rs {singleOrderAdmin.order.shippingPrice}</div> : <div>Free Shipping</div>}
                        </Card.Body>
                      </Card>
                      <div className='mt-5 mb-5'>
                        <Button as={Link} to={routePaths.allProducts} variant='dark'>Continue Shopping</Button>
                      </div>
                    </Container>
                  </Col>
    
                  <Col lg='6' md='6' style={{ background: '#ffe6f0', paddingTop: '30px' }}>
                    <Container>
                      <hr></hr>
                      {singleOrderAdmin.order.cart.totalQty === 1 ? <p style={{ font: '600 4vh italic' }}>{singleOrderAdmin.order.cart.totalQty} ITEM IN THE CART</p> : <p style={{ font: '600 4vh italic' }}>{singleOrderAdmin.order.cart.totalQty} ITEMS IN THE CART</p>}
                      <hr></hr>
                      {singleOrderAdmin.order.cart.orderItems.map(item => (
                        <Row className='align-items-center mb-3'>
                          <Col>
                            <div className='order_image'>
                              <Badge pill bg='secondary' className='notify-badge'>{item.quantity}</Badge>
                              <div className='card-image-con'>
                                <div className='product-image-wrapper'>
                                  <img class="img-fluid square-img" src={item.image} />
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col className='text-muted margin_left'>
                            <Row>{item.name}</Row>
                          </Col>
                          <Col md='2' sm='2' xs='2'></Col>
                          <Col md='4' sm='4' xs='4'>
                            <Row style={{ fontWeight: 'bolder', marginRight: '10px' }} className='justify-content-end'>Rs {item.quantity * item.price}</Row>
                          </Col>
                        </Row>
                      ))}
    
                      <hr></hr>
                      <div style={{ display: 'flex', marginBottom: '5px' }}>
                        <div style={{ flex: '1' }}>Subtotal</div>
                        <div style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {singleOrderAdmin.order.cart.totalCost}</div>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <div style={{ flex: '1' }}>Shipping</div>
                        <div style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {singleOrderAdmin.order.shippingPrice}</div>
                      </div>
                      <hr></hr>
    
                      <div style={{ display: 'flex', marginBottom: '5px' }}>
                        <div style={{ flex: '1' }}>Total</div>
                        <h1 style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {singleOrderAdmin.order.totalPrice}</h1>
                      </div>
                    </Container>
                  </Col>
                </Row>
              </div>
    
              <div className='order_display_on_medium_screens mt-3'>
                <Row >
                  <Col lg='6' md='6'>
                    <Container>
                      <div>Order {singleOrderAdmin.order.orderNo}</div>
                      <h1 style={{ fontWeight: 'bolder' }}>Thank you {singleOrderAdmin.order.shippingInfo.firstName}!</h1>
                      <Card>
                        <Card.Body>
                          <div style={{ fontWeight: 'bold' }}>Your order is confirmed</div>
                          <div>We’ve accepted your order, and we’re getting it ready. You can come back to this page for updates on your shipment status.</div>
                          <hr></hr>
                          <div style={{ fontWeight: 'bold' }}>Note</div>
                          <div>An email has been sent to your email id as well. </div>
                          <hr></hr>
                          <div style={{ fontWeight: 'bold' }}>Order Status</div>
                          <div>{singleOrderAdmin.order.orderStatus} </div>
                        </Card.Body>
                      </Card>
                      <br></br>
    
                      <Card>
                        <Card.Body>
                          <div style={{ fontWeight: 'bold' }}>Order Updates</div>
                          <div>You’ll get shipping and delivery updates by email.</div>
                        </Card.Body>
                      </Card>
                      <br></br>
    
                      <Card>
                        <Card.Body>
                          <div style={{ fontWeight: 'bold' }}>Customer Information</div>
                          <div>Kindly note that your order will be delivered within 3-5 working days, but the delivery time may be longer in case of public holidays, protests or strikes.</div>
                          <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Contact Information</div>
                          <div>{singleOrderAdmin.order.shippingInfo.email}</div>
                          <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Payment Method</div>
                          <div>Cash On Delivery ({singleOrderAdmin.order.paymentInfo}) - Rs. {singleOrderAdmin.order.totalPrice}</div>
    
                          <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Shipping Address</div>
                          <div>{singleOrderAdmin.order.shippingInfo.address} {singleOrderAdmin.order.shippingInfo.city} {singleOrderAdmin.order.shippingInfo.postalCode}, {singleOrderAdmin.order.shippingInfo.province}, {singleOrderAdmin.order.shippingInfo.country}, {singleOrderAdmin.order.shippingInfo.phoneNo}</div>
                          <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Billing Address</div>
                          <div>{singleOrderAdmin.order.shippingInfo.address} {singleOrderAdmin.order.shippingInfo.city} {singleOrderAdmin.order.shippingInfo.postalCode}, {singleOrderAdmin.order.shippingInfo.province}, {singleOrderAdmin.order.shippingInfo.country}, {singleOrderAdmin.order.shippingInfo.phoneNo}</div>
    
                          <div style={{ fontWeight: 'bold' }}>Shipping Method</div>
                          {singleOrderAdmin.totalCost < 3000 ? <div>Rs {singleOrderAdmin.order.shippingPrice}</div> : <div>Free Shipping</div>}
                        </Card.Body>
                      </Card>
                      <div className='mt-5 mb-5'>
                        <Button as={Link} to={routePaths.allProducts} variant='dark'>Continue Shopping</Button>
                      </div>
                    </Container>
                  </Col>
    
                  <Col lg='6' md='6' style={{ background: '#ffe6f0', paddingTop: '30px' }}>
                    <Container>
                      <hr></hr>
                      {singleOrderAdmin.order.cart.totalQty === 1 ? <p style={{ font: '600 4vh italic' }}>{singleOrderAdmin.order.cart.totalQty} ITEM IN THE CART</p> : <p style={{ font: '600 4vh italic' }}>{singleOrderAdmin.order.cart.totalQty} ITEMS IN THE CART</p>}
                      <hr></hr>
                      {singleOrderAdmin.order.cart.orderItems.map(item => (
                        <Row className='align-items-center mb-3'>
                          <Col>
                            <div className='order_image'>
                              <Badge pill bg='secondary' className='notify-badge'>{item.quantity}</Badge>
                              <div className='card-image-con'>
                                <div className='product-image-wrapper'>
                                  <img class="img-fluid square-img" src={item.image} />
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col className='text-muted margin_left'>
                            <Row>{item.name}</Row>
                          </Col>
                          <Col md='2' sm='2' xs='2'></Col>
                          <Col md='4' sm='4' xs='4'>
                            <Row style={{ fontWeight: 'bolder', marginRight: '10px' }} className='justify-content-end'>Rs {item.quantity * item.price}</Row>
                          </Col>
                        </Row>
                      ))}
    
                      <hr></hr>
                      <div style={{ display: 'flex', marginBottom: '5px' }}>
                        <div style={{ flex: '1' }}>Subtotal</div>
                        <div style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {singleOrderAdmin.order.cart.totalCost}</div>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <div style={{ flex: '1' }}>Shipping</div>
                        <div style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {singleOrderAdmin.order.shippingPrice}</div>
                      </div>
                      <hr></hr>
    
                      <div style={{ display: 'flex', marginBottom: '5px' }}>
                        <div style={{ flex: '1' }}>Total</div>
                        <h1 style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {singleOrderAdmin.order.totalPrice}</h1>
                      </div>
                    </Container>
                  </Col>
    
                </Row>
              </div>
    
              <div className='order_display_on_small_screens'>
                <div style={{ display: 'flex', alignItems: 'center', height: '60px', background: '#ffe6f0' }}>
                  {msg === 'Show Order Summary' ?
                    <>
                      <div onClick={showTheOrderSummary} style={{ display: 'flex', flex: '1', justifyContent: 'right', marginRight: '3px', cursor: 'pointer', color: 'blue' }}>
                        <ShoppingCartOutlined />
                      </div>
                      <div onClick={showTheOrderSummary} style={{ flex: '6', cursor: 'pointer', color: 'blue' }}>{msg}</div>
                      <div style={{ display: 'flex', flex: '2', justifyContent: 'right', marginRight: '10px', fontWeight: 'bold' }}>Rs {singleOrderAdmin.order.totalPrice}</div>
                    </> :
                    <>
                      <div onClick={hideTheOrderSummary} style={{ display: 'flex', flex: '1', justifyContent: 'right', marginRight: '3px', cursor: 'pointer', color: 'blue' }}>
                        <ShoppingCartOutlined />
                      </div>
                      <div onClick={hideTheOrderSummary} style={{ flex: '6', cursor: 'pointer', color: 'blue' }}>{msg}</div>
                      <div style={{ display: 'flex', flex: '2', justifyContent: 'right', marginRight: '10px', fontWeight: 'bold' }}>Rs {singleOrderAdmin.order.totalPrice}</div>
                    </>}
                </div>
                {
                  orderSummary &&
                  <div>
                    <Col lg='6' md='6' style={{ background: '#ffe6f0', paddingTop: '30px' }}>
                      <Container>
                        <hr></hr>
                        {singleOrderAdmin.order.cart.totalQty === 1 ? <p style={{ font: '600 4vh italic' }}>{singleOrderAdmin.order.cart.totalQty} ITEM IN THE CART</p> : <p style={{ font: '600 4vh italic' }}>{singleOrderAdmin.order.cart.totalQty} ITEMS IN THE CART</p>}
                        <hr></hr>
                        {singleOrderAdmin.order.cart.orderItems.map(item => (
                          <Row className='align-items-center mb-3'>
                            <Col>
                              <div className='order_image'>
                                <Badge pill bg='secondary' className='notify-badge'>{item.quantity}</Badge>
                                <div className='card-image-con'>
                                  <div className='product-image-wrapper'>
                                    <img class="img-fluid square-img" src={item.image} />
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col className='text-muted margin_left'>
                              <Row>{item.name}</Row>
                            </Col>
                            <Col md='2' sm='2' xs='2'></Col>
                            <Col md='4' sm='4' xs='4'>
                              <Row style={{ fontWeight: 'bolder', marginRight: '10px' }} className='justify-content-end'>Rs {item.quantity * item.price}</Row>
                            </Col>
                          </Row>
                        ))}
    
                        <hr></hr>
                        <div style={{ display: 'flex', marginBottom: '5px' }}>
                          <div style={{ flex: '1' }}>Subtotal</div>
                          <div style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {singleOrderAdmin.order.cart.totalCost}</div>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <div style={{ flex: '1' }}>Shipping</div>
                          <div style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {singleOrderAdmin.order.shippingPrice}</div>
                        </div>
                        <hr></hr>
    
                        <div style={{ display: 'flex', marginBottom: '5px' }}>
                          <div style={{ flex: '1' }}>Total</div>
                          <h1 style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {singleOrderAdmin.order.totalPrice}</h1>
                        </div>
                      </Container>
                    </Col>
                  </div>
                }
    
                <Col lg='6' md='6' className='mt-3'>
                  <Container>
                    <div>Order {singleOrderAdmin.order.orderNo}</div>
                    <h1 style={{ fontWeight: 'bolder' }}>Thank you {singleOrderAdmin.order.shippingInfo.firstName}!</h1>
                    <Card>
                      <Card.Body>
                        <div style={{ fontWeight: 'bold' }}>Your order is confirmed</div>
                        <div>We’ve accepted your order, and we’re getting it ready. You can come back to this page for updates on your shipment status.</div>
                        <hr></hr>
                        <div style={{ fontWeight: 'bold' }}>Note</div>
                        <div>An email has been sent to your email id as well. </div>
                        <hr></hr>
                        <div style={{ fontWeight: 'bold' }}>Order Status</div>
                          <div>{singleOrderAdmin.order.orderStatus} </div>
                      </Card.Body>
                    </Card>
                    <br></br>
    
                    <Card>
                      <Card.Body>
                        <div style={{ fontWeight: 'bold' }}>Order Updates</div>
                        <div>You’ll get shipping and delivery updates by email.</div>
                      </Card.Body>
                    </Card>
                    <br></br>
    
                    <Card>
                      <Card.Body>
                        <div style={{ fontWeight: 'bold' }}>Customer Information</div>
                        <div>Kindly note that your order will be delivered within 3-5 working days, but the delivery time may be longer in case of public holidays, protests or strikes.</div>
                        <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Contact Information</div>
                        <div>{singleOrderAdmin.order.shippingInfo.email}</div>
                        <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Payment Method</div>
                        <div>Cash On Delivery ({singleOrderAdmin.order.paymentInfo}) - Rs. {singleOrderAdmin.order.totalPrice}</div>
    
                        <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Shipping Address</div>
                        <div>{singleOrderAdmin.order.shippingInfo.address} {singleOrderAdmin.order.shippingInfo.city} {singleOrderAdmin.order.shippingInfo.postalCode}, {singleOrderAdmin.order.shippingInfo.province}, {singleOrderAdmin.order.shippingInfo.country}, {singleOrderAdmin.order.shippingInfo.phoneNo}</div>
                        <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Billing Address</div>
                        <div>{singleOrderAdmin.order.shippingInfo.address} {singleOrderAdmin.order.shippingInfo.city} {singleOrderAdmin.order.shippingInfo.postalCode}, {singleOrderAdmin.order.shippingInfo.province}, {singleOrderAdmin.order.shippingInfo.country}, {singleOrderAdmin.order.shippingInfo.phoneNo}</div>
    
                        <div style={{ fontWeight: 'bold' }}>Shipping Method</div>
                        {singleOrderAdmin.totalCost < 3000 ? <div>Rs {singleOrderAdmin.order.shippingPrice}</div> : <div>Free Shipping</div>}
                      </Card.Body>
                    </Card>
                    <div className='mt-5 mb-5'>
                      <Button as={Link} to={routePaths.allProducts} variant='dark'>Continue Shopping</Button>
                    </div>
                  </Container>
                </Col>
              </div>
            </>
          </SideBar>
        )
      }
    
    
    
    
      else if (singleOrderAdminError) {
        return (
          <SideBar>
            <Container className='mt-5'>
            <div className='mb-3'>The page you requested does not exist</div>
            <Button as={Link} to={'/'} variant='dark'>Return to Home</Button>
          </Container>
          </SideBar>
        )
      }
    
      else {
        return (
          <Loader />
        )
      }
    }
    

export default AdminViewSingleOrder