import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { BrowserRouter as Router, Switch, Route, Link, useNavigate } from 'react-router-dom'
import { Container, Col, Row, Card, Form, InputGroup, Button } from 'react-bootstrap'
import './index.css'
import { routePaths } from '../../@services/constants'

let initialValues = {
    firstName: '',
    lastName: '',
    country: 'Pakistan',
    province: 'Punjab',
    email: '',
    city: '',
    address: '',
    postalCode: '',
    phoneNo: ''
}

const validationSchema = Yup.object({
    firstName: Yup.string().required('This Field is Required'),
    lastName: Yup.string().required('This Field is Required'),
    email: Yup.string().email('Invalid Email Format').required('This Field is Required'),
    province: Yup.string().required('Please select your province'),
    city: Yup.string().required('This Field is Required'),
    address: Yup.string().required('This Field is Required'),
    postalCode: Yup.string().required('This Field is Required'),
    phoneNo: Yup.string().required('This Field is Required'),
})

const Information = ({ setContactInfo, nextStep }) => {
    const [submitted, setSubmitted] = useState(false)
    const [shippingCountry, setShippingCountry] = useState('Pakistan')
    const [shippingProvince, setShippingProvince] = useState('')
    const provinces = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Gilgit Baltistan', 'Azad Kashmir']
    const handleClick = () => {
        setSubmitted(true)
    }

    const handleTheSubmit = ({ email, firstName, lastName, country, province, city, address, postalCode, phoneNo }) => {
        setContactInfo({email, firstName, lastName, country, province, city, address, postalCode, phoneNo })
        nextStep()
    }

    return (
        <Row style={{ marginLeft: '3vw' }}>
            <div className='checkout-display-on-large-screens mb-3'>
                <Row>
                    <Col style={{ fontSize: 'large', fontWeight: 'bold' }}>Contact Information</Col>
                    <Col>
                        <Row as = {Link} to = {routePaths.login} className='justify-content-right' style = {{cursor : 'default', color : 'black', textDecoration : 'none'}}>Already have an account?Log in</Row>
                    </Col>
                </Row>
            </div>
            <div style={{ marginLeft: '12px' }} className='checkout-display-on-small-screens mb-3'>
                <Row>
                    <Col>
                        <Row style={{ fontSize: 'large', fontWeight: 'bold' }}>
                            Contact Information
                        </Row>
                        <Row as = {Link} to = {routePaths.login} className='justify-content-right' style = {{cursor : 'default', color : 'black', textDecoration : 'none'}} >Already have an account?Log in</Row>
                    </Col>
                </Row>
            </div>
            <Col>
                {/* <Card className='border-0'>
        <Card.Body> */}
                <Formik initialValues={initialValues}
                    onSubmit={handleTheSubmit}
                    validationSchema={validationSchema}>
                    {({ handleSubmit, handleChange, errors, values }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-3'>
                                <Form.Control value = {values.email} type='text' id='email' name='email' placeholder='Email Address' onChange={handleChange} />
                            </Form.Group>
                            {(submitted && errors.email) && <div> <div className='text-danger text-center'>{errors.email}</div> <br></br></div>}

                            <div style={{ fontSize: 'large', fontWeight: 'bold' }}>Shipping Address</div>
                            <Form.Group className='mb-3 mt-3'>
                                <Form.Control value = {values.firstName} type='text' id='firstName' name='firstName' placeholder='First Name' onChange={handleChange} />
                            </Form.Group>
                            {(submitted && errors.firstName) && <div> <div className='text-danger text-center'>{errors.firstName}</div> <br></br></div>}

                            <Form.Group className='mb-3'>
                                <Form.Control type='text' value = {values.lastName} id='lastName' name='lastName' placeholder='Last Name' onChange={handleChange} />
                            </Form.Group>
                            {(submitted && errors.lastName) && <div> <div className='text-danger text-center'>{errors.lastName}</div> <br></br></div>}

                            <Form.Group className='mb-3'>
                                <Form.Select value = {shippingCountry} >

                                    <option>{shippingCountry}</option>

                                </Form.Select>
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Select value = {values.province} id = 'province' name = 'province' onChange={handleChange} >

                                    {provinces.map(province => (
                                        <option>{province}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>



                            <Form.Group className='mb-3'>
                                <Form.Control value = {values.city} type='text' id='city' name='city' placeholder='City' onChange={handleChange} />
                            </Form.Group>
                            {(submitted && errors.city) && <div> <div className='text-danger text-center'>{errors.city}</div> <br></br></div>}

                            <Form.Group className='mb-3'>
                                <Form.Control value = {values.address} type='text' id='address' name='address' placeholder='Address' onChange={handleChange} />
                            </Form.Group>
                            {(submitted && errors.address) && <div> <div className='text-danger text-center'>{errors.address}</div> <br></br></div>}

                            <Form.Group className='mb-3'>
                                <Form.Control type='text' value = {values.postalCode} id='postalCode' name='postalCode' placeholder='Postal Code' onChange={handleChange} />
                            </Form.Group>
                            {(submitted && errors.postalCode) && <div> <div className='text-danger text-center'>{errors.postalCode}</div> <br></br></div>}

                            <Form.Group className='mb-3'>
                                <Form.Control type='text' value = {values.phoneNo} id='phoneNo' name='phoneNo' placeholder='Phone' onChange={handleChange} />
                            </Form.Group>
                            {(submitted && errors.phoneNo) && <div> <div className='text-danger text-center'>{errors.phoneNo}</div> <br></br></div>}

                            <div className='mt-4' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant='light' as={Link} to={routePaths.mainCart}>Back To Cart</Button>
                                <Button onClick={handleClick} variant='dark' type='submit'>Next</Button>
                            </div>

                        </Form>
                    )}
                </Formik>
                {/* </Card.Body>
      </Card> */}
            </Col>
        </Row>
    )
}

export default Information



















