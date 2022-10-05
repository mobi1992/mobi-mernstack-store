
import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Container, Row, InputGroup, FormControl, Badge } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import './index.css'
import Announcement from '../../@components/announcement'
import NavBar from '../../@components/navBar'
import aloervera_soap from '../../@assets/images/Aloevera_Soap.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetail } from '../../@actions/productActions/getProductDetail'
import Error from '../../@components/error'
import Loader from '../../@components/loader'
import ReactStars from 'react-rating-stars-component'
import ItemCard from '../../@components/product'
import RelatedProductsItemCard from '../../@components/relatedProducts'
import ReviewCard from '../../@components/reviewCard'
import aloevera_soap from '../../@assets/images/Aloevera_Soap.jpeg'
import AddReview from '../../@components/addReview'
import AddReviewUnknownUser from '../../@components/addReviewUnknownUser'
import SideBar from '../../@components/sideBar'
import AdminRelatedProductsItemCard from '../../@components/adminRelatedProducts'
import AdminReviewCard from '../../@components/adminReviewCard'

const ProductDetails = ({ next, userDetails, isAuthenticated, product, loading, productSuccess, category, id}) => {

    // reload the page when backbutton is clicked

    // const [prod, setProd] = useState({})
    const [showAddReview, setShowAddReview] = useState(true)
    const [addReview, setAddReview] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.ratings,
        size: window.innerWidth < 600 ? 20 : 25,
        isHalf: true
    }

    console.log(product)

    // useEffect(() => {
    //     setProd(product)
    // }, [product])

    const priceStyle = {
        color: '#5b18b0',
        fontWeight: 'bold',
        fontFamily: 'Arial'
    }

    const clicked = () => {
        setAddReview(true)
        setShowAddReview(false)
    }
    // clear the localStorage
    localStorage.removeItem('AllProductsValue')

    const incrementQuantity = () => {
        if (product.stock <= quantity) {
            return alert(`You cannot add this more that ${quantity} items to your cart, as product stock is : ${product.stock}`)
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
        if (e.target.value > product.stock) {
            return alert(`You cannot add ${e.target.value} items to your cart, as product stock is : ${product.stock}`)
        }
        setQuantity(parseInt(e.target.value))
    }

   

        return (
            <>
                {/* <Announcement /> */}
                {/* <NavBar /> */}

                <SideBar>
                    {loading ? <Loader /> :
                        product.stock === 0 && productSuccess ?
                            <>
                                <Row className='justify-content-left'>
                                    <Col lg='6' md='6' sm='6' xs='12'>
                                        <div style={{ marginLeft: '3vh' }} className='text-muted mt-2'>{category} &gt; {product.name} </div>
                                        <Card className='border-0 mt-5'>
                                            <Card.Body>
                                                <div className='sold_product_detail_image'>
                                                    <Badge pill bg='secondary' className='sold_product_detail_notify-badge'>Sold out</Badge>
                                                    <div className='card-image-con'>
                                                        <div className='product-image-wrapper'>
                                                            <img className="card-img img-responsive square-img" src={product.images[0].url} alt="Card image" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col lg='6' md='6' sm='6' xs='12'>
                                        <Card className='border-0 mt-5'>
                                            <Card.Body style={{ textAlign: 'left' }}>
                                                <div style={{ display: 'flex' }}>
                                                    <div style={{ display: 'flex', flex: '4' }}>
                                                        <h2 className='mt-3 card-title responsive-content-heading'>{product.name} </h2>
                                                    </div>
                                                    <div style={{ display: 'flex', flex: '1', justifyContent: 'right', cursor: 'default' }}>
                                                        <Link style = {{textDecoration : 'none'}} to = {`/admin/Products/update/${id}`}>
                                                        <h3 className='mt-3 card-title responsive-content-heading'>Edit</h3>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <h3 className='card-title responsive-content-heading' style={priceStyle}>Rs {product.price}</h3>
                                                <div className='mt-3 mb-3'>
                                                    <p style={{ display: 'inline' }}>Availability : </p>
                                                    {product.stock !== 0 ? <p style={{ color: 'green', display: 'inline', fontWeight: 'bold' }}>In Stock</p> : <p style={{ color: 'red', display: 'inline', fontWeight: 'bold' }}>Out Of Stock</p>}
                                                </div>

                                                <div className='mb-3'>
                                                    <p style={{ display: 'inline' }}>Product Code : </p>
                                                    <p style={{ color: 'grey', display: 'inline', fontWeight: 'bold' }}>{product._id}</p>
                                                </div>
                                                <hr></hr>
                                                {/* <a href = "#reviews" style = {{ textDecoration : 'none'}}> */}
                                                <div>
                                                    <ReactStars {...options} /><p style={{ display: 'inline' }}>{Math.round(product.ratings * 10) / 10}/5 based on </p>
                                                    <span>({product.numOfReviews} Reviews)</span>
                                                </div>
                                                {/* </a> */}
                                                <hr></hr>
                                                <div className='mb-3'>
                                                    <h2 className='responsive-content-heading'>Description:</h2>
                                                    <p style={{ color: 'grey', display: 'inline', fontWeight: 'bold' }}>{product.description}</p>
                                                    {/* <Typography dangerouslySetInnerHTML={{ __html: matchProduct[0].description }} variant='p' /> */}
                                                </div>
                                                <div className='mb-3'>
                                                    <h2 className='responsive-content-heading'>Ingredients:</h2>
                                                    <p style={{ color: 'grey', display: 'inline', fontWeight: 'bold' }}>{product.ingredients}</p>
                                                    {/* <Typography dangerouslySetInnerHTML={{ __html: matchProduct[0].description }} variant='p' /> */}
                                                </div>
                                                <div style={{ background: 'lightgrey', height: '50px', width: '230px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'default' }}>UNAVAILABLE</div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <hr></hr>
                                <h1 className='text-center head' styel={{ fontWeight: 'bolder' }}>You May Also Like</h1>
                                {product.related_products && product.related_products[0] ? (
                                    <AdminRelatedProductsItemCard products={product.related_products} />
                                ) : <p className='text-center noReviews mt-4 mb-4'>No Product in this category Yet!</p>}
                                <hr></hr>
                                <h1 className='text-center head' styel={{ fontWeight: 'bolder' }}>Reviews</h1>
                                <div>
                                    {product.reviews && product.reviews[0] ? (
                                        <div className='reviews'>
                                            {product.reviews.map(review => <AdminReviewCard product={product} review={review} />)}
                                        </div>
                                    ) : <p className='text-center noReviews mt-4'>No Reviews Yet!</p>}

                                </div>
                            </>
                            : productSuccess &&
                            <>
                                <Row className='justify-content-left'>
                                    <Col lg='6' md='6' sm='6' xs='12'>
                                        <div style={{ marginLeft: '3vh' }} className='text-muted mt-2'>{category} &gt; {product.name} </div>
                                        <Card className='border-0 mt-5'>
                                            <Card.Body>
                                                <div className='card-image-con'>
                                                    <div className='product-image-wrapper'>
                                                        <img className="card-img img-responsive square-img" src={product.images[0].url} alt="Card image" />
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col lg='6' md='6' sm='6' xs='12'>
                                        <Card className='border-0 mt-5'>
                                            <Card.Body style={{ textAlign: 'left' }}>
                                                <div style={{ display: 'flex' }}>
                                                    <div style={{ display: 'flex', flex: '4' }}>
                                                        <h2 className='mt-3 card-title responsive-content-heading'>{product.name} </h2>
                                                    </div>
                                                    <div style={{ display: 'flex', flex: '1', justifyContent: 'right', cursor: 'default' }}>
                                                        <Link style = {{textDecoration : 'none'}} to = {`/admin/Products/update/${id}`}>
                                                        <h3 className='mt-3 card-title responsive-content-heading'>Edit</h3>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <h3 className='card-title responsive-content-heading' style={priceStyle}>Rs {product.price}</h3>
                                                <div className='mt-3 mb-3'>
                                                    <p style={{ display: 'inline' }}>Availability : </p>
                                                    {product.stock !== 0 ? <p style={{ color: 'green', display: 'inline', fontWeight: 'bold' }}>In Stock</p> : <p style={{ color: 'red', display: 'inline', fontWeight: 'bold' }}>Out Of Stock</p>}
                                                </div>
                                                <div className='mt-3 mb-3'>
                                                    <p style={{ display: 'inline' }}>Stock : </p>
                                                    {product.stock < 10 ? <p style={{ color: 'red', display: 'inline', fontWeight: 'bold' }}>Only {product.stock} left!</p> : <p style={{ color: 'green', display: 'inline', fontWeight: 'bold' }}>{product.stock}</p>}
                                                </div>
                                                <div className='mb-3'>
                                                    <p style={{ display: 'inline' }}>Product Code : </p>
                                                    <p style={{ color: 'grey', display: 'inline', fontWeight: 'bold' }}>{product._id}</p>
                                                </div>
                                                <hr></hr>
                                                {/* <a href = "#reviews" style = {{ textDecoration : 'none'}}> */}
                                                <div>
                                                    <ReactStars {...options} /><p style={{ display: 'inline' }}>{Math.round(product.ratings * 10) / 10}/5 based on </p>
                                                    <span>({product.numOfReviews} Reviews)</span>
                                                </div>
                                                {/* </a> */}
                                                <hr></hr>
                                                <div className='mb-3'>
                                                    <h2 className='responsive-content-heading'>Description:</h2>
                                                    <p style={{ color: 'grey', display: 'inline', fontWeight: 'bold' }}>{product.description}</p>
                                                    {/* <Typography dangerouslySetInnerHTML={{ __html: matchProduct[0].description }} variant='p' /> */}
                                                </div>
                                                <div className='mb-3'>
                                                    <h2 className='responsive-content-heading'>Ingredients:</h2>
                                                    <p style={{ color: 'grey', display: 'inline', fontWeight: 'bold' }}>{product.ingredients}</p>
                                                    {/* <Typography dangerouslySetInnerHTML={{ __html: matchProduct[0].description }} variant='p' /> */}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        <Row style={{ marginLeft: '2vh' }}>
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
                                                <div>
                                                    <Button variant='dark' className='btn responsive-content-item btn-item'>Add To Cart</Button>
                                                </div>
                                                {/* </Link> */}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <hr></hr>
                                <h1 className='text-center head' styel={{ fontWeight: 'bolder' }}>You May Also Like</h1>
                                {product.related_products && product.related_products[0] ? (
                                    <AdminRelatedProductsItemCard products={product.related_products} />
                                ) : <p className='text-center noReviews mt-4 mb-4'>No Product in this category Yet!</p>}
                                <hr></hr>
                                <h1 className='text-center head' styel={{ fontWeight: 'bolder' }}>Reviews</h1>
                                <div>
                                    {product.reviews && product.reviews[0] ? (
                                        <div className='reviews'>
                                            {product.reviews.map(review => <AdminReviewCard product={product} review={review} />)}
                                        </div>
                                    ) : <p className='text-center noReviews mt-4'>No Reviews Yet!</p>}

                                </div>
                            </>}
                </SideBar>
            </>
        )
}

export default ProductDetails