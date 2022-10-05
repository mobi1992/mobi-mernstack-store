import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { BrowserRouter as Router, Switch, Route, Link, useNavigate } from 'react-router-dom'
// import {apis} from '../../@services'
import { password_show_hide } from '../../@components/showHidePassword'
import { confirmPassword_show_hide } from '../../@components/showHideConfirmPassword'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { signUpUser } from '../../@actions/userActions/signup'
import { routePaths } from '../../@services/constants'

const initialValues = {
  firstName: '',
  lastName : '',
  email: '',
  password: '',
  confirmPassword: ''
}

const formValues = values => {
  console.log('Form data', values)
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('This Field is Required'),
  lastName: Yup.string().required('This Field is Required'),
  email: Yup.string().email('Invalid Email Format').required('This Field is Required'),
  password: Yup.string().min('8').required('Please enter a password with min 8 characters'),
  confirmPassword: Yup.string().required('Please confirm your password').oneOf([Yup.ref('password'), null], 'Passwords do not match'),
})


const SignUp = () => {

  // let refToButton = React.createRef()
    

    // const [imagesAdd, setImagesAdd] = useState(false)
    // const [image, setImage] = useState()
    // const selectImages = (e) => {
    //   const reader = new FileReader();

    //   reader.onload = () => {
    //     if (reader.readyState === 2) {
    //       // setAvatarPreview(reader.result);
    //       setImage(reader.result);
    //     }
    //   };
    //   reader.readAsDataURL(e.target.files[0]);
    //     setImagesAdd(true)
    // }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isAuthenticated, loading, error, userSignUp} = useSelector(state => state.userSignUp)
  const signupUser = ({firstName ,lastName, email, password}) => {
  //   const URL_images = images.slider_images.map(image => {
  //     return URL.createObjectURL(image)
  // })
  const formData = new FormData();
        // formData.append('avatar', image)
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)

        formData.append('email', email)
        formData.append('password', password)
        console.log('signup form', formData)
    dispatch(signUpUser(formData))
  }
  useEffect(() => {
    if (isAuthenticated) {
        navigate(routePaths.my_account)
        window.location.reload(false).scrollTo(0, 0)
    }
}, [isAuthenticated])
  return (
    <div style = {{backgroundColor : '#ffe6f0'}}>
    <Container style = {{height : '100vh'}}>
      <Row>
        <Col lg='4' md='6' className='mx-auto'>
          <Link to={routePaths.login}>
            <div className='mt-4 text-center'>Already have an account? Log in</div>
          </Link>
          
          <Card className='mt-3'>
            <Card.Body>
            {error && <p className='text-center text-danger'>{error}</p>}
              <h1 style={{ font: '900 4vh italic' }} className='mb-3'>Create An Account</h1>
              <Formik initialValues={initialValues}
                onSubmit={signupUser}
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

                    <Form.Group>
                      <label>Confirm Password</label>
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
                    {(errors.confirmPassword && touched.confirmPassword) && <div><div className='text-danger text-center'>{errors.confirmPassword}</div> <br></br> </div>}

                    {/* <Form.Group>
                      <label htmlFor='email'>Choose picture</label>
                      <input multiple type='file' accept="image/*" onChange={selectImages}/>
                    </Form.Group>
                    {(errors.email && touched.email) && <div> <div className='text-danger text-center'>{errors.email}</div> <br></br></div>} */}

                    
                    <Row className='mt-4 row justify-content-center align-items-center'>
                      <Col></Col>
                      <Col>
                        <Row className='justify-content-center'>
                          <Button className='btn btn-dark' type='submit'>SignUp</Button>
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
    </Container>
    </div>
  )
}

export default SignUp