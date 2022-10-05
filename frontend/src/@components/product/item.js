import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import React, { useState, useEffect } from 'react'
import { Col, Card, Image, Badge, Button } from 'react-bootstrap'
import './index.css'
import { useNavigate, Link } from "react-router-dom";
import ReactStars from 'react-rating-stars-component'
import { useDispatch, useSelector } from 'react-redux';
import { routePaths } from '../../@services/constants';
import { loggedinUserAddToCart } from '../../@actions/loggedinUserCartActions/addToCart';
import { unknownUserAddToCart } from '../../@actions/unknownUserCartActions/addToCart';
import CartContainer from '../loggedinUserCart';
import CartContainer2 from '../unknownUserCart'
import { useAlert } from 'react-alert'
// import aloervera_soap from '../../@assets/images/Aloevera_Soap.jpeg'

const Item = ({ prod, isAuthenticated }) => {
    const dispatch = useDispatch()
    const options = {
        edit: false,
        color: "#f2f2f2",
        activeColor: "tomato",
        value: prod.ratings,
        size: window.innerWidth < 600 ? 20 : 25,
        isHalf: true
    }
    const navigate = useNavigate()
    const refresh = () => {
        navigate(`/Products/${prod._id}`)
        window.location.reload(false).scrollTo(0, 0)
    }
    // const navigate = useNavigate()
    // console.log(product)
    const name = prod.name
    const price = prod.price
    const quantity = 1
    const image = prod.images[0].url
    const product = prod._id
    const productStock = prod.stock

    const alert = useAlert()

    const addToCart = () => {
        if (isAuthenticated) {
            dispatch(loggedinUserAddToCart({ name, price, quantity, image, product, productStock }))
            // window.location.reload(false)
            alert.show('Item has been successfully added to your cart!')
        }
        else {
            dispatch(unknownUserAddToCart({ name, price, quantity, image, product, productStock }))
            // window.location.reload(false)
            alert.show('Item has been successfully added to your cart!')
        }
    }
    return (
        <>
            {prod.stock === 0 ?
                <Col style={{ marginTop: '1vh' }} lg='3' md='4' sm='6' xs='6'>
                    <Card className='border-0 mt-2 card-product'>
                        <Link onClick={refresh} style={{ textDecoration: 'none', color: 'black' }} to={`/Products/${prod._id}`}>
                            <div className='card-image-con'>
                                <div className='product-image-wrapper sold_product_image'>
                                    <Badge pill bg='secondary' className='sold_product_notify-badge'>Sold out</Badge>
                                    <Image src={prod.images[0].url} className='card-img img-responsive square-img' />
                                </div>
                            </div>
                        </Link>
                        <div style={{ background: '#4d0026', color: '#f2f2f2' }}>
                            <h6 className='text-center mt-2'>{prod.name}</h6>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}><ReactStars  {...options} /></div><span style={{ display: 'flex', justifyContent: 'center' }}>({prod.numOfReviews} Reviews)</span>
                            </div>
                            <h6 className='text-center'>Rs {prod.price}</h6>
                            <div className='text-center' style={{ cursor: 'not-allowed', color: 'white', background: 'black', paddingTop: '7px', paddingBottom: '7px' }}>UNAVAILABLE</div>
                        </div>
                    </Card>
                </Col> :
                <Col style={{ marginTop: '1vh' }} lg='3' md='4' sm='6' xs='6'>
                    <Card className='border-0 mt-2 card-product'>
                        <Link onClick={refresh} style={{ textDecoration: 'none', color: 'black' }} to={`/Products/${prod._id}`}>
                            <div className='card-image-con'>
                                <div className='product-image-wrapper'>
                                    <Image src={prod.images[0].url} className='card-img img-responsive square-img' />
                                </div>
                            </div>
                        </Link>
                        <div style={{ background: '#4d0026', color: '#f2f2f2' }}>
                            <h6 className='text-center mt-2'>{prod.name}</h6>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}><ReactStars  {...options} /></div><span style={{ display: 'flex', justifyContent: 'center' }}>({prod.numOfReviews} Reviews)</span>
                            </div>
                            <h6 className='text-center'>Rs {prod.price}</h6>
                            <div onClick = {addToCart} className='text-center product-btn'> + Add to Cart</div>
                            </div>
                       
                    </Card>
                </Col>}
        </>
    )
}

export default Item