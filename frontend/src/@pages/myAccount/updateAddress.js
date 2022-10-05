import React, { useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import AccountLayout from '../../@components/accountLayout'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { routePaths } from '../../@services/constants'
import { updateUserAddress } from '../../@actions/userActions/updateAddress'
const UpdateTheAddress = ({ userDetails }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, success, error, updatedUserAddress } = useSelector(state => state.updatedUserAddress)
    const initialValues = {
        address: userDetails.user.address,
        city: userDetails.user.city,
        postalCode: userDetails.user.postalCode,
        province: userDetails.user.province,
        country: userDetails.user.country,
        phoneNo: userDetails.user.phoneNo
    }

    const validationSchema = Yup.object({
        address: Yup.string().required('This field is required'),
        city: Yup.string().required('This field is required'),
        postalCode: Yup.string().required('This field is required'),
        province: Yup.string().required('This field is required'),
        country: Yup.string().required('This field is required'),
        phoneNo: Yup.string().required('This field is required'),
    })

    useEffect(() => {
        if (success) {
            navigate(routePaths.my_account)
            window.location.reload(false).scrollTo(0, 0)
        }
    }, [success])

    const editAccountDetails = ({ country, province, city, address, postalCode, phoneNo }) => {
        dispatch(updateUserAddress({country, province, city, address, postalCode, phoneNo}))
    }
    return (
        <>
            <AccountLayout>
                <div className='account_details'>
                    <h1 style={{ font: '900 3vh italic' }} className='mb-3'>Edit Address</h1>
                    {error && <div className = 'text-center text-danger'>{error}</div>}
                    <Formik initialValues={initialValues}
                        onSubmit={editAccountDetails}
                        validationSchema={validationSchema}>
                        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <label htmlFor='address'>Address</label>
                                    <Form.Control type='text' id='address' name='address' value={values.address} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Group>
                                {(errors.address && touched.address) && <div className='text-danger text-center'>{errors.address}</div>}
                                <br></br>

                                <Form.Group>
                                    <label htmlFor='city'>City</label>
                                    <Form.Control type='text' id='city' name='city' value={values.city} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Group>
                                {(errors.city && touched.city) && <div className='text-danger text-center'>{errors.city}</div>}
                                <br></br>

                                <Form.Group>
                                    <label htmlFor='postalCode'>Postal Code</label>
                                    <Form.Control type='text' id='postalCode' name='postalCode' value={values.postalCode} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Group>
                                {(errors.postalCode && touched.postalCode) && <div className='text-danger text-center'>{errors.postalCode}</div>}
                                <br></br>

                                <Form.Group>
                                    <label htmlFor='province'>Province</label>
                                    <Form.Control type='text' id='province' name='province' value={values.province} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Group>
                                {(errors.province && touched.province) && <div className='text-danger text-center'>{errors.province}</div>}
                                <br></br>

                                <Form.Group>
                                    <label htmlFor='country'>Country</label>
                                    <Form.Control type='text' id='country' name='country' value={values.country} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Group>
                                {(errors.country && touched.country) && <div className='text-danger text-center'>{errors.country}</div>}
                                <br></br>

                                <Form.Group>
                                    <label htmlFor='phoneNo'>Phone Number</label>
                                    <Form.Control type='text' id='phoneNo' name='phoneNo' value={values.phoneNo} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Group>
                                {(errors.phoneNo && touched.phoneNo) && <div> <div className='text-danger text-center'>{errors.phoneNo}</div> <br></br></div>}

                                <div className='text-center mt-4 mb-4'>
                                    <Button type='submit' variant='dark'> Save  Changes </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    
                </div>
            </AccountLayout>
        </>
    )
}

export default UpdateTheAddress