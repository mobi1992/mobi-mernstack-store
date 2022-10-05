import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { BrowserRouter as Router, Switch, Route, Link, useNavigate } from 'react-router-dom'
// import {apis} from '../../@services'
import { password_show_hide } from '../../@components/showHidePassword'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../../@actions/userActions/login'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import Announcement from '../../@components/announcement'
import NavBar from '../../@components/navBar'
import { routePaths } from '../../@services/constants'
import { getUserDetails } from '../../@actions/userActions/getUserDetails'
// import {routePaths} from '../../@services'
const initialValues = {
    email: '',
    password: '',
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email Format').required('This Field is Required'),
    password: Yup.string().min('8').required('Please enter a password with min 8 characters')
})
const LogIn = () => {
    // reload the previous page when backbutton is clicked
    window.onpopstate = function (event) {
        if (event) {
            // console.log('backbutton clicked')
            // window.history.go()
            window.location.reload(false).scrollTo(0, 0)
        }
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, user, error } = useSelector(state => state.user)
    const { isAdmin, userDetails, isAuthenticated } = useSelector(state => state.userDetails)
    const logInUser = async ({ email, password }) => {

        await dispatch(loginUser({ email, password }))
        console.log('user is, ', user)
        console.log('error is ', error)
        await dispatch(getUserDetails())
        // if (error){
        //     return
        // }

    }



    useEffect(() => {
        if (isAuthenticated) {
            if (userDetails.user.role === 'admin') {
                navigate(routePaths.adminAccount)
                window.location.reload(false)
            }
            else if (userDetails.user.role === 'user') {
                navigate(routePaths.my_account)
                window.location.reload(false)
            }
        }
        
    }, [isAuthenticated, userDetails])

    // useEffect(() => {
    //     if(isAdmin === false) {
    //         navigate(routePaths.my_account)
    //         window.location.reload(false)
    //     }
    // }, [isAdmin])


    return (
        <div style={{ backgroundColor: '#ffe6f0' }}>
            {/* <Announcement /> */}
            {/* <NavBar /> */}
            <Container style={{ height: '100vh' }}>
                <Row>
                    <Col lg='4' md='6' className='mx-auto'>
                        <Card className='mt-3'>
                            <Card.Body>
                                {error && <p className='text-center text-danger'>{error}</p>}
                                <h1 style={{ font: '900 4vh italic' }} className='mb-3'>Login</h1>
                                <Formik initialValues={initialValues}
                                    onSubmit={logInUser}
                                    validationSchema={validationSchema}>
                                    {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group>
                                                <label htmlFor='email'>Email Address</label>
                                                <Form.Control type='text' id='email' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                            </Form.Group>
                                            {(errors.email && touched.email) && <div> <div className='text-danger text-center'>{errors.email}</div> <br></br></div>}
                                            <Form.Group>
                                                <label>Password</label>
                                                <InputGroup>
                                                    <Form.Control name="password" type="password" id="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                                                    <InputGroup.Text>
                                                        <span onClick={password_show_hide}>
                                                            <i className="fas fa-eye" id="show_eye"></i>
                                                            <i className="fas fa-eye-slash d-none" id="hide_eye"></i>
                                                        </span>
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </Form.Group>
                                            {(errors.password && touched.password) && <div><div className='text-danger text-center'>{errors.password}</div> <br></br> </div>}
                                            <Link to={routePaths.forget_password}>
                                                <div className='mt-3'>Forgot Password?</div>
                                            </Link>
                                            <Row className='mt-4 row justify-content-center align-items-center'>
                                                <Col></Col>
                                                <Col>
                                                    <Row className='justify-content-center'>
                                                        <Button className='btn btn-dark' type='submit'>Login</Button>
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
                        <Link to={routePaths.signup}>
                            <div className='text-center'>Do not have an account? Sign up</div>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LogIn