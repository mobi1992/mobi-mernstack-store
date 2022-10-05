import React, {useState, useEffect} from 'react'
import AccountLayout from '../../@components/accountLayout'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { BrowserRouter as Router, Switch, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import {password_show_hide} from '../../@components/showHidePassword'
import { confirmPassword_show_hide } from '../../@components/showHideConfirmPassword'
import { routePaths } from '../../@services/constants'
import {updateUserPassword} from '../../@actions/userActions/updateUserPassword'
import { resetUserPassword } from '../../@actions/userActions/resetUserPassword'
const initialValues = {
    password: '',
    confirmPassword: ''
}

const validationSchema = Yup.object({
    password: Yup.string().min('8').required('Please enter a password with min 8 characters'),
    confirmPassword: Yup.string().required('Please confirm your password').oneOf([Yup.ref('password'), null], 'Passwords do not match'),
})

const ResetThePassword = () => {
  const {token} = useParams()
  console.log(token) 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, resetPassword, error, isAuthenticated } = useSelector(state => state.resetPassword)

  const resetTheUserPassword = ({password, confirmPassword}) => {
      dispatch(resetUserPassword(token, {password, confirmPassword}))
  }
  useEffect(() => {
      if (isAuthenticated) {
          navigate(routePaths.login)
          window.location.reload(false).scrollTo(0, 0)
      }
  }, [isAuthenticated])

  return (
    <>
            <AccountLayout>
                <div className='account_details'>
                <h1 style={{ font: '900 3vh italic' }} className='mb-3'>Reset Password</h1>
                    <Formik initialValues={initialValues}
                        onSubmit={resetTheUserPassword}
                        validationSchema={validationSchema}>
                        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                {resetPassword && <p className='text-success'>{resetPassword.message}</p>}
                                {error && <p className = 'text-danger'>{error}</p>}
                                <Form.Group>
                                    <label>New Password</label>
                                    <InputGroup>
                                        <Form.Control name="password" type="password" id="password" value={values.newPassword} onChange={handleChange} onBlur={handleBlur} />
                                        <InputGroup.Text>
                                            <span onClick={password_show_hide}>
                                                <i className="fas fa-eye" id="show_eye"></i>
                                                <i className="fas fa-eye-slash d-none" id="hide_eye"></i>
                                            </span>
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                {(errors.password && touched.password) && <div className='text-danger text-center'>{errors.password}</div>}
                                <br></br>

                                <Form.Group>
                                    <label>Confirm New Password</label>
                                    <InputGroup>
                                        <Form.Control name="confirmPassword" type="password" id="confirmPassword" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
                                        <InputGroup.Text>
                                            <span onClick={confirmPassword_show_hide}>
                                                <i className="fas fa-eye" id="show_eye2"></i>
                                                <i className="fas fa-eye-slash d-none" id="hide_eye2"></i>
                                            </span>
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                {(errors.confirmPassword && touched.confirmPassword) && <div className='text-danger text-center'>{errors.confirmPassword}</div>}

                                <Row className='mt-4 row justify-content-center align-items-center'>
                                    <Col></Col>
                                    <Col>
                                        <Row className='justify-content-center'>
                                            <Button className='btn btn-dark' type='submit'>Save</Button>
                                        </Row>
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </div>
            </AccountLayout>
        </>
  )
}

export default ResetThePassword