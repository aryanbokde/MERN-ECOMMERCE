import React, { useState } from 'react';
import './Checkout.css';
import { toast } from "react-toastify";
import MetaData from '../View/MetaData';
import { useSelector } from 'react-redux';
import ConfirmItem from './ConfirmItem';
import { Country, State } from 'country-state-city';
import axios from 'axios';

const Checkout = () => {
  
  const { cartItems, cartTotalAmount} = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price, 0
  );
  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const totalPrice = subTotal + shippingCharges + tax;
  
  
  const proceedToPayment = async(e) =>{
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10 ) {
      toast.error(`Phone number should be 10 digit`, {
        position: "bottom-center",
      });
      return;
    }
    const shippingInfo = {
      "userId" : user._id,
      "name" : user.name,
      'email' : user.email,
      'phone' : phoneNo,
      "address" : `${address}, ${city}, ${state}, ${country} - ${pinCode}`,
      
    };    
    
    await axios.post("http://localhost:4000/api/v1/create-checkout-session", {
      shippingInfo, cartItems, shippingCharges, tax, totalPrice
    }).then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    }).catch((err) => console.log(err.message));

    
  }
 
  
  return (
    <div className="bg-p">
      <MetaData title="Checkout"/>
      
      <div className="container">
        <div className="py-5 text-center">
          <h2>Confirm Order</h2>
        </div>
        <form action='/create-checkout-session' onSubmit={proceedToPayment}>
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
                    <button type="submit" className="btn btn-secondary w-100">
                      Proceed To Payment
                    </button>
                </li>
                
              </ul>

            </div>

            <div className="col-md-8 order-md-1 shippingInfo">
              <h4 className="mb-3">Shipping Info</h4>
                <div className="mb-3">
                  <label>Name</label>
                  <input type="text" readOnly className="form-control" placeholder="1234 Main St" value={user.name}/>
                </div>
                <div className="mb-3">
                  <label>Address</label>
                  <input type="text" className="form-control" placeholder="1234 Main St" required onChange={(e)=>setAddress(e.target.value)} value={address}/>
                </div>

                <div className="mb-3">
                  <label>City</label>
                  <input type="text" className="form-control" value={city} placeholder="City" required onChange={(e)=>setCity(e.target.value)}/>
                </div>

                <div className="mb-3">
                  <label>Pin Code</label>
                  <input type="number" value={pinCode} className="form-control" placeholder="Pin Code" required onChange={(e)=>setPinCode(e.target.value)}/>
                </div>
                  
                  <div className="mb-3">
                    <label>Phone</label>
                    <input type="number" className="form-control" value={phoneNo} placeholder="Phone" required onChange={(e)=>setPhoneNo(e.target.value)}/>
                  </div>

                  <div className="mb-3">
                    <label>Country</label>
                    <select className="form-control custom-select d-block w-100" required value={country} onChange={(e)=>setCountry(e.target.value)}>
                        <option value="">Choose...</option>
                        {Country && 
                        Country.getAllCountries().map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                        ))
                    }                    
                    </select>
                  </div>

                  {country && 
                    <div className="mb-3">
                        <label>State</label>
                        <select className="form-control custom-select d-block w-100" required value={state} onChange={(e)=> setState(e.target.value)}>
                            <option value="">Choose...</option>
                            {State && 
                                State.getStatesOfCountry(country).map((item)=> (
                                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                ))
                            }                        
                        </select>
                    </div>
                  }
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
        </form>
      </div>
    </div>
  )
}

export default Checkout
