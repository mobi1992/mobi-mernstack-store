import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import { Col, Card, Image, Badge } from 'react-bootstrap'
import './index.css'
import { useNavigate, Link } from "react-router-dom";
import ReactStars from 'react-rating-stars-component'
import aloervera_soap from '../../@assets/images/Aloevera_Soap.jpeg'

const Item = ({ product }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.ratings,
        size: window.innerWidth < 600 ? 20 : 25,
        isHalf: true
    }
    const navigate = useNavigate()
    const refresh = () => {
        navigate(`/admin/Products/${product._id}`)
        window.location.reload(false).scrollTo(0, 0)
    }
    // console.log(product)
    return (
        <>
        {product.stock === 0 ?
        <Col style={{ marginTop: '1vh' }} lg='3' md='4' sm='6' xs='6'>
        <Link onClick = {refresh} style = {{textDecoration : 'none', color : 'black'}} to = {`/admin/Products/${product._id}`}>
            <Card  className='border-0 mt-2 admin-card-product'>
                <div className='card-image-con'>
                    <div className='product-image-wrapper sold_product_image'>
                        <Badge pill bg='secondary' className='sold_product_notify-badge'>Sold out</Badge>
                        <Image src={product.images[0].url} className='card-img img-responsive square-img' />
                    </div>
                    
                    </div>
                <h6 className='text-center mt-2'>{product.name}</h6>
                <div>
                    <div style = {{display : 'flex', justifyContent : 'center'}}><ReactStars  {...options} /></div><span style = {{display : 'flex', justifyContent : 'center'}}>({product.numOfReviews} Reviews)</span>
                </div>
                <h6 className='text-center'>Rs {product.price}</h6>
            </Card>
            </Link>
    </Col> :
    <Col style={{ marginTop: '1vh' }} lg='3' md='4' sm='6' xs='6'>
    <Link onClick = {refresh} style = {{textDecoration : 'none', color : 'black'}} to = {`/admin/Products/${product._id}`}>
        <Card  className='border-0 mt-2 admin-card-product'>
            <div className='card-image-con'>
                <div className='product-image-wrapper'>
                    <Image src={product.images[0].url} className='card-img img-responsive square-img' />
                </div>
            </div>
            <h6 className='text-center mt-2'>{product.name}</h6>
            <div>
                <div style = {{display : 'flex', justifyContent : 'center'}}><ReactStars  {...options} /></div><span style = {{display : 'flex', justifyContent : 'center'}}>({product.numOfReviews} Reviews)</span>
            </div>
            <h6 className='text-center'>Rs {product.price}</h6>
        </Card>
        </Link>
</Col>}
        </>
    )
}

export default Item