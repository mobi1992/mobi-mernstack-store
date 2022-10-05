import { Send } from '@material-ui/icons'
import React, { useEffect } from 'react'
import './index.css'
import { InputGroup, FormControl, Button, Form } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { createNewLetter } from '../../@actions/newLetterActions/createNewsLetter'
const initialValues = {
    email: '',
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email Format').required('This Field is Required'),
})


const NewsLetter = () => {
    const dispatch = useDispatch()
    const { newsLetter, newsLetterSuccess, newsLetterError, newsLetterLoading } = useSelector(state => state.newsLetter)

    const saveTheUser = ({ email }) => {
        dispatch(createNewLetter({ email }))
    }

    useEffect(() => {
        if (newsLetterSuccess) {
            window.location.reload(false).scrollTo(0, 0)
        }
    }, [newsLetterSuccess])
    return (
        <>
            <div className='con newsletter-display-on-large-screens'>
                <h1 className='newsletter-heading-large-screens'>Newsletter</h1>
                <p className='newsletter-desc-large-screens'>Get timely updates from your favourite products.</p>
                <Formik initialValues={initialValues}
                    onSubmit={saveTheUser}
                    validationSchema={validationSchema}>
                    {({ handleSubmit, handleChange, handleBlur, errors, touched }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='d-flex align-items-end'>
                                <Form.Control name='email' type='email' id='email' placeholder='Enter Email' onChange={handleChange} onBlur={handleBlur}></Form.Control>
                                <Button variant='dark' type='submit'><Send /></Button>
                            </Form.Group>
                            {(errors.email && touched.email) && <div className='text-danger text-center mt-3 mb-3'>{errors.email}
                            </div>}
                            {newsLetterError && <div className = 'text-danger text-center mt-3 mb-3'>{newsLetterError}</div>}

                        </Form>
                    )}
                </Formik>
            </div>
            <div className='con newsletter-display-on-small-screens'>
                <h1 className='newsletter-heading-small-screens'>Newsletter</h1>
                <p className='newsletter-desc-small-screens'>Get timely updates from your favourite products.</p>
                <Formik initialValues={initialValues}
                    onSubmit={saveTheUser}
                    validationSchema={validationSchema}>
                    {({ handleSubmit, handleChange, handleBlur, errors, touched }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='d-flex align-items-end'>
                                <Form.Control name='email' type='email' id='email' placeholder='Enter Email' onChange={handleChange} onBlur={handleBlur}></Form.Control>
                                <Button variant='dark' type='submit'><Send /></Button>
                            </Form.Group>
                            {(errors.email && touched.email) && <div className='text-danger text-center mt-3 mb-3'>{errors.email}</div>}
                            {newsLetterError && <div className = 'text-danger text-center mt-3 mb-3'>{newsLetterError}</div>}
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default NewsLetter