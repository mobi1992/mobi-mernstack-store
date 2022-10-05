import React, { useState } from 'react'
import { Row, Col, InputGroup, Button, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { unknownUserAddToCart } from '../../@actions/unknownUserCartActions/addToCart'
import CartContainer2 from '../../@components/unknownUserCart'
const CartUnknownUser = ({ prod }) => {
    const [cartCon, showCartCon] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const { addToCartUnknownUser, addToCartUnknownUserError , addToCartUnknownUserLoading } = useSelector(state => state.addToCartUnknownUser)
    const incrementQuantity = () => {
        if(prod.stock <= quantity) {
            return alert(`You cannot add this more that ${quantity} items to your cart, as product stock is : ${prod.stock}`)
        }
        if (quantity !== '') {
            setQuantity(prevQty => prevQty + 1)
        }
    }

    const decrementQuantity = () => {
        if (quantity >= 2) {
            setQuantity(prevQty => prevQty - 1)
        }
    }

    const handleChange = (e) => {
        if( e.target.value > prod.stock) {
            return alert(`You cannot add ${e.target.value} items to your cart, as product stock is : ${prod.stock}`)
        }
        setQuantity(parseInt(e.target.value))
    }

    const onCloseCart = () => {
        showCartCon(false)
    }
    const { name, price } = prod
    const product = prod._id
    const productStock = prod.stock
    console.log('product id', product)
    const image = prod.images[0].url
    const addToCart = () => {
        if (product !== undefined) {
            dispatch(unknownUserAddToCart({ name, price, quantity, image, product, productStock }))
        }
        console.log('add to cart ', addToCartUnknownUser)
    }
    if (addToCartUnknownUserError) {
        alert('Item cannot be added to the cart')
        return (
            <>
                {addToCartUnknownUserLoading ? <div></div> : <Row style={{ marginLeft: '0.5vw' }} className='main'>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text style={{ cursor: 'default' }} onClick={decrementQuantity} id="basic-addon2">-</InputGroup.Text>
                            <FormControl className='text-center' type="number"
                                aria-label="text" aria-describedby="basic-addon2" onChange={handleChange} value={quantity}
                            />
                            <InputGroup.Text style={{ cursor: 'default' }} onClick={incrementQuantity} id="basic-addon2">+</InputGroup.Text>
                        </InputGroup>
                    </Col>
                    <Col style={{ display: 'inline' }}>
                        {/* <Link to={`/${product._id}`}> */}
                        <div onClick={() => showCartCon(true)}>
                            <Button onClick={addToCart} variant='dark' className='btn responsive-content-item btn-item'>Add To Cart</Button>
                        </div>
                        {/* </Link> */}
                    </Col>
                </Row>}
            </>
        )
    }
   else {
        return (
        <>
            {addToCartUnknownUserLoading ? <div></div> : <Row style={{ marginLeft: '0.5vw' }} className='main'>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text style={{ cursor: 'default' }} onClick={decrementQuantity} id="basic-addon2">-</InputGroup.Text>
                        <FormControl className='text-center' type="number"
                            aria-label="text" aria-describedby="basic-addon2" onChange={handleChange} value={quantity}
                        />
                        <InputGroup.Text style={{ cursor: 'default' }} onClick={incrementQuantity} id="basic-addon2">+</InputGroup.Text>
                    </InputGroup>
                </Col>
                <Col style={{ display: 'inline' }}>
                    {/* <Link to={`/${product._id}`}> */}
                    <div onClick={() => showCartCon(true)}>
                        <Button onClick={addToCart} variant='dark' className='btn responsive-content-item btn-item'>Add To Cart</Button>
                    </div>
                    {/* </Link> */}
                </Col>
                {cartCon && <CartContainer2 onCloseCart={onCloseCart} msg={addToCartUnknownUser.message} />}
            </Row>}
        </>
    )
        }
}

export default CartUnknownUser