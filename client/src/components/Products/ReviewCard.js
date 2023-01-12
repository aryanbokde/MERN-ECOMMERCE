import React from 'react';
import ReactStars from "react-rating-stars-component";
import profilePng from '../../images/Profile.png';

const ReviewCard = ({review}) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "#ffd700",
        size: window.innerWidth < 600 ? 10 : 20,
        value: review.rating,
        isHalf: true,
    };
  return (
    <div className='col-md-4 review-counter'>
        <div className="card w-100">
            <img src={profilePng} className="card-img-top" alt={review.name} style={{ width: "60px"}}/>
            <div className="card-body">
                <h5 className="card-title">{review.name}</h5>
                    <div className='review-body'>
                        <ReactStars {...options} />
                        <span>{review.comment}</span>
                    </div>
                    
                <p className="card-text">{review.comment}</p>
            </div>
        </div>
    </div>
  )
}

export default ReviewCard
