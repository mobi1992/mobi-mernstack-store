import React, { useState, useEffect, useMemo } from 'react'
import SideBar from '../../@components/sideBar'
import { Formik } from 'formik'
import * as Yup from 'yup'
import './index.css'
import { BrowserRouter as Router, Switch, Route, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, Col, Container, Form, InputGroup, Row, Modal} from 'react-bootstrap'
import Loader from '../../@components/loader'
import { getCategories } from '../../@actions/categoryActions/getAllCategories'
import { createNewProduct } from '../../@actions/productActions/createNewProduct'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { getProducts } from '../../@actions/productActions/getProducts'
import { debounce } from '../../@components/debounce'
import { updateTheProduct } from '../../@actions/productActions/updateTheProduct'
import { getProductDetail } from '../../@actions/productActions/getProductDetail'
import { deleteRelatedProduct } from '../../@actions/productActions/deleteRelatedProduct'
import { deleteProductCategory } from '../../@actions/productActions/deleteProductCategory'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { deleteProduct } from '../../@actions/productActions/deleteProduct'
import { routePaths } from '../../@services/constants'

const UpdateProduct = ({ product, categories, id }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const { categories, loading } = useSelector(state => state.categories)
    let prod_categories_arr = []
    for (let i = 0; i < product.prod_categories.length; i++) {
        prod_categories_arr.push(categories.filter(catg => catg._id === product.prod_categories[i].category)[0])
    }

    const initialValues = {
        name: product.name,
        price: product.price,
        description: product.description,
        ingredients: product.ingredients,
        stock: product.stock
    }




    const validationSchema = Yup.object({
        name: Yup.string().required('This Field is Required'),
        price: Yup.number().required('This field is required'),
        description: Yup.string().required('This Field is Required'),
        ingredients: Yup.string().required('This Field is Required'),
        stock: Yup.number().required('This Field is Required'),
    })

    let catg_out = []

    let refToButton = React.createRef()


    const [imageAdd, setImageAdd] = useState(false)
    const [previewImage, setPreviewImage] = useState()
    const [image, setImage] = useState()
    const [err, setErr] = useState(true)

    const selectImages = (e) => {
        const reader = new FileReader();
        setPreviewImage(e.target.files[0])
        console.log(e.target.files[0])
        reader.onload = () => {
            if (reader.readyState === 2) {
                // setAvatarPreview(reader.result);
                setImage(reader.result);
            }
        };
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        setImageAdd(true)
        setErr(false)
    }

    const { products, loading, searchedProductsCount } = useSelector(state => state.products)
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('')
    const [searchBox, setSearchBox] = useState(false)
    const result = []
    const [searchResult, setSearchResult] = useState([])
    const related_prod_arr = []
    const [relatedProdArr, setRelatedProdArr] = useState([])
    const setTheSearch = (e) => {
        setSearchBox(true)
        setSearch(e.target.value)
    }

    const onChangeSearch = useMemo(() => debounce(setTheSearch, 300), []);
    const handleRelatedProductChange = () => {
        dispatch(getProducts(search))
        if (loading === false) {
            for (let i = 0; i < searchedProductsCount; i++) {
                const name = products[i].name
                const id = products[i]._id
                result.push({ name, id })
            }
            setSearchResult(result)
        }
    }

    const relatedProductsArr = product.related_products

    const setRelatedProducts = (prod) => {
        if (!relatedProdArr.some(relProd => relProd === prod) && (relatedProdArr.length + relatedProductsArr.length) <= 3 && !relatedProductsArr.some(relProd => relProd.product.name === prod.name)) {
            setRelatedProdArr(relatedProdArr.concat(prod))
        }
    }

    const deleteRelProd = (id) => {
        setRelatedProdArr(relatedProdArr.filter(prod => prod.id !== id))
    }

    const { deleteRelatedProd, deleteRelatedProdSuccess, deleteRelatedProdError } = useSelector(state => state.deleteRelatedProd)
    const deleteRelProduct = (relatedProdId) => {
        dispatch(deleteRelatedProduct(relatedProdId, id))
    }


    // if product categories have already have the first category in categories array, then initail value of thr catgArr shoud be an empty array
    const default_catg = prod_categories_arr.some(catg => catg.name === categories[0].name) ? [] : [categories[0].name]
    const [catgArr, setCatgArr] = useState(default_catg)
    const [prodCatg, setProdCatg] = useState(default_catg)
    const setCategoryArr = (e) => {
        setProdCatg(e.target.value)
        if (!catgArr.some(ctg => ctg === e.target.value) && !prod_categories_arr.some(catg => catg.name === e.target.value)) {
            setCatgArr(catgArr.concat(e.target.value))
        }
    }
    const deleteProdCatg = (category) => {
        setCatgArr(catgArr.filter(catg => catg !== category))
    }

    const { deleteProdCategory, deleteProdCategorySuccess, deleteProdCategoryError } = useSelector(state => state.deleteProdCategory)
    const deleteProductCatg = (catgId) => {
        dispatch(deleteProductCategory(catgId, id))
    }

    const { updateProduct, updateProductError, updateProductSuccess, updateProductLoading } = useSelector(state => state.updateProduct)
    const updateProd = ({ name, price, ingredients, description, stock }) => {
        // console.log('submitted..............')

        const prod_catg = []
        for (let i = 0; i < catgArr.length; i++) {
            prod_catg.push(categories.filter(catg => catg.name === catgArr[i])[0]._id)
        }


        let prod_catg_str = ''
        for (let j = 0; j < prod_catg.length; j++) {
            prod_catg_str += prod_catg[j]
            prod_catg_str += ','
        }
        // trim last comma
        const catgs = prod_catg_str.slice(0, -1)
        console.log('catg............', catgs)
        const rel_prods = []
        for (let i = 0; i < relatedProdArr.length; i++) {
            rel_prods.push(relatedProdArr[i].id)
        }
        console.log(rel_prods)

        let rel_prod_str = ''
        for (let j = 0; j < rel_prods.length; j++) {
            rel_prod_str += rel_prods[j]
            rel_prod_str += ','
        }

        const relatedProducts = rel_prod_str.slice(0, -1)
        const id = product._id
        dispatch(updateTheProduct({ name, price, ingredients, description, stock, catgs, image, relatedProducts }, id))

    }

    const {deleteProd, deleteProdSuccess, deleteProdError, deleteProdLoading} = useSelector(state => state.deleteProd)
    const deleteTheProduct = () => {
        dispatch(deleteProduct(id))
    }
    useEffect(() => {

        for (let i = 0; i < categories.length; i++) {
            catg_out.push(categories[i].name)

        }
        // }
    }, [])

    useEffect(() => {
        search.length && handleRelatedProductChange()
        console.log(searchResult)
    }, [search])

    useEffect(() => {
        if (updateProductSuccess) {
            window.location.reload(false).scrollTo(0, 0)
        }
        if (deleteRelatedProdSuccess) {
            window.location.reload(false).scrollTo(0, 0)
        }
        if (deleteProdCategorySuccess) {
            window.location.reload(false).scrollTo(0, 0)
        }
        if(deleteProdSuccess) {
            navigate(routePaths.adminAccount)
        }
    }, [updateProductSuccess, deleteRelatedProdSuccess, deleteProdCategorySuccess, deleteProdSuccess])


    return (
        <>
            <Row>
                <Col lg='6' md='8' sm='8' className='mx-auto'>
                    <Card className='mt-3'>
                        <Card.Body>
                            <h1 style={{ font: '900 4vh italic' }} className='mb-3'>Update Product</h1>
                            {!imageAdd && <div className='mt-3 mb-3 card-image-con'>
                                <div className='product-image-wrapper create_product_image'>
                                    <img className="card-img img-responsive square-img" src={product.images[0].url} alt="Card image" />
                                    <div onClick={() => refToButton.click()} className='create_product_notify-badge'><AddToPhotosIcon style={{ transform: 'scale(2.0)' }} /></div>
                                </div>
                            </div>}
                            {imageAdd && previewImage && <div className='mt-3 mb-3 image-wrapper-create-prod create_product_image'>
                                <img className='home-img-create-prod' src={URL.createObjectURL(previewImage)} />
                                <div onClick={() => refToButton.click()} className='create_product_notify-badge'><AddToPhotosIcon style={{ transform: 'scale(2.0)' }} /></div>
                            </div>}
                            <Form.Group>
                                <input type='file' accept="image/*" onChange={selectImages} style={{ display: 'none' }} ref={refToBtn => refToButton = refToBtn} />
                            </Form.Group>

                            <Formik initialValues={initialValues}
                                onSubmit={updateProd}
                                validationSchema={validationSchema}>
                                {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group>
                                            <label htmlFor='name'>Product Name (Product name must be unique)</label>
                                            <Form.Control type='text' id='name' name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                        </Form.Group>
                                        {(errors.name && touched.name) && <div className='text-danger text-center'>{errors.name}</div>}
                                        <br></br>

                                        <Form.Group>
                                            <label htmlFor='name'>Product Price</label>
                                            <Form.Control type='number' id='price' name='price' value={values.price} onChange={handleChange} onBlur={handleBlur} />
                                        </Form.Group>
                                        {(errors.price && touched.price) && <div className='text-danger text-center'>{errors.price}</div>}
                                        <br></br>

                                        <Form.Group>
                                            <label htmlFor='name'>Product Description</label>
                                            <textarea className='form-control' rows='3' type='text' id='description' name='description' value={values.description} onChange={handleChange} onBlur={handleBlur} />
                                        </Form.Group>
                                        {(errors.description && touched.description) && <div className='text-danger text-center'>{errors.description}</div>}
                                        <br></br>

                                        <Form.Group>
                                            <label htmlFor='name'>Product Ingredients</label>
                                            <textarea className='form-control' type='text' rows='3' id='ingredients' name='ingredients' value={values.ingredients} onChange={handleChange} onBlur={handleBlur} />
                                        </Form.Group>
                                        {(errors.ingredients && touched.ingredients) && <div className='text-danger text-center'>{errors.ingredients}</div>}
                                        <br></br>

                                        <Form.Group>
                                            <label htmlFor='name'>Product Stock</label>
                                            <Form.Control type='number' id='stock' name='stock' value={values.stock} onChange={handleChange} onBlur={handleBlur} />
                                        </Form.Group>
                                        {(errors.stock && touched.stock) && <div className='text-danger text-center'>{errors.stock}</div>}
                                        <br></br>

                                        {deleteProdCategoryError && <div className='text-danger text-center'>{deleteProdCategoryError}</div>}
                                        <br></br>
                                        <h4>Product Categories : </h4>
                                        {prod_categories_arr.map(catg => {
                                            return (<div style={{ cursor: 'default' }} className='mb-2'>
                                                <div className='text-primary' style={{ float: 'left' }}>{catg.name}</div>
                                                <div onClick={() => deleteProductCatg(catg._id)} style={{ float: 'right' }}><i class="fas fa-trash-alt"></i></div>
                                                <br></br>
                                            </div>)
                                        }
                                        )}

                                        <div className='mb-3'>
                                            {catgArr.map(catg => {
                                                return (<div style={{ cursor: 'default' }} className='mb-2'>
                                                    <div className='text-primary' style={{ float: 'left' }}>{catg}</div>
                                                    <div onClick={() => deleteProdCatg(catg)} style={{ float: 'right' }}><i class="fas fa-trash-alt"></i></div>
                                                    <br></br>
                                                </div>)
                                            })
                                            }
                                        </div>

                                        <Form.Group>
                                            <label htmlFor='categories'>Select Category</label>
                                            <Form.Select value={values.prodCatg} id='category' name='category' onChange={setCategoryArr} >
                                                <option disabled>Select any category</option>
                                                {categories.map(category => (
                                                    <>
                                                        <option>{category.name}</option>
                                                    </>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                        <br></br>


                                        {deleteRelatedProdError && <div className='text-danger text-center'>{deleteRelatedProdError}</div>}
                                        <br></br>

                                        <h4>Related Products : </h4>
                                        <div>
                                            {relatedProductsArr.map(prod => {
                                                return (<div style={{ cursor: 'default' }} className='mb-2'>
                                                    <div className='text-success' style={{ float: 'left' }}>{prod.product.name}</div>
                                                    <div onClick={() => deleteRelProduct(prod._id)} style={{ float: 'right' }}><i class="fas fa-trash-alt"></i></div>
                                                    <br></br>
                                                </div>)
                                            })
                                            }
                                        </div>
                                        <div className='mb-3'>
                                            {relatedProdArr.map(prod => {
                                                return (<div style={{ cursor: 'default' }} className='mb-2'>
                                                    <div className='text-success' style={{ float: 'left' }}>{prod.name}</div>
                                                    <div onClick={() => deleteRelProd(prod.id)} style={{ float: 'right' }}><i class="fas fa-trash-alt"></i></div>
                                                    <br></br>
                                                </div>)
                                            })
                                            }
                                        </div>

                                        <Form.Group>
                                            <label>Add the Related Products</label>
                                            <Form.Control type='text' placeholder='Search for a product' className='form-control' onChange={onChangeSearch} />
                                            {searchBox &&
                                                <Card style={{ height: '20vh', overflow: 'scroll' }} className='border-0'>
                                                    <Card.Body>
                                                        {
                                                            searchResult.map(list => {
                                                                return (<div style={{ cursor: 'default' }} onClick={() => setRelatedProducts(list)} className='mb-2'>
                                                                    <div style={{ float: 'left' }}>{list.name}</div>
                                                                    <div style={{ float: 'right' }}><i class="fa fa-plus-circle"></i></div>
                                                                    <br></br>
                                                                </div>)
                                                            })
                                                        }
                                                    </Card.Body>
                                                </Card>
                                            }
                                        </Form.Group>

                                        {updateProductError && <div className='mt-3 mb-3 text-center text-danger'>{updateProductError}</div>}
                                        {updateProductLoading && <div className='mt-3 mb-3 text-center text-primary'>Updating.....</div>}
                                        <Row className='mt-4 row justify-content-center align-items-center'>
                                            <Col></Col>
                                            <Col lg='4' md='4' sm='4' xs='8'>
                                                <Row className='justify-content-center'>
                                                    <Button className='btn btn-dark' type='submit'>Update Product</Button>
                                                </Row>
                                            </Col>
                                            <Col></Col>
                                        </Row>
                                    </Form>
                                )}
                            </Formik>
                            {deleteProdError && <div className='mt-3 mb-3 text-center text-danger'>{deleteProdError}</div>}
                            <Row className='mt-4 row justify-content-center align-items-center'>
                                <Col></Col>
                                <Col lg='4' md='4' sm='4' xs='8'>
                                    <Row className='justify-content-center'>
                                        <Button onClick={() => setShow(true)} className='btn btn-danger'>Delete Product</Button>
                                    </Row>
                                </Col>
                                <Col></Col>
                            </Row>
                            <Modal show={show} onHide={() => setShow(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Delele Category</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Are you sure that you want to delete this category, Remember that it cannot be undone!</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShow(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="danger" onClick={deleteTheProduct}>
                                        Delete
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Card.Body>
                    </Card>
                    <br></br>

                </Col>
            </Row>
        </>
    )
}

export default UpdateProduct