import React from 'react';
import './OrderSuccess.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    
  return (
    <div className='bg-p'>
        <div className='container text-center'>
            <CheckCircleIcon className='icon'/>
            <h2 className='sub-title'>Your Order Has Been Placed Successfully</h2>
            <Link to="/orders" className='btn primary-btn'>View Order</Link>
        </div>
      
    </div>
  )
}

export default OrderSuccess
