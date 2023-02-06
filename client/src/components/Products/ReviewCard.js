import React from 'react';
import Rating from '@mui/material/Rating';
import profilePng from '../../images/Profile.png';

const ReviewCard = ({review}) => {

    const options = {
        readOnly: true,        
        size:"medium",
        value: review.rating,
        precision: 0.5,
    };

  return (
    <div className='col-md-4 review-counter'>
        <div className="card w-100">
            <img src={profilePng} className="card-img-top" alt={review.name} style={{ width: "60px"}}/>
            <div className="card-body">
                <h5 className="card-title">{review.name}</h5>
                    <div className='review-body'>
                        <Rating {...options} />
                        <p>{review.comment}</p>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default ReviewCard
