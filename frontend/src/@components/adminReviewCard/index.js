import React, {useEffect, useState} from 'react'
import ReactStars from 'react-rating-stars-component'
import './index.css'
import aloervera_soap from '../../@assets/images/Aloevera_Soap.jpeg'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { adminDeleteProductReview } from '../../@actions/productActions/adminDeleteRroductReview'

const AdminReviewCard = ({ product, review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: review.rating,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true
  }
  const dispatch = useDispatch()
  const {deletedProductReview, deletedProductReviewSuccess, deletedProductReviewError} = useSelector(state => state.deletedProductReview)
  const [show, setShow] = useState(false);
  const id = product._id
  const reviewId = review._id
  const deleteTheReview = () => {
    dispatch(adminDeleteProductReview(id, reviewId))
  }
  useEffect(() => {
    if(deletedProductReviewSuccess) {
      window.location.reload(false).scrollTo(0, 0)
    }
  }, [deletedProductReviewSuccess])

  return (
    <div className='reviewCard'>
      <p>{review.name}</p>
      <img src={aloervera_soap} />
      <p>{product.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
      <br></br>
      <Button onClick = {() => setShow(true)} variant='danger' style={{ fontWeight: 'bolder' }}>Delete Review</Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delele Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want to delete this review, Remember that it cannot be undone!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteTheReview}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {deletedProductReviewError && <div className = 'mt-3 text-danger'>{deletedProductReviewError}
      </div>}
    </div>
  )
}

export default AdminReviewCard