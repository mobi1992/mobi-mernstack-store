import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/fontawesome-free-solid'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Row, Col, Button } from 'react-bootstrap';
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { loggedinUserGetCart } from '../../@actions/loggedinUserCartActions/getCartItems';
import { loggedinUserIncrementQty } from '../../@actions/loggedinUserCartActions/incrementQty';
import { loggedinUserDecrementQty } from '../../@actions/loggedinUserCartActions/decrementQty';
import { loggedinUserRemoveFromCart } from '../../@actions/loggedinUserCartActions/removeFromCart';
import { loggedinUserChangeQty } from '../../@actions/loggedinUserCartActions/changeQty';
import MainCart from './mainCart';
import { routePaths } from '../../@services/constants';

const MainCartContainer2 = ({ }) => {
    const dispatch = useDispatch()
    window.onpopstate = function (event) {
        if (event) {
            window.location.reload(false).scrollTo(0, 0)
        }
    }
    // const [msg, setMsg] = useState('The Following item has been added to your cart')
    const {getCartItemsLoggedinUser, loading, getCartItemsLoggedinUserError} = useSelector(state => state.getCartItemsLoggedinUser)
   console.log('cart items : ', getCartItemsLoggedinUser)

    useEffect(() => {
        dispatch(loggedinUserGetCart())
    }, [])

    const [showUpdateCartButton, setShowUpdateCartButton] = useState(false)
    const increment = (product) => {
        dispatch(loggedinUserIncrementQty({product}))
        setShowUpdateCartButton(true)
    }
    const decrement = (product) => {
        dispatch(loggedinUserDecrementQty({product}))
        setShowUpdateCartButton(true)
    }
    const changeOty = (product, quantity) => {
        dispatch(loggedinUserChangeQty({product, quantity}))
        setShowUpdateCartButton(true)
    }
    const removeFromCart = async (product) => {
       await dispatch(loggedinUserRemoveFromCart({product}))
        dispatch(loggedinUserGetCart())
    }
    const updateCart = () => {
        dispatch(loggedinUserGetCart())
        setShowUpdateCartButton(false)
    }
    
    const updatedCart = () => {
        dispatch(loggedinUserGetCart())
        setShowUpdateCartButton(false)
        getCartItemsLoggedinUser.cart.cartItems.map(item => {
            if (item.quantity > item.productStock) {
                return alert(`The quantity of ${item.name} is greater than this item's stock, so order cannot be placed! Please reduce the quantity first to place the order.`)
            }
        })
    }
    // useEffect(() => {
    //     if (getCartItemsloggedinUser.cart.cartItems.length > 0) {
    //         setMsg('Item has been successfully added to your cart.')
    //     }
    //     else {
    //         setMsg('Your cart is empty now')
    //     }
    // }, [getCartItemsloggedinUser.cart.cartItems])
    const navigate = useNavigate()
    // const listItems = getCartItemsloggedinUser.cart.cartItems.map(item => {
    //     return <Cart key={item.id} item={item} handleUpdateCartQty={handleUpdateCartQty} removeItemFromCart={removeItemFromCart}></Cart>
    // })
   // console.log(cart.line_items)
   
    return (
       <>
       {loading === false && 
        
                <Card>
                    <Card.Body onClick={e => {
                        // do not close modal if anything inside modal content is clicked
                        e.stopPropagation();
                    }} className='cart'>
                        {getCartItemsLoggedinUserError ? <div>
                            <p className='mt-2 responsive-content-cart text-center text-danger'>{getCartItemsLoggedinUserError}, You can try adding more items to your cart.
                        </p>
                        </div> : 
                        
                        <>
                        {getCartItemsLoggedinUser.cart.cartItems.length === 0 ? <div>
                            <p className='mt-2 responsive-content-cart text-center'>{getCartItemsLoggedinUser.message}
                            
                        </p>
                        </div>  : 
                        <div>
                        <p className='mt-2 responsive-content-cart text-muted text-center'>Item has been successfully added to the cart
                        
                    </p>
                    <div className='cart-display-on-small-screens'>
                        <h5 style={{ width: '100%', height: '35px', background: '#F2F3F3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>YOUR ORDER</h5>
                    </div>
                    <div className='mb-3'></div>
                    <Row>
                        <div className='col-lg-8 col-md-7'>
                            <div className='cart-display-on-large-screens'>
                                <h5 style={{ width: '100%', height: '35px', background: '#F2F3F3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>YOUR ORDER</h5>
                            </div>
                            {getCartItemsLoggedinUser.cart.cartItems.map(item => 
                                <MainCart item = {item} increment = {increment} decrement={decrement} removeFromCart = {removeFromCart} changeOty = {changeOty}/>)}
                        </div>

                        <Col lg='4' md='5'>
                            <h5 style={{ width: '100%', height: '35px', background: '#F2F3F3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>QUICK CART</h5>

                            <Row>
                                <Col>
                                    <p className='responsive-content-cart-button margin_left'>Total: </p>
                                </Col>
                                <Col>
                                    <p className='text-end responsive-content-cart-button margin_right'>Rs {getCartItemsLoggedinUser.cart.totalPrice}</p>
                                </Col>
                            </Row>
                            <div className='mb-2 d-grid gap-2'>
                                {showUpdateCartButton && <Button onClick = {updateCart} size='lg'className='updated-cart responsive-content-cart-button'>Update The Cart</Button>}
                                <Button as = {Link} to = {routePaths.allProducts} size='lg' className='cart-btn responsive-content-cart-button'>Continue Shopping</Button>
                                <Button as = {Link} to = {routePaths.checkout} onClick = {updatedCart} size='lg' className='cart-btn responsive-content-cart-button'>Checkout</Button>
                            </div>
                        </Col>
                    </Row>
                    </div>}
                        </>
                        }
                    </Card.Body>
                </Card>
            
        }
       </>
    )
}

export default MainCartContainer2;