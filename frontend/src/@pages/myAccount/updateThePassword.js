import React, {useState, useEffect} from 'react'
import AccountLayout from '../../@components/accountLayout'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { BrowserRouter as Router, Switch, Route, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import {oldPassword_show_hide} from '../../@components/showHideOldPassword'
import {newPassword_show_hide} from '../../@components/showHideNewPassword'
import { confirmPassword_show_hide } from '../../@components/showHideConfirmPassword'
import { routePaths } from '../../@services/constants'
import {updateUserPassword} from '../../@actions/userActions/updateUserPassword'
const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
}

const validationSchema = Yup.object({
    oldPassword: Yup.string().min('8').required('Please enter a password with min 8 characters'),
    newPassword: Yup.string().min('8').required('Please enter a password with min 8 characters'),
    confirmPassword: Yup.string().required('Please confirm your password').oneOf([Yup.ref('newPassword'), null], 'Passwords do not match'),
})
const UpdateThePassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, updatedPassword, error, isAuthenticated } = useSelector(state => state.updatedPassword)

    const updateTheUserPassword = ({oldPassword, newPassword, confirmPassword}) => {
        dispatch(updateUserPassword({oldPassword, newPassword, confirmPassword}))
    }
    useEffect(() => {
        if (isAuthenticated) {
            navigate(routePaths.my_account)
            window.location.reload(false).scrollTo(0, 0)
        }
    }, [isAuthenticated])

    return (
        <>
            <AccountLayout>
                <div className='account_details'>
                <h1 style={{ font: '900 3vh italic' }} className='mb-3'>Update Password</h1>
                    <Formik initialValues={initialValues}
                        onSubmit={updateTheUserPassword}
                        validationSchema={validationSchema}>
                        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <label>Old Password</label>
                                    <InputGroup>
                                        <Form.Control name="oldPassword" type="password" id="oldPassword" value={values.oldPassword} onChange={handleChange} onBlur={handleBlur} />
                                        <InputGroup.Text>
                                            <span onClick={oldPassword_show_hide}>
                                                <i className="fas fa-eye" id="show_eye3"></i>
                                                <i className="fas fa-eye-slash d-none" id="hide_eye3"></i>
                                            </span>
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                {(errors.oldPassword && touched.oldPassword) && <div className='text-danger text-center'>{errors.oldPassword}</div>}
                                <br></br>

                                <Form.Group>
                                    <label>New Password</label>
                                    <InputGroup>
                                        <Form.Control name="newPassword" type="password" id="newPassword" value={values.newPassword} onChange={handleChange} onBlur={handleBlur} />
                                        <InputGroup.Text>
                                            <span onClick={newPassword_show_hide}>
                                                <i className="fas fa-eye" id="show_eye4"></i>
                                                <i className="fas fa-eye-slash d-none" id="hide_eye4"></i>
                                            </span>
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                {(errors.newPassword && touched.newPassword) && <div className='text-danger text-center'>{errors.newPassword}</div>}
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
                                            <Button className='btn btn-dark' type='submit'>Update Password</Button>
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

export default UpdateThePassword