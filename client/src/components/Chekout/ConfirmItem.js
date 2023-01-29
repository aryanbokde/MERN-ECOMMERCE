import React from 'react';

const ConfirmItem = ({item}) => {
   
  return (
    
        <li className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
            <h6 className="my-0">{item.name}</h6>
            <small className="text-muted">Brief description</small><br/>
            <small className="text-muted">Qty {item.quantity} * Price {`₹ ${item.price}`}</small>
        </div>
        <span className="text-muted">{`₹ ${item.quantity * item.price}`}</span>
        </li>
        
  )
}

export default ConfirmItem
