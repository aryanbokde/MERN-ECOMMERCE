import './Shipping.css';
import { toast } from "react-toastify";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Country, State } from 'country-state-city';
import MetaData from '../View/MetaData';
import CheckoutSteps from './CheckoutSteps';
import {saveShippingInfo} from '../../Reducers/cartReducer';


const Shipping = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { cartItems, shippingInfo } = useSelector((state) => state.cart);
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
      e.preventDefault();
      if (phoneNo.length < 10 || phoneNo.length > 10 ) {
        toast.error(`Phone number should be 10 digit`, {
          position: "bottom-center",
        });
        return;
      }
      dispatch(saveShippingInfo({
        address, city, state, country, pinCode, phoneNo
      }));
      history('/order/confirm');

    }

    const checkCartItem = useCallback(() => {
      if (cartItems.length === 0) {
        toast.error(`Your cart is empty`, {
          position: "bottom-center",
        });
        history('/cart');
      }
    },[cartItems, history]);

    useEffect(() => {
      checkCartItem();
      // eslint-disable-next-line
    },[checkCartItem]);
  return (
    <div className="bg-p">
        <MetaData title="Shipping Details"/>
        <CheckoutSteps activeStep={0}/>
      <div className="container needs-validation">
        <div className="py-5 text-center">
          <h2>Shipping Details</h2>
        </div>

        <div className="row">
          
          <div className="col-md-12 order-md-1">
            <form className="needs-validation" onSubmit={shippingSubmit}>

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

              <button className="btn btn-primary btn-lg btn-block" type="submit">
                Continue
              </button>
            </form>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Shipping;
