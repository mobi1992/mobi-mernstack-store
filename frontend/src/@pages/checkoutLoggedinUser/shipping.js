import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductStock } from '../../@actions/productActions/updateProductStock';

const Shipping = ({getCartItemsLoggedinUser, getCartItemsLoggedinUserSuccess, contactInfo, nextStep, prevStep}) => {
       const dispatch = useDispatch()
       const {updateProductStk, error} = useSelector(state => state.updateProductStk)
       const toNextStep = async () => {
        for (let i = 0; i < getCartItemsLoggedinUser.cart.cartItems.length; i++){
            const id = getCartItemsLoggedinUser.cart.cartItems[i].product
            const quantity = getCartItemsLoggedinUser.cart.cartItems[i].quantity
           await dispatch(updateProductStock({id, quantity}))
           console.log('quantity',quantity )
        }
        nextStep()
       }
       useEffect(() => {
        if (error) {
            return alert('Order cannot be placed, as one of the product is currently unavailable!')
        }
    }, [error])
        return (
           <>
           {getCartItemsLoggedinUserSuccess && 
            <>
            <div className='shipping-card-display-on-large-screens' style = {{marginLeft : '5vh'}}>
            <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className='shipping-display-on-large-screens'>
                            <div style = {{display : 'flex', justifyContent:'right'}}>
                                <div style = {{display : 'flex', flex : '2'}} className='text-muted'>Contact</div>
                                <div style = {{display : 'flex', flex : '8'}}>{contactInfo.email}</div>
                            </div>
                            <hr></hr>
                            <div style = {{display : 'flex', justifyContent:'right'}}>
                                <div style = {{display : 'flex', flex : '2'}} className='text-muted'>Ship To</div>
                                <div style = {{display : 'flex', flex : '8'}}>{contactInfo.address}</div>
                            </div>
                            </div>
                            <div className='shipping-display-on-small-screens'>
                                <Col style = {{marginLeft : '10px'}}>
                                <Row className='text-muted'>Contact</Row>
                                <Row>{contactInfo.email}</Row>
                                <hr></hr>
                                <Row className='text-muted'>Ship To</Row>
                                <Row>{contactInfo.address} {contactInfo.city} {contactInfo.postalCode}, {contactInfo.province}, {contactInfo.country}, {contactInfo.phoneNo}</Row>
                                </Col>
                            </div>
                        </Card.Body>
                    </Card>
                    <h3 style = {{marginTop : '30px', marginBottom : '30px', fontWeight:'bold'}}>Shipping method</h3>
                    <Card>
                        <Card.Body>
                            <div style = {{display:'flex', alignItems : 'center'}}>
                                <div style = {{flex : '1'}}>
                                <RadioButtonCheckedIcon />
                                </div>
                                <div style = {{fontWeight : 'bold', flex : '4'}}>Standard Shipping</div>
                               {getCartItemsLoggedinUser.cart.totalPrice < 3000 ? <div style = {{display : 'flex', justifyContent : 'right', flex : '4', fontWeight : 'bold'}}>Rs 150 </div> : <div style = {{display : 'flex', justifyContent : 'right', flex : '4', fontWeight : 'bold'}}>Free Shipping </div>}
                            </div>
                            <br></br>
                            <div style = {{display:'flex', alignItems : 'center', color : 'maroon'}}>
                                <div style = {{flex : '1'}}>
                                <RadioButtonCheckedIcon />
                                </div>
                                <div style = {{fontWeight : 'bold', flex : '4'}}>Total Price Including Shipping</div>
                               {getCartItemsLoggedinUser.cart.totalPrice < 3000 ? <div style = {{display : 'flex', justifyContent : 'right', flex : '4', fontWeight : 'bold'}}>Rs {getCartItemsLoggedinUser.cart.totalPrice + 150} </div> : <div style = {{display : 'flex', justifyContent : 'right', flex : '4', fontWeight : 'bold'}}>Rs {getCartItemsLoggedinUser.cart.totalPrice} </div>}
                            </div>
                        </Card.Body>
                    </Card>
                    <br></br>
                    <div style = {{display : 'flex', justifyContent:'space-between'}}>
                        <Button variant = 'light' onClick = {prevStep}>Back</Button>
                        <Button variant = 'dark' onClick = {toNextStep}>Next</Button>
                    </div>
                </Col>
            </Row>
        </Container>
            </div>


            <div className='shipping-card-display-on-small-screens'>
            <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className='shipping-display-on-large-screens'>
                            <div style = {{display : 'flex', justifyContent:'right'}}>
                                <div style = {{display : 'flex', flex : '2'}} className='text-muted'>Contact</div>
                                <div style = {{display : 'flex', flex : '8'}}>{contactInfo.email}</div>
                            </div>
                            <hr></hr>
                            <div style = {{display : 'flex', justifyContent:'right'}}>
                                <div style = {{display : 'flex', flex : '2'}} className='text-muted'>Ship To</div>
                                <div style = {{display : 'flex', flex : '8'}}>{contactInfo.address}</div>
                            </div>
                            </div>
                            <div className='shipping-display-on-small-screens'>
                                <Col style = {{marginLeft : '10px'}}>
                                <Row className='text-muted'>Contact</Row>
                                <Row>{contactInfo.email}</Row>
                                <hr></hr>
                                <Row className='text-muted'>Ship To</Row>
                                <Row>{contactInfo.address} {contactInfo.city} {contactInfo.postalCode}, {contactInfo.province}, {contactInfo.country}, {contactInfo.phoneNo}</Row>
                                </Col>
                            </div>
                        </Card.Body>
                    </Card>
                    <h3 style = {{marginTop : '30px', marginBottom : '30px', fontWeight:'bold'}}>Shipping method</h3>
                    <Card>
                        <Card.Body>
                            <div style = {{display:'flex', alignItems : 'center'}}>
                                <div style = {{flex : '1'}}>
                                <RadioButtonCheckedIcon />
                                </div>
                                <div style = {{fontWeight : 'bold', flex : '4'}}>Standard Shipping</div>
                               {getCartItemsLoggedinUser.cart.totalPrice < 3000 ? <div style = {{display : 'flex', justifyContent : 'right', flex : '4', fontWeight : 'bold'}}>Rs 150 </div> : <div style = {{display : 'flex', justifyContent : 'right', flex : '4', fontWeight : 'bold'}}>Free Shipping </div>}
                            </div>
                            <br></br>
                            <div style = {{display:'flex', alignItems : 'center', color : 'maroon'}}>
                                <div style = {{flex : '1'}}>
                                <RadioButtonCheckedIcon />
                                </div>
                                <div style = {{fontWeight : 'bold', flex : '4'}}>Total Price Including Shipping</div>
                               {getCartItemsLoggedinUser.cart.totalPrice < 3000 ? <div style = {{display : 'flex', justifyContent : 'right', flex : '4', fontWeight : 'bold'}}>Rs {getCartItemsLoggedinUser.cart.totalPrice + 150} </div> : <div style = {{display : 'flex', justifyContent : 'right', flex : '4', fontWeight : 'bold'}}>Rs {getCartItemsLoggedinUser.cart.totalPrice} </div>}
                            </div>
                        </Card.Body>
                    </Card>
                    <br></br>
                    <div style = {{display : 'flex', justifyContent:'space-between'}}>
                        <Button variant = 'light' onClick = {prevStep}>Back</Button>
                        <Button variant = 'dark' onClick = {toNextStep}>Next</Button>
                    </div>
                </Col>
            </Row>
        </Container>
            </div>
            </>
        }
           </>
        )
    // }
    // else {
    //     return <div></div>
    // }
};

export default Shipping;