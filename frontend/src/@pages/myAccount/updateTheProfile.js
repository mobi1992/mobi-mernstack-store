import React, { useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import AccountLayout from '../../@components/accountLayout'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { routePaths } from '../../@services/constants'
import { updateUserProfile } from '../../@actions/userActions/updateUserProfile'
const UpdateTheProfile = ({ userDetails }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, isAuthenticated, error, updatedUser } = useSelector(state => state.updatedUser)
    const initialValues = {
        firstName: userDetails.user.firstName,
        lastName: userDetails.user.lastName,
        email: userDetails.user.email,
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().required('This field is required'),
        lastName: Yup.string().required('This field is required'),
        email: Yup.string().email('Invalid Email Format').required('This Field is Required'),
    })

    useEffect(() => {
        if (isAuthenticated) {
            navigate(routePaths.account_detail)
            window.location.reload(false).scrollTo(0, 0)
        }
    }, [isAuthenticated])

    const editAccountDetails = ({ firstName, lastName, email }) => {
        dispatch(updateUserProfile({ firstName, lastName, email }))
    }
    return (
        <>
            <AccountLayout>
                <div className='account_details'>
                    <h1 style={{ font: '900 3vh italic' }} className='mb-3'>Edit Account Details</h1>
                    <Formik initialValues={initialValues}
                        onSubmit={editAccountDetails}
                        validationSchema={validationSchema}>
                        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <label htmlFor='firstName'>First Name</label>
                                    <Form.Control type='text' id='firstName' name='firstName' value={values.firstName} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Group>
                                {(errors.firstName && touched.firstName) && <div> <div className='text-danger text-center'>{errors.firstName}</div> <br></br></div>}

                                <Form.Group>
                                    <label htmlFor='lastName'>Last Name</label>
                                    <Form.Control type='text' id='lastName' name='lastName' value={values.lastName} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Group>
                                {(errors.lastName && touched.lastName) && <div> <div className='text-danger text-center'>{errors.lastName}</div> <br></br></div>}
                                <Form.Group>
                                    <label htmlFor='email'>Email Address</label>
                                    <Form.Control type='text' id='email' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Group>
                                {(errors.email && touched.email) && <div> <div className='text-danger text-center'>{errors.email}</div> <br></br></div>}

                                <div className='text-center mt-4 mb-4'>
                                    <Button type='submit' variant='dark'> Save  Changes </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <Link to={routePaths.password_update} style={{ color: 'black', textDecoration: 'none' }}>
                        <div className='text-center mb-4'>
                            <Button variant='light'>Change Password</Button>
                        </div>
                    </Link>
                </div>
            </AccountLayout>
        </>
    )
}

export default UpdateTheProfile