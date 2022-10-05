import React, {useState} from 'react'
import { Card, Row, Col, Form, Button} from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import ReactStars from 'react-rating-stars-component'
import {useDispatch, useSelector} from 'react-redux'
import { productReviewsUnknownUser } from '../../@actions/productActions/productReviewUnknownUser'
let initialValues = {
    name : '',
    comment: '',
}

const validationSchema = Yup.object({
    name: Yup.string().required('This field is required'),
    comment: Yup.string().required('Please write the review')
})
const AddReviewUnknownUser = ({ productId }) => {
    const dispatch = useDispatch()
    const {loading, error, reviewsUnknownUser} = useSelector(state => state.reviewsUnknownUser)
    // in formik, I am unable to apply handleChange to react star component, so that's why I made a state variable for rating and error and customized it
    const [rating, setRating] = useState(0)
    const [ratingError, setRatingError] = useState(false)
    const options = {
        edit: true,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: 18,
        isHalf: true
    }
const handleRatingsChange = (newRating) => {
    console.log(typeof(newRating))
    setRatingError(false)
    setRating(newRating)
}
    const addReview = async ({name, comment }) => {
        // if no rating is given, return without submitting
        if (rating === 0) {
            setRatingError(true)
            return 
        }

        console.log('the comment is : ', comment, rating)
        await dispatch(productReviewsUnknownUser(name, productId, comment, rating))
        window.location.reload(false).scrollTo(0, 0)
    }
    return (
        <>
           
                <Row className='justify-content-center align-items-center'>
                    <Col lg='6' md='8' sm='10'>
                        <Card>
                            <Card.Body>
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={addReview}
                                    validationSchema={validationSchema}>
                                    {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group>
                                                <label htmlFor='name'>Your name</label>
                                                <Form.Control type='text' id='name' name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                            </Form.Group>
                                            {(errors.name && touched.name) && <div> <div className='text-danger text-center'>{errors.name}</div> <br></br></div>}

                                            <Form.Group>
                                                <label htmlFor='rating'>Rating</label>
                                                <ReactStars className = 'form-control' {...options} value = {rating} onChange={handleRatingsChange}/>
                                            </Form.Group>
                                            {ratingError && <div> <div className='text-danger'>This field is required</div> <br></br></div>}
                                            
                                            <Form.Group>
                                                <label htmlFor='comment'>How was your experience?</label>
                                                <textarea className='form-control' rows = '4' type='text' id='comment' name='comment' value={values.comment} onChange={handleChange} onBlur={handleBlur} />
                                            </Form.Group>
                                            {(errors.comment && touched.comment) && <div> <div className='text-danger text-center'>{errors.comment}</div> <br></br></div>}

                                            <Row className='mt-4 row justify-content-center align-items-center'>
                                                <Col></Col>
                                                <Col lg = '4' md = '6' sm = '6' xs = '6'>
                                                    <Row className='justify-content-center'>
                                                        <Button className='btn btn-dark' type='submit'>Submit review</Button>
                                                    </Row>
                                                </Col>
                                                <Col></Col>
                                            </Row>
                                        </Form>
                                    )}
                                </Formik>
                                {reviewsUnknownUser && <div className = 'text-center text-success mt-3'>{reviewsUnknownUser.message}</div>}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
              
           
        </>
    )
}

export default AddReviewUnknownUser