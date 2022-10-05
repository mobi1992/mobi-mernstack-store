import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import AccountLayout from '../../@components/accountLayout'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { routePaths } from '../../@services/constants'
import {forgetUserPassword} from '../../@actions/userActions/forgetUserPassword'

const initialValues = {
    email: '',
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email Format').required('This Field is Required'),
})
const ForgetThePassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, isAuthenticated, error, forgotPassword } = useSelector(state => state.forgotPassword)

    const forgetTheUserPassword = ({email}) => {
        dispatch(forgetUserPassword({email}))
    }
    return (
        <>
            <AccountLayout>
                <div className="account_details">
                <Formik initialValues={initialValues}
                        onSubmit={forgetTheUserPassword}
                        validationSchema={validationSchema}>
                        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <h1 style={{ font: '900 3vh italic' }} className='mb-3'>Forgot Password</h1>
                                {forgotPassword && <p className='text-success'>{forgotPassword.message}</p>}
                                {error && <p className = 'text-danger'>{error}</p>}
                                <Form.Group>
                                    <label htmlFor='email'>Enter your Email Id</label>
                                    <Form.Control type='text' id='email' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Group>
                                {(errors.email && touched.email) && <div> <div className='text-danger text-center'>{errors.email}</div> <br></br></div>}

                                <div className='text-center mt-4 mb-4'>
                                    <Button type='submit' variant='dark'> Send Email</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </AccountLayout>
        </>
    )
}

export default ForgetThePassword