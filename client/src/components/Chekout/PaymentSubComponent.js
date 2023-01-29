import React, { useRef } from 'react';
import './Payment.css';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// import {
//   CartNumberElement,
//   CartCvcElement,
//   CartExpiryElement,
//   CardElement,
//   Elements,
//   useStripe,
//   useElements,
// } from '@stripe/react-stripe-js';
import axios from 'axios';


const CheckoutForm = () => {

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef();
  const { shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const paymentData = {
    amount:Math.round(orderInfo.totalPrice)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers:{
          "Content-type": "application/json",
        }
      };
      const {data} = await axios.post(
        '/api/v1/payment/process',
        paymentData,
        config
      );

      const client_secret = data.client_secret;
      if ( !elements || !stripe ) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method:{
          card: elements.getElement(CardElement),
          billing_details: {
            name:user.name,
            email:user.email,
            address:{
              line1:shippingInfo.address,
              city:shippingInfo.city,
              state:shippingInfo.state,
              postal_code:shippingInfo.pinCode,
              country:shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);        
      }else{
        if (result.paymentIntent.status === "succeeded") {
          // window.location.reload();
          console.log(result.paymentIntent.status);
        } else {
          toast.error("There's some issue while processing payment");
        }
      }

    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error);
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className='paymentForm'>
      <>
      <CardElement className='paymentForm'/>
      <button type="submit" disabled={!stripe || !elements} ref={payBtn}>
        {`Pay - ${orderInfo && orderInfo.totalPrice}`}
      </button>
      </>
    </form>
  );
};





export default CheckoutForm;