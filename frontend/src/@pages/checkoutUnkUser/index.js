import { Step, StepLabel, Stepper } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Information from './information';
import Payment from './payment';
import Shipping from './shipping';
import Confirmation from './confirmation'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaidIcon from '@mui/icons-material/Paid';
import { ShoppingCartOutlined } from '@material-ui/icons';
import './index.css'
import { routePaths } from '../../@services/constants';
import aloevera_soap from '../../@assets/images/Aloevera_Soap.jpeg'
import { useDispatch } from 'react-redux';


const CheckoutUnk = ({getCartItemsUnknownUser, getCartItemsUnknownUserError, getCartItemsUnknownUserSuccess }) => {
    const [norCartItems, setNoCartItems] = useState(undefined)
    const navigate = useNavigate()
  const values = {
    firstName: '',
  lastName: '',
  country : '',
  province : '',
  email: '',
  city: '',
  address: '',
  postalCode: '',
  phoneNo: ''
  }

  window.onpopstate = function (e) {
    if(e) {
        window.location.reload(false).scrollTo(0, 0)
    }
  }
    const steps = ['Inforamtion', 'Shipping', 'Payment']
    const dispatch = useDispatch()
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [contactInfo, setContactInfo] = useState(values)
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
    // const updateTheQuantityOfProducts = () => {
    //     if (getCartItemsUnknownUserSuccess) {
    //         let i = 0;
    //     for (i = 0; i < getCartItemsUnknownUser.cart.cartItems.length; i++){
    //         dispatch(updateProductStock(getCartItemsUnknownUser.cart.cartItems[i].product, getCartItemsUnknownUser.cart.cartItems[i].quantity))
    //     }
    //     }
    // }
    
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    
    useEffect(() => {
      
        console.log('contactInfo', contactInfo)
    }, [contactInfo])

    useEffect(() => {
        if (getCartItemsUnknownUserError)
        {
            navigate(routePaths.mainCart)
        }
        if (getCartItemsUnknownUserSuccess) {
            if (getCartItemsUnknownUser.cart.cartItems.length === 0) {
                navigate(routePaths.mainCart)
            }
        }
        if (getCartItemsUnknownUserSuccess) {
            getCartItemsUnknownUser.cart.cartItems.map(item => {
                if (item.quantity > item.productStock) {
                    navigate(routePaths.mainCart)
                }
            })
        }
    }, [getCartItemsUnknownUserError, getCartItemsUnknownUserSuccess])
    const FormData = () => {
        if (activeStep === 0) {
            return <Information checkoutToken={checkoutToken}  setContactInfo = {setContactInfo} nextStep = {nextStep}/>
        }
        else if (activeStep === 1) {
            return <Shipping getCartItemsUnknownUser={getCartItemsUnknownUser} getCartItemsUnknownUserSuccess = {getCartItemsUnknownUserSuccess} contactInfo = {contactInfo} nextStep={nextStep} prevStep={backStep}/>
        }
        else if (activeStep === 2){
            return <Payment getCartItemsUnknownUser={getCartItemsUnknownUser} getCartItemsUnknownUserSuccess = {getCartItemsUnknownUserSuccess} contactInfo = {contactInfo} nextStep={nextStep} prevStep={backStep} />
        }
    }
    return (
        <>
        { getCartItemsUnknownUserSuccess &&
        <div className = 'mb-3'>
        <div className = 'order_summary_display_on_large_screens' >
        <Container>
            <Row >
                <Col lg='6' md = '6'>
                    <Card style = {{background : '#ffe6f0', marginTop : '3vw'}}>
                        <Card.Body>
                            <h4 style = {{fontWeight : 'bold'}}>Order Summary</h4>
                            <hr></hr>
                            {getCartItemsUnknownUser.cart.totalQuantity === 1 ? <p style = {{fontWeight : 'bold'}}>{getCartItemsUnknownUser.cart.totalQuantity} ITEM IN THE CART</p> : <p style = {{fontWeight : 'bold'}}>{getCartItemsUnknownUser.cart.totalQuantity} ITEMS IN THE CART</p>}
                            <hr></hr>
                            
                            {getCartItemsUnknownUser.cart.cartItems.map(item => (
                                <>
                                <Row className = 'align-items-center'>
                                    <Col>
                                    <div className='card-image-con'>
                                            <div className='product-image-wrapper'>
                                                <img class="img-fluid square-img" src={item.image} />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className = 'text-muted margin_left'>
                                    <Row>{item.name}</Row>
                                    <Row>Qty : {item.quantity}</Row>
                                    </Col>
                                    <Col md = '2' sm = '2' xs = '2'></Col>
                                    <Col md = '4' sm = '4' xs = '4'>
                                    <Row style = {{fontWeight : 'bolder', marginRight : '10px'}} className = 'justify-content-end'>Rs {item.quantity * item.price}</Row>
                                    </Col>
                                </Row>
                            <hr></hr>
                                </>
                            ))}
                            
                            <div style = {{}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <h5 style = {{flex : '1', marginLeft : '5px', fontWeight: 'bolder'}} className = 'text-muted'>Total  : </h5>
                                <h5 style = {{display : 'flex', flex : '1', justifyContent : 'right', marginRight : '5px', fontWeight: 'bolder'}}> Rs. {getCartItemsUnknownUser.cart.totalPrice}</h5>
                            </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg='6' md = '6'>
                    
                    <Row className='justify-content-center'>
                        <div className='checkout-display-on-large-screens'>
                            <Stepper activeStep={activeStep}>
                                {steps.map((step) => (
                                    <Step key={step}>
                                        <StepLabel>{step}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </div>
                        <div className='checkout-display-on-small-screens'>
                            <Stepper activeStep={activeStep}>
                                <Step>
                                    <StepLabel><PermIdentityIcon /></StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel><LocalShippingIcon /></StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel><PaidIcon /></StepLabel>
                                </Step>
                            </Stepper>

                        </div>
                        {/* Check if the checkoutToken is generated, then render the FormData, the react first renders the JSX then it goes to the useEffect to see if rereder is necessary */}
                        <FormData />
                    </Row>
                </Col>
            </Row>
        </Container>
        </div>


        <div className = 'order_summary_display_on_small_screens'>
        <div style={{ display: 'flex', alignItems: 'center', height : '60px', background : '#ffe6f0'}}>
              {msg === 'Show Order Summary' ? 
              <>
              <div onClick = {showTheOrderSummary} style={{display : 'flex', flex: '1', justifyContent: 'right', marginRight: '3px', cursor : 'pointer', color : 'blue'}}>
                <ShoppingCartOutlined />
              </div>
              <div onClick = {showTheOrderSummary} style={{ flex: '6', cursor : 'pointer', color : 'blue' }}>{msg}</div>
              <div style={{display : 'flex', flex: '2', justifyContent: 'right', marginRight : '10px', fontWeight : 'bold'}}>Rs {getCartItemsUnknownUser.cart.totalPrice}</div>
              </> : 
              <>
              <div onClick = {hideTheOrderSummary} style={{display : 'flex', flex: '1', justifyContent: 'right', marginRight: '3px', cursor : 'pointer', color : 'blue'}}>
                <ShoppingCartOutlined />
              </div>
              <div onClick = {hideTheOrderSummary} style={{ flex: '6', cursor : 'pointer', color : 'blue' }}>{msg}</div>
              <div style={{display : 'flex', flex: '2', justifyContent: 'right', marginRight : '10px', fontWeight : 'bold'}}>Rs {getCartItemsUnknownUser.cart.totalPrice}</div>
              </>}
            </div>
                    {orderSummary && 
                    <>
                    <Col lg='6' md='6' style = {{background : '#ffe6f0'}} >
                        <Container>
                            {getCartItemsUnknownUser.cart.totalQuantity === 1 ? <p style={{ fontWeight: 'bold' }}>{getCartItemsUnknownUser.cart.totalQuantity} ITEM IN THE CART</p> : <p style={{ fontWeight: 'bold' }}>{getCartItemsUnknownUser.cart.totalQuantity} ITEMS IN THE CART</p>}
                            <hr></hr>
                                {getCartItemsUnknownUser.cart.cartItems.map(item => (
                                    <>
                                        <Row className='align-items-center'>
                                            <Col>
                                            <div className='card-image-con'>
                                            <div className='product-image-wrapper'>
                                                <img class="img-fluid square-img" src={item.image} />
                                            </div>
                                        </div>
                                            </Col>
                                            <Col className='text-muted margin_left'>
                                                <Row>{item.name}</Row>
                                                <Row>Qty : {item.quantity}</Row>
                                            </Col>
                                            <Col md='2' sm='2' xs='2'></Col>
                                            <Col md='4' sm='4' xs='4'>
                                                <Row style={{ fontWeight: 'bolder', marginRight: '10px' }} className='justify-content-end'>Rs {item.quantity * item.price}</Row>
                                            </Col>
                                        </Row>
                                        <hr></hr>
                                    </>
                                ))}
                            <div style={{}}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <h5 style={{ flex: '1', marginLeft: '5px', fontWeight: 'bolder' }} className='text-muted'>Total  : </h5>
                                    <h5 style={{ display: 'flex', flex: '1', justifyContent: 'right', marginRight: '5px', fontWeight: 'bolder' }}> Rs. {getCartItemsUnknownUser.cart.totalPrice}</h5>
                                </div>
                            </div>
                        </Container>
                    </Col>
                    </>}
                    <Container>
                        <Row >
                            <Col lg='6' md='6'>

                                <Row className='justify-content-center'>
                                    <div className='checkout-display-on-large-screens'>
                                        <Stepper activeStep={activeStep}>
                                            {steps.map((step) => (
                                                <Step key={step}>
                                                    <StepLabel>{step}</StepLabel>
                                                </Step>
                                            ))}
                                        </Stepper>
                                    </div>
                                    <div className='checkout-display-on-small-screens'>
                                        <Stepper activeStep={activeStep}>
                                            <Step>
                                                <StepLabel><PermIdentityIcon /></StepLabel>
                                            </Step>
                                            <Step>
                                                <StepLabel><LocalShippingIcon /></StepLabel>
                                            </Step>
                                            <Step>
                                                <StepLabel><PaidIcon /></StepLabel>
                                            </Step>
                                        </Stepper>

                                    </div>
                                    {/* Check if the checkoutToken is generated, then render the FormData, the react first renders the JSX then it goes to the useEffect to see if rereder is necessary */}
                                    <FormData />
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                    </div>
        </div>

                                }
                                </>
    )
};

export default CheckoutUnk;