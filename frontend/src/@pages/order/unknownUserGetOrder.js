import { Badge } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { ShoppingCartOutlined } from '@material-ui/icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Container, Form, Button, Card, Col, Row } from 'react-bootstrap'
import Loader from '../../@components/loader'
import { Link } from 'react-router-dom'
import { routePaths } from '../../@services/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './index.css'
import { getUnknownUserOrderWithOrderNo } from '../../@actions/orderActions/getUnknownUserOrderWithOrderNo'

const initialValues = {
  email: '',
  orderNo: ''
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid Email Format').required('This Field is Required'),
  orderNo: Yup.string().required('This field is required')
})
const UnknownUserGetOrder = () => {
  const [showCon, setShowCont] = useState(true)
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
  const dispatch = useDispatch()
  const { id } = useParams()
  const { getOrderUnkWithOrderNo, getOrderUnkWithOrderNoSuccess, getOrderUnkWithOrderNoLoading, getOrderUnkWithOrderNoError } = useSelector(state => state.getOrderUnkWithOrderNo)

  const submit = ({ email, orderNo }) => {
    dispatch(getUnknownUserOrderWithOrderNo({ orderNo, email, id }))
    setShowCont(false)
  }
  return (
    <>
      {showCon ?
        <Container>
          <Row className='mt-5 justify-content-center'>
            <Col lg='6' md='6'>
              <Card>
                <Card.Body>
                  <h3 style={{ fontWeight: 'bold' }}>Enter your email id and order no for viewing updates on your order.</h3>
                  <Formik initialValues={initialValues}
                    onSubmit={submit}
                    validationSchema={validationSchema}>
                    {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group>
                          <label htmlFor='email'>Email Address</label>
                          <Form.Control type='text' id='email' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                        </Form.Group>
                        {(errors.email && touched.email) && <div> <div className='text-danger text-center'>{errors.email}</div> <br></br></div>}

                        <Form.Group>
                          <label htmlFor='email'>Order No</label>
                          <Form.Control type='text' id='orderNo' name='orderNo' value={values.orderNo} onChange={handleChange} onBlur={handleBlur} />
                        </Form.Group>
                        {(errors.orderNo && touched.orderNo) && <div> <div className='text-danger text-center'>{errors.orderNo}</div> <br></br></div>}

                        <Row className='mt-4 row justify-content-center align-items-center'>
                          <Col></Col>
                          <Col>
                            <Row className='justify-content-center'>
                              <Button className='btn btn-dark' type='submit'>Submit</Button>
                            </Row>
                          </Col>
                          <Col></Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container> :
        getOrderUnkWithOrderNoSuccess ?
          <>
            <div className='order_display_on_large_screens'>
              <Row >
                <Col lg='6' md='6'>
                  <Container>
                    <div>Order {getOrderUnkWithOrderNo.order.orderNo}</div>
                    <h1 style={{ fontWeight: 'bolder' }}>Thank you {getOrderUnkWithOrderNo.order.shippingInfo.firstName}!</h1>
                    <Card>
                      <Card.Body>
                        <div style={{ fontWeight: 'bold' }}>Your order is confirmed</div>
                        <div>We’ve accepted your order, and we’re getting it ready. You can come back to this page for updates on your shipment status.</div>
                        <hr></hr>
                        <div style={{ fontWeight: 'bold' }}>Note</div>
                        <div>An email has been sent to your email id as well. </div>
                        <hr></hr>
                      <div style={{ fontWeight: 'bold' }}>Order Status</div>
                      <div>{getOrderUnkWithOrderNo.order.orderStatus} </div>
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
                          <div style={{ flex: '1' }}>{getOrderUnkWithOrderNo.order.shippingInfo.email}</div>
                          <div style={{ flex: '1' }}>Cash On Delivery ({getOrderUnkWithOrderNo.order.paymentInfo}) - Rs. {getOrderUnkWithOrderNo.order.totalPrice}</div>
                        </div>
                        <div style={{ display: 'flex', fontWeight: 'bold' }}>
                          <div style={{ flex: '1' }}>Shipping Address</div>
                          <div style={{ flex: '1' }}>Billing Address</div>
                        </div>
                        <div style={{ display: 'flex', marginBottom: '10px' }}>
                          <div style={{ flex: '1' }}>{getOrderUnkWithOrderNo.order.shippingInfo.address} {getOrderUnkWithOrderNo.order.shippingInfo.city} {getOrderUnkWithOrderNo.order.shippingInfo.postalCode}, {getOrderUnkWithOrderNo.order.shippingInfo.province}, {getOrderUnkWithOrderNo.order.shippingInfo.country}, {getOrderUnkWithOrderNo.order.shippingInfo.phoneNo}</div>
                          <div style={{ flex: '1' }}>{getOrderUnkWithOrderNo.order.shippingInfo.address} {getOrderUnkWithOrderNo.order.shippingInfo.city} {getOrderUnkWithOrderNo.order.shippingInfo.postalCode}, {getOrderUnkWithOrderNo.order.shippingInfo.province}, {getOrderUnkWithOrderNo.order.shippingInfo.country}, {getOrderUnkWithOrderNo.order.shippingInfo.phoneNo}</div>
                        </div>

                        <div style={{ fontWeight: 'bold' }}>Shipping Method</div>
                        {getOrderUnkWithOrderNo.totalCost < 3000 ? <div>Rs {getOrderUnkWithOrderNo.order.shippingPrice}</div> : <div>Free Shipping</div>}
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
                    {getOrderUnkWithOrderNo.order.cart.totalQty === 1 ? <p style={{ font: '600 4vh italic' }}>{getOrderUnkWithOrderNo.order.cart.totalQty} ITEM IN THE CART</p> : <p style={{ font: '600 4vh italic' }}>{getOrderUnkWithOrderNo.order.cart.totalQty} ITEMS IN THE CART</p>}
                    <hr></hr>
                    {getOrderUnkWithOrderNo.order.cart.orderItems.map(item => (
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
                      <div style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {getOrderUnkWithOrderNo.order.cart.totalCost}</div>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div style={{ flex: '1' }}>Shipping</div>
                      <div style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {getOrderUnkWithOrderNo.order.shippingPrice}</div>
                    </div>
                    <hr></hr>

                    <div style={{ display: 'flex', marginBottom: '5px' }}>
                      <div style={{ flex: '1' }}>Total</div>
                      <h1 style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {getOrderUnkWithOrderNo.order.totalPrice}</h1>
                    </div>
                  </Container>
                </Col>
              </Row>
            </div>

            <div className='order_display_on_medium_screens'>
              <Row >
                <Col lg='6' md='6'>
                  <Container>
                    <div>Order {getOrderUnkWithOrderNo.order.orderNo}</div>
                    <h1 style={{ fontWeight: 'bolder' }}>Thank you {getOrderUnkWithOrderNo.order.shippingInfo.firstName}!</h1>
                    <Card>
                      <Card.Body>
                        <div style={{ fontWeight: 'bold' }}>Your order is confirmed</div>
                        <div>We’ve accepted your order, and we’re getting it ready. You can come back to this page for updates on your shipment status.</div>
                        <hr></hr>
                        <div style={{ fontWeight: 'bold' }}>Note</div>
                        <div>An email has been sent to your email id as well. </div>
                        <hr></hr>
                      <div style={{ fontWeight: 'bold' }}>Order Status</div>
                      <div>{getOrderUnkWithOrderNo.order.orderStatus} </div>
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
                        <div>{getOrderUnkWithOrderNo.order.shippingInfo.email}</div>
                        <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Payment Method</div>
                        <div>Cash On Delivery ({getOrderUnkWithOrderNo.order.paymentInfo}) - Rs. {getOrderUnkWithOrderNo.order.totalPrice}</div>

                        <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Shipping Address</div>
                        <div>{getOrderUnkWithOrderNo.order.shippingInfo.address} {getOrderUnkWithOrderNo.order.shippingInfo.city} {getOrderUnkWithOrderNo.order.shippingInfo.postalCode}, {getOrderUnkWithOrderNo.order.shippingInfo.province}, {getOrderUnkWithOrderNo.order.shippingInfo.country}, {getOrderUnkWithOrderNo.order.shippingInfo.phoneNo}</div>
                        <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Billing Address</div>
                        <div>{getOrderUnkWithOrderNo.order.shippingInfo.address} {getOrderUnkWithOrderNo.order.shippingInfo.city} {getOrderUnkWithOrderNo.order.shippingInfo.postalCode}, {getOrderUnkWithOrderNo.order.shippingInfo.province}, {getOrderUnkWithOrderNo.order.shippingInfo.country}, {getOrderUnkWithOrderNo.order.shippingInfo.phoneNo}</div>

                        <div style={{ fontWeight: 'bold' }}>Shipping Method</div>
                        {getOrderUnkWithOrderNo.totalCost < 3000 ? <div>Rs {getOrderUnkWithOrderNo.order.shippingPrice}</div> : <div>Free Shipping</div>}
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
                    {getOrderUnkWithOrderNo.order.cart.totalQty === 1 ? <p style={{ font: '600 4vh italic' }}>{getOrderUnkWithOrderNo.order.cart.totalQty} ITEM IN THE CART</p> : <p style={{ font: '600 4vh italic' }}>{getOrderUnkWithOrderNo.order.cart.totalQty} ITEMS IN THE CART</p>}
                    <hr></hr>
                    {getOrderUnkWithOrderNo.order.cart.orderItems.map(item => (
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
                      <div style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {getOrderUnkWithOrderNo.order.cart.totalCost}</div>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div style={{ flex: '1' }}>Shipping</div>
                      <div style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {getOrderUnkWithOrderNo.order.shippingPrice}</div>
                    </div>
                    <hr></hr>

                    <div style={{ display: 'flex', marginBottom: '5px' }}>
                      <div style={{ flex: '1' }}>Total</div>
                      <h1 style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {getOrderUnkWithOrderNo.order.totalPrice}</h1>
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
                    <div style={{ display: 'flex', flex: '2', justifyContent: 'right', marginRight: '10px', fontWeight: 'bold' }}>Rs {getOrderUnkWithOrderNo.order.totalPrice}</div>
                  </> :
                  <>
                    <div onClick={hideTheOrderSummary} style={{ display: 'flex', flex: '1', justifyContent: 'right', marginRight: '3px', cursor: 'pointer', color: 'blue' }}>
                      <ShoppingCartOutlined />
                    </div>
                    <div onClick={hideTheOrderSummary} style={{ flex: '6', cursor: 'pointer', color: 'blue' }}>{msg}</div>
                    <div style={{ display: 'flex', flex: '2', justifyContent: 'right', marginRight: '10px', fontWeight: 'bold' }}>Rs {getOrderUnkWithOrderNo.order.totalPrice}</div>
                  </>}
              </div>
              {
                orderSummary &&
                <div>
                  <Col lg='6' md='6' style={{ background: '#ffe6f0', paddingTop: '30px' }}>
                    <Container>
                      <hr></hr>
                      {getOrderUnkWithOrderNo.order.cart.totalQty === 1 ? <p style={{ font: '600 4vh italic' }}>{getOrderUnkWithOrderNo.order.cart.totalQty} ITEM IN THE CART</p> : <p style={{ font: '600 4vh italic' }}>{getOrderUnkWithOrderNo.order.cart.totalQty} ITEMS IN THE CART</p>}
                      <hr></hr>
                      {getOrderUnkWithOrderNo.order.cart.orderItems.map(item => (
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
                        <div style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {getOrderUnkWithOrderNo.order.cart.totalCost}</div>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <div style={{ flex: '1' }}>Shipping</div>
                        <div style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {getOrderUnkWithOrderNo.order.shippingPrice}</div>
                      </div>
                      <hr></hr>

                      <div style={{ display: 'flex', marginBottom: '5px' }}>
                        <div style={{ flex: '1' }}>Total</div>
                        <h1 style={{ display: 'flex', flex: '1', justifyContent: 'right', fontWeight: 'bolder' }}>Rs {getOrderUnkWithOrderNo.order.totalPrice}</h1>
                      </div>
                    </Container>
                  </Col>
                </div>
              }

              <Col lg='6' md='6' className='mt-3'>
                <Container>
                  <div>Order {getOrderUnkWithOrderNo.order.orderNo}</div>
                  <h1 style={{ fontWeight: 'bolder' }}>Thank you {getOrderUnkWithOrderNo.order.shippingInfo.firstName}!</h1>
                  <Card>
                    <Card.Body>
                      <div style={{ fontWeight: 'bold' }}>Your order is confirmed</div>
                      <div>We’ve accepted your order, and we’re getting it ready. You can come back to this page for updates on your shipment status.</div>
                      <hr></hr>
                      <div style={{ fontWeight: 'bold' }}>Note</div>
                      <div>An email has been sent to your email id as well. </div>
                      <hr></hr>
                      <div style={{ fontWeight: 'bold' }}>Order Status</div>
                      <div>{getOrderUnkWithOrderNo.order.orderStatus} </div>
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
                      <div>{getOrderUnkWithOrderNo.order.shippingInfo.email}</div>
                      <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Payment Method</div>
                      <div>Cash On Delivery ({getOrderUnkWithOrderNo.order.paymentInfo}) - Rs. {getOrderUnkWithOrderNo.order.totalPrice}</div>

                      <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Shipping Address</div>
                      <div>{getOrderUnkWithOrderNo.order.shippingInfo.address} {getOrderUnkWithOrderNo.order.shippingInfo.city} {getOrderUnkWithOrderNo.order.shippingInfo.postalCode}, {getOrderUnkWithOrderNo.order.shippingInfo.province}, {getOrderUnkWithOrderNo.order.shippingInfo.country}, {getOrderUnkWithOrderNo.order.shippingInfo.phoneNo}</div>
                      <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Billing Address</div>
                      <div>{getOrderUnkWithOrderNo.order.shippingInfo.address} {getOrderUnkWithOrderNo.order.shippingInfo.city} {getOrderUnkWithOrderNo.order.shippingInfo.postalCode}, {getOrderUnkWithOrderNo.order.shippingInfo.province}, {getOrderUnkWithOrderNo.order.shippingInfo.country}, {getOrderUnkWithOrderNo.order.shippingInfo.phoneNo}</div>

                      <div style={{ fontWeight: 'bold' }}>Shipping Method</div>
                      {getOrderUnkWithOrderNo.totalCost < 3000 ? <div>Rs {getOrderUnkWithOrderNo.order.shippingPrice}</div> : <div>Free Shipping</div>}
                    </Card.Body>
                  </Card>
                  <div className='mt-5 mb-5'>
                    <Button as={Link} to={routePaths.allProducts} variant='dark'>Continue Shopping</Button>
                  </div>
                </Container>
              </Col>
            </div>
          </> : <div>
            <Container className='mt-5'>
              <div className='mb-3'>{getOrderUnkWithOrderNoError}</div>
              <Button as={Link} to={'/'} variant='dark'>Return to Home</Button>
            </Container>
          </div>
      }
    </>
  )
}

export default UnknownUserGetOrder