import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/fontawesome-free-solid'
import { Link, useNavigate } from 'react-router-dom'
import Cart from './Cart';
import { Card, Row, Col, Button } from 'react-bootstrap';
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { unknownUserGetCart } from '../../@actions/unknownUserCartActions/getCartItems';
import { unknownUserIncrementQty } from '../../@actions/unknownUserCartActions/incrementQty';
import { unknownUserDecrementQty } from '../../@actions/unknownUserCartActions/decrementQty';
import { unknownUserRemoveFromCart } from '../../@actions/unknownUserCartActions/removeFromCart';
import { unknownUserChangeQty } from '../../@actions/unknownUserCartActions/changeQty';
import { routePaths } from '../../@services/constants';
import Loader from '../loader';

const CartContainer2 = ({ onCloseCart, msg }) => {
    const dispatch = useDispatch()
    // const [msg, setMsg] = useState('The Following item has been added to your cart')
    const {getCartItemsUnknownUser, loading, getCartItemsUnknownUserError} = useSelector(state => state.getCartItemsUnknownUser)
    const {loadingRemoveFromCart, removeFromCartUnknownUser} = useSelector(state => state.removeFromCartUnknownUser)
   console.log('cart items : ', getCartItemsUnknownUser)

    useEffect(() => {
        dispatch(unknownUserGetCart())
    }, [])

    const [showUpdateCartButton, setShowUpdateCartButton] = useState(false)
    const increment = (product) => {
        dispatch(unknownUserIncrementQty({product}))
        setShowUpdateCartButton(true)
    }
    const decrement = (product) => {
        dispatch(unknownUserDecrementQty({product}))
        setShowUpdateCartButton(true)
    }
    const changeOty = (product, quantity) => {
        dispatch(unknownUserChangeQty({product, quantity}))
        setShowUpdateCartButton(true)
    }
    const removeFromCart = async (product) => {
       await dispatch(unknownUserRemoveFromCart({product}))
        dispatch(unknownUserGetCart())
    }
    const updateCart = () => {
        dispatch(unknownUserGetCart())
        setShowUpdateCartButton(false)
    }
    
    const updatedCart = () => {
        dispatch(unknownUserGetCart())
        setShowUpdateCartButton(false)
        getCartItemsUnknownUser.cart.cartItems.map(item => {
            if (item.quantity > item.productStock) {
                return alert(`The quantity of ${item.name} is greater than this item's stock, so order cannot be placed! Please reduce the quantity first to place the order.`)
            }
        })
    }
    // useEffect(() => {
    //     if (getCartItemsUnknownUser.cart.cartItems.length > 0) {
    //         setMsg('Item has been successfully added to your cart.')
    //     }
    //     else {
    //         setMsg('Your cart is empty now')
    //     }
    // }, [getCartItemsUnknownUser.cart.cartItems])
    const navigate = useNavigate()
    // const listItems = getCartItemsUnknownUser.cart.cartItems.map(item => {
    //     return <Cart key={item.id} item={item} handleUpdateCartQty={handleUpdateCartQty} removeItemFromCart={removeItemFromCart}></Cart>
    // })
   // console.log(cart.line_items)
   
    return (
       <>
       {loading === false && 
        <Row className='justify-content-center align-items-center' style={{
            position: 'fixed',
            top: '0px',
            bottom: '0px',
            left: '0px',
            right: '0px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex : '2'
        }} onClick={onCloseCart}>
            <Col lg='11' md='11' sm='11' xs='12'
                style={{
                    position: 'relative',
                    overflowY: 'scroll'
                }}>
                <Card>
                    <Card.Body onClick={e => {
                        // do not close modal if anything inside modal content is clicked
                        e.stopPropagation();
                    }} className='cart'>
                        {getCartItemsUnknownUserError ? <div>
                            <p className='mt-2 responsive-content-cart text-center text-danger'>{getCartItemsUnknownUserError}, you can try adding more items to your cart!
                            <span><FontAwesomeIcon onClick={onCloseCart} style={{
                                position: 'absolute',
                                top: '0px',
                                bottom: '0px',
                                right: '0px'
                            }} icon={faTimesCircle} /></span>
                        </p>
                        </div> : 
                        
                        <>
                        {getCartItemsUnknownUser.cart.cartItems.length === 0 ? <div>
                            <p className='mt-2 responsive-content-cart text-center'>{getCartItemsUnknownUser.message}
                            <span><FontAwesomeIcon onClick={onCloseCart} style={{
                                position: 'absolute',
                                top: '0px',
                                bottom: '0px',
                                right: '0px'
                            }} icon={faTimesCircle} /></span>
                        </p>
                        </div>  : 
                        <div>
                        <p className='mt-2 responsive-content-cart text-center'>{msg}
                        <span><FontAwesomeIcon onClick={onCloseCart} style={{
                            position: 'absolute',
                            top: '0px',
                            bottom: '0px',
                            right: '0px'
                        }} icon={faTimesCircle} /></span>
                    </p>
                    <div className='cart-display-on-small-screens'>
                        <h5 style={{ width: '100%', height: '35px', background: '#F2F3F3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>YOUR ORDER</h5>
                    </div>
                    <div className='mb-3'></div>
                    <Row>
                        <div style={{
                            overflowY: 'scroll',
                            height: '50vh'
                        }} className='col-lg-8 col-md-7'>
                            <div className='cart-display-on-large-screens'>
                                <h5 style={{ width: '100%', height: '35px', background: '#F2F3F3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>YOUR ORDER</h5>
                            </div>
                            {getCartItemsUnknownUser.cart.cartItems.map(item => 
                                <Cart item = {item} increment = {increment} decrement={decrement} removeFromCart = {removeFromCart} changeOty = {changeOty}/>)}
                        </div>

                        <Col lg='4' md='5'>
                            <h5 style={{ width: '100%', height: '35px', background: '#F2F3F3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>QUICK CART</h5>

                            <Row>
                                <Col>
                                    <p className='responsive-content-cart-button margin_left'>Total: </p>
                                </Col>
                                <Col>
                                    <p className='text-end responsive-content-cart-button margin_right'>Rs {getCartItemsUnknownUser.cart.totalPrice}</p>
                                </Col>
                            </Row>
                            <div className='mb-2 d-grid gap-2'>
                                {showUpdateCartButton && <Button onClick = {updateCart} size='lg'className='updated-cart responsive-content-cart-button'>Update The Cart</Button>}
                                <Button as = {Link} to = {routePaths.mainCart} size='lg' className='cart-btn responsive-content-cart-button'>View The Cart</Button>
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
            </Col>
        </Row>}
       </>
    )
}

export default CartContainer2;