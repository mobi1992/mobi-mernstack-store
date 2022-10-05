import React, { useState, useEffect, useMemo } from 'react'
import SideBar from '../../@components/sideBar'
import { Formik } from 'formik'
import * as Yup from 'yup'
import './index.css'
import { BrowserRouter as Router, Switch, Route, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, Col, Container, Form, InputGroup, Row, Badge } from 'react-bootstrap'
import Loader from '../../@components/loader'
import { getCategories } from '../../@actions/categoryActions/getAllCategories'
import { createNewProduct } from '../../@actions/productActions/createNewProduct'
import { getProducts } from '../../@actions/productActions/getProducts'
import { debounce } from '../../@components/debounce'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const CreateProduct = ({ categories, catgLoading }) => {
  const dispatch = useDispatch()
  // const { categories, loading } = useSelector(state => state.categories)
  const initialValues = {
    name: '',
    price: 0,
    description: '',
    ingredients: '',
    stock: 0,
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

  const [showImgIcon, setShowImgIcon] = useState(true)
  const [imageAdd, setImageAdd] = useState(false)
  const [previewImage, setPreviewImage] = useState()
  const [image, setImage] = useState()
  const [err, setErr] = useState(true)

  const selectImages = (e) => {
    setShowImgIcon(false)
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

  const default_catg = categories[0] ? categories[0].name : ''
  const [catgArr, setCatgArr] = useState([default_catg])
  const [prodCatg, setProdCatg] = useState(default_catg)
  const setCategoryArr = (e) => {
    setProdCatg(e.target.value)
    if (!catgArr.some(ctg => ctg === e.target.value)) {
      setCatgArr(catgArr.concat(e.target.value))
    }
  }
  const deleteProdCatg = (category) => {
    setCatgArr(catgArr.filter(catg => catg !== category))
  }

  const { products, loading, searchedProductsCount } = useSelector(state => state.products)
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


  const setRelatedProducts = (prod) => {
    if (!relatedProdArr.some(relProd => relProd === prod) && relatedProdArr.length <= 3) {
      setRelatedProdArr(relatedProdArr.concat(prod))
    }
  }

  const deleteRelProd = (id) => {
    setRelatedProdArr(relatedProdArr.filter(prod => prod.id !== id))
  }

  const { createNewprod, createNewprodSuccess, createNewprodError, createNewprodLoading } = useSelector(state => state.createNewprod)


  const createProduct = ({ name, price, ingredients, description, stock }) => {

    const prod_catg = []
    for (let i = 0; i < catgArr.length; i++) {
      prod_catg.push(categories.filter(catg => catg.name === catgArr[i])[0]._id)
    }

    console.log(prod_catg)
    let prod_catg_str = ''
    for (let j = 0; j < prod_catg.length; j++) {
      prod_catg_str += prod_catg[j]
      prod_catg_str += ','
    }
    // trim last comma
    const catgs = prod_catg_str.slice(0, -1)
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
    dispatch(createNewProduct({ name, price, ingredients, description, stock, catgs, image, relatedProducts }))

  }

  useEffect(() => {
    // dispatch(getCategories())
    // console.log(categories)
    // if (loading === false) {
    console.log('categories.....', categories)
    for (let i = 0; i < categories.length; i++) {
      catg_out.push(categories[i].name)
      console.log('catg.................', catg_out)
    }
    // }
  }, [])

  useEffect(() => {
    search.length && handleRelatedProductChange()
    console.log(searchResult)
  }, [search])

  return (
    <>
      {catgLoading ? <Loader /> :
        <SideBar>
          <Row>
            <Col lg='6' md='8' sm='8' className='mx-auto'>
              <Card className='mt-3'>
                <Card.Body>
                  <h1 style={{ font: '900 4vh italic' }} className='mb-3'>Create New Product</h1>
                  {imageAdd && previewImage && <div className='mt-5 mb-5 image-wrapper-create-prod create_product_image'>
                    <img className='home-img-create-prod' src={URL.createObjectURL(previewImage)} />
                    <div onClick={() => refToButton.click()} className='create_product_notify-badge'><AddToPhotosIcon style={{ transform: 'scale(2.0)' }} /></div>
                  </div>}

                  <Form.Group>
                    <input type='file' accept="image/*" onChange={selectImages} style={{ display: 'none' }} ref={refToBtn => refToButton = refToBtn} />
                    {showImgIcon && <Card className='border-primary mb-3' style={{ height: '30vh' }}>
                      <Card.Body>
                        <div onClick={() => refToButton.click()} style={{ display: 'flex', alignItems: 'center', paddingTop: '10vh', flexDirection: 'column', cursor: 'default' }}>
                          <span><AddToPhotosIcon style={{ transform: 'scale(2.8)' }} /></span>
                          <div className='mt-3'>Drag Your Photo here</div>
                        </div>
                      </Card.Body>
                    </Card>}
                  </Form.Group>
                  <Formik initialValues={initialValues}
                    onSubmit={createProduct}
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

                        <h4 className='mb-3' htmlFor='category'>The Product Categories are : </h4>
                        {catgArr.map(category => {
                          return (<div style={{ cursor: 'default' }} className='mb-2'>
                            <div className='text-primary' style={{ float: 'left', marginLeft: '1.5vw' }}>{category}</div>
                            <div onClick={() => deleteProdCatg(category)} style={{ float: 'right', marginRight: '1.5vw' }}><i class="fas fa-trash-alt"></i></div>
                            <br></br>
                          </div>)
                        }
                        )}
                        <br></br>

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

                        <h4>Related Products : </h4>
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

                        {err && createNewprodError && createNewprodError === 'Internal Server Error' ? <p className='text-center text-danger'>Please select category or image</p> : createNewprodError !== 'Internal Server Error' && <p className='mt-3 mb-3 text-center text-danger'>{createNewprodError}</p>}
                        {createNewprodSuccess && <p className='text-success text-center mt-3 mb-3'>Product Successfully created!</p>}
                        {createNewprodLoading && <p className='mt-3 mb-3 text-center text-primary'>Creating Product.....</p>}
                        <Row className='mt-4 row justify-content-center align-items-center'>
                          <Col></Col>
                          <Col lg='4' md='4' sm='4' xs='8'>
                            <Row className='justify-content-center'>
                              <Button className='btn btn-dark' type='submit'>Create Product</Button>
                            </Row>
                          </Col>
                          <Col></Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>

                </Card.Body>
              </Card>
              <br></br>

            </Col>
          </Row>
        </SideBar>}
    </>
  )
}

export default CreateProduct