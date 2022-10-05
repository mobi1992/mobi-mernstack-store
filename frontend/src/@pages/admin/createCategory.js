import React, { useState, useEffect } from 'react'
import { Card, Container, Col, Row, Form, Button, Modal } from 'react-bootstrap'
import Loader from '../../@components/loader'
import SideBar from '../../@components/sideBar'
import { Formik } from 'formik'
import * as Yup from 'yup'
import './index.css'
import { BrowserRouter as Router, Switch, Route, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createNewCategory } from '../../@actions/categoryActions/createNewCategory'
import { updateCategory } from '../../@actions/categoryActions/updateCategory'
import { deleteCategory } from '../../@actions/categoryActions/deleteCategory'
const CreateCategory = ({ categories, catgLoading }) => {

  window.onpopstate = function (event) {
    if (event) {
        
        window.location.reload(false)
    }
}


  const initialValues = {
    name: ''
  }


  const initialValues2 = {
    name: ''
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Please select any category'),
  })

  const validationSchema2 = Yup.object({
    name: Yup.string().required("Left unchanged! Click cancel"),
  })


  const dispatch = useDispatch()
  const { newCategory, newCategorySuccess, newCategoryLoading, newCategoryError } = useSelector(state => state.newCategory)
  const {updatedCategory, updatedCategorySuccess, updatedCategoryLoading, updatedCategoryError} = useSelector(state => state.updatedCategory)
  const {deletedCategory, deletedCategoryLoading, deletedCategorySuccess, deletedCategoryError} = useSelector(state => state.deletedCategory)

  useEffect(() => {
    if(newCategorySuccess) {
      window.location.reload(false).scrollTo(0, 0)
    }
    if(updatedCategorySuccess) {
      window.location.reload(false).scrollTo(0, 0)
    }
    if(deletedCategorySuccess){
      window.location.reload(false).scrollTo(0, 0)
    }
  }, [newCategorySuccess, updatedCategorySuccess, deletedCategorySuccess])
  const [edit, setEdit] = useState('')
  const [show, setShow] = useState(false);
  const createCategory = ({ name }) => {
    dispatch(createNewCategory({ name }))
  }

  const updateTheCategory = ({ name }) => {
    const found_catgegory = categories.filter(catg => catg.name === edit)
    const id = found_catgegory[0]._id
    dispatch(updateCategory(id, name))
  }

  const deleteTheCategory = async () => {
    const found_catgegory = categories.filter(catg => catg.name === edit)
    const id = found_catgegory[0]._id
    await dispatch(deleteCategory(id))
    setShow(false)
    window.location.reload(false)
  }
  return (
    <>
      {catgLoading ? <Loader /> :
        <SideBar>
          <Container style={{ height: '100vh' }}>
            <Row>
              <Col lg='8' md='10' className='mx-auto'>
                <Card className='mt-5'>
                  <Card.Body>
                    <h1 style={{ font: '900 4vh italic' }} className='mb-3'>Created Categories</h1>
                    {categories.length !== 0 ? <div>
                      <div>
                        <div>You have created the following categories before</div>
                        {/* {updatedCategorySuccess && <div className = 'text-center text-success mt-3 mb-3'>The category has been successfully updated! Reload the page to view updated Categories</div>} */}
                        {updatedCategoryError && <div className = 'text-center text-danger mt-3 mb-3'>{updatedCategoryError}</div>}
                        {deletedCategoryError && <div className = 'text-center text-danger mt-3 mb-3'>{deletedCategoryError}</div>}
                        {/* <div style = {{display : 'flex', flex : '1', color : 'blue', cursor : 'default', justifyContent : 'right'}} onClick = {() => setEdit(true)}>Edit</div> */}
                      </div>
                      <div>{categories.map(category => <div> {
                        edit === category.name ? <div className='mt-2'>
                          <Formik initialValues={initialValues2}
                            onSubmit={updateTheCategory}
                            validationSchema={validationSchema2}>
                            {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                              <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                  <label htmlFor='name'>Change Category Name</label>
                                  <Form.Control type='text' id='name' name='name' defaultValue={category.name} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Group>
                                {(errors.name && touched.name) && <div className='text-danger text-center'>{errors.name}</div>}

                                <div className='mt-2 mb-2'>
                                  <div style={{ display: 'flex' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1', marginRight: '1vh' }}>
                                      <Button type='submit' className='btn btn-primary'>Update</Button>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1' }}>
                                      <Button onClick={() => setShow(true)} className='btn btn-danger'>Delele</Button>
                                    </div>
                                    <Modal show={show} onHide={() => setShow(false)}>
                                      <Modal.Header closeButton>
                                        <Modal.Title>Delele Category</Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>Are you sure that you want to delete this category, Remember that it cannot be undone!</Modal.Body>
                                      <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShow(false)}>
                                          Cancel
                                        </Button>
                                        <Button variant="danger" onClick={deleteTheCategory}>
                                          Delete
                                        </Button>
                                      </Modal.Footer>
                                    </Modal>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1', marginLeft: '1vh' }}>
                                      <Button onClick={() => setEdit('')} className='btn btn-dark'>Cancel</Button>
                                    </div>
                                  </div>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div> :

                          <div style={{ display: 'flex' }}>
                            <div style={{ display: 'flex', flex: '4' }}>
                              {category.name},
                            </div>
                            <div id={category.name} style={{ display: 'flex', flex: '1', color: 'blue', cursor: 'default', justifyContent: 'right' }} onClick={(e) => setEdit(e.currentTarget.id)}>Edit</div>
                          </div>

                      }
                      </div>
                      )}</div>
                    </div> : <div>No category is created yet!</div>}
                    <br></br>
                    {newCategoryError && <div className='text-center text-danger'>{newCategoryError}</div>}
                    {/* {newCategorySuccess && <div className='text-center text-success'>The category has been successfully created, please reload the page to view updated categories</div>} */}
                    <h1 style={{ font: '900 4vh italic' }} className='mb-3'>Create New Category!</h1>
                    <Formik initialValues={initialValues}
                      onSubmit={createCategory}
                      validationSchema={validationSchema}>
                      {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                        <Form onSubmit={handleSubmit}>
                          <Form.Group>
                            <label htmlFor='name'>Category Name (Category name must be unique!)</label>
                            <Form.Control type='text' id='name' name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                          </Form.Group>
                          {(errors.name && touched.name) && <div className='text-danger text-center'>{errors.name}</div>}
                          <br></br>


                          <Row className='mt-3
                 row justify-content-center align-items-center'>
                            <Col></Col>
                            <Col lg='4' md='4' sm='4' xs='8'>
                              <Row className='justify-content-center'>
                                <Button className='btn btn-dark' type='submit'>Create Category</Button>
                              </Row>
                            </Col>
                            <Col></Col>
                          </Row>
                        </Form>
                      )}
                    </Formik>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </SideBar>}
    </>
  )
}

export default CreateCategory