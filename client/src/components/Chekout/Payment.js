import React, { useCallback, useEffect, useState } from 'react';
import './Payment.css';
import  CheckoutForm  from './PaymentSubComponent';

import MetaData from '../View/MetaData';
import CheckoutSteps from './CheckoutSteps';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';


const Payment = () => {

  const [stripeApiKey, setStripeApiKey] = useState("");
  const stripeApiKeyfun = useCallback(async() => {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  },[]);
  

  useEffect(() => {
    stripeApiKeyfun();    
    // eslint-disable-next-line
  }, [stripeApiKeyfun]);
  console.log(stripeApiKey);
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
