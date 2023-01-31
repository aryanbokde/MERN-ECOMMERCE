import React, { useCallback, useEffect, useState } from 'react';
import './Payment.css';
import  CheckoutForm  from './PaymentSubComponent';
import { toast } from "react-toastify";
import MetaData from '../View/MetaData';
import CheckoutSteps from './CheckoutSteps';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Payment = () => {

  const [stripeApiKey, setStripeApiKey] = useState("");
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const history = useNavigate();

  const stripeApiKeyfun = useCallback(async() => {

    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);

    if (!shippingInfo.phoneNo) {
      toast.error(`Please complete shipping info before checkout`, {
        position: "bottom-center",
      });
      history('/shipping');
    } else if (cartItems.length === 0) {
      toast.error(`Your cart is empty`, {
        position: "bottom-center",
      });
      history('/cart');
    }
    
  },[shippingInfo, cartItems, history]);
  
  useEffect(() => {
    stripeApiKeyfun();    
    // eslint-disable-next-line
  }, [stripeApiKeyfun]);





  return (

    <div className='bg-p'>

      <MetaData title='Payment'/>
      <CheckoutSteps activeStep={2}/>

      {stripeApiKey && 
        <Elements stripe={loadStripe(stripeApiKey)}>
          <CheckoutForm />
        </Elements> 
      }          
      
    </div>

  );
};

export default Payment;
