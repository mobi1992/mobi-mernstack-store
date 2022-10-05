import React from 'react'
import ReactStars from 'react-rating-stars-component'
import './index.css'
import aloervera_soap from '../../@assets/images/Aloevera_Soap.jpeg'

const ReviewCard = ({product, review}) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value : review.rating,
        size: window.innerWidth < 600 ? 20 : 25,
        isHalf: true
    }
  return (
    <div className='reviewCard'>
        <p>{review.name}</p>
        <img src = {aloervera_soap} />
        <p>{product.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard