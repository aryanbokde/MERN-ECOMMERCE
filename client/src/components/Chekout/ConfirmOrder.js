import React from 'react';
import { useSelector } from 'react-redux';
import './ConfirmOrder.css';
import MetaData from '../View/MetaData';
import CheckoutSteps from './CheckoutSteps';
import ConfirmItem from './ConfirmItem';
import { useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {
  const history = useNavigate();
  const { cartItems, cartTotalAmount, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price, 0
  );
  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const totalPrice = subTotal + shippingCharges + tax;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subTotal,
      shippingCharges,
      tax,
      totalPrice
    }
    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    history('/process/payment')
  }

  return (
    <div className="bg-p">
        <MetaData title="Order Confirm"/>
        <CheckoutSteps activeStep={1}/>
      <div className="container">
        <div className="py-5 text-center">
          <h2>Confirm Order</h2>
        </div>

        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Order Summary</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-condensed pt-3 pb-3">
                <div>
                  <h6 className="my-0">SubTotal:</h6>
                </div>
                <strong>₹{subTotal}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed pt-3 pb-3">
                <div>
                  <h6 className="my-0">Shipping Charges:</h6>
                </div>
                <strong>₹{shippingCharges}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed pt-3 pb-3">
                <div>
                  <h6 className="my-0">GST:</h6>
                </div>
                <strong>₹{tax}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed pt-3 pb-3">
                <div>
                  <h6 className="my-0">Total:</h6>
                </div>
                <strong>₹{totalPrice}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed">
              <button type="submit" className="btn btn-secondary w-100" onClick={proceedToPayment}>
                    Proceed To Payment
                  </button>
              </li>
              
            </ul>

          </div>
          <div className="col-md-8 order-md-1 shippingInfo">
            <h4 className="mb-3">Shipping Info</h4>
            <div className='mb-3'>
                <p><strong>Name : </strong> {user.name}</p>
            </div>
            <div className='mb-3'>
            <p><strong>Phone No. : </strong> {shippingInfo.phoneNo}</p>
            </div>
            <div className='mb-3'>
                <p><strong>Address : </strong> {address}</p>
            </div>
            <h4 className="mb-3">Cart Items</h4>
            
            {cartItems.length > 0 &&
              <ul className="list-group mb-3">
                  {cartItems.map((item) =>                 
                    <ConfirmItem item={item} key={item.product}/>                   
                  )}
                <li className="list-group-item d-flex justify-content-between bg-light pt-3 pb-3">
                <div className="">
                  <h5 className="my-0">SubTotal:</h5>
                </div>
                <h5 className="my-0">₹{cartTotalAmount}</h5>
              </li>
              </ul>                    
            }
            
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default ConfirmOrder
