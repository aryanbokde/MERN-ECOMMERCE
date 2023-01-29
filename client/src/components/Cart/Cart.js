import React, { useEffect } from 'react';
import './Cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import {clearCart, getTotals} from '../../Reducers/cartReducer';


const Cart = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    
    useEffect(() => {
        dispatch(getTotals());
    },[cart, dispatch]);

    
    const clearCardHandle = () => {
        dispatch(clearCart());
    }

    const checkOutHandler = () => {
        history('/login?redirect=shipping');
    }
    
  return (
    <div style={{ padding: "100px 0px", backgroundColor: "#eee" }}>
        <div className="container">
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-md-9">
                        <div className="ibox">
                            
                            <div className="ibox-title">
                                <span className="pull-right">(<strong>{cart.cartItems.length}</strong>) items</span>
                                <h5>Items in your cart</h5>
                            </div>
                            {cart.cartItems.length > 0 &&
                                cart.cartItems.map((item) => 
                                <CartItem item={item} key={item.product}/>
                                )                                
                            }
                            <div className="ibox-content">
                                <button className="btn mr-2 btn-white" style={{float: "left"}}><i className="fa fa-arrow-left"></i> Continue shopping</button>
                                <button onClick={()=>clearCardHandle()} className={`btn btn-primary mr-2 ${cart.cartItems.length < 1 ? 'disabled' : ''}`} style={{float: "right"}}><i className="fa fa-arrow-left"></i> Clear Cart</button>
                            </div>
                        </div> 

                    </div>
                    <div className="col-md-3">
                        <div className="ibox">
                            <div className="ibox-title">
                                <h5>Cart Summary</h5>
                            </div>
                            <div className="ibox-content">
                                <span>
                                    Total
                                </span>
                                <h2 className="font-bold">
                                    ₹{cart.cartTotalAmount}
                                </h2>

                                <hr/>
                                <span className="text-muted small">
                                    *For United States, France and Germany applicable sales tax will be applied
                                </span>
                                <div className="m-t-sm">
                                    <div className="btn-group">
                                    <button className={`btn btn-primary btn-sm ${cart.cartItems.length < 1 ? 'disabled' : ''}`} onClick={checkOutHandler}><i className="fa fa-shopping-cart"></i> Checkout</button>
                                    <button className="btn btn-white"><i className="fa fa-arrow-left"></i> Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ibox">
                            <div className="ibox-title">
                                <h5>Support</h5>
                            </div>
                            <div className="ibox-content text-center">
                                <h3><i className="fa fa-phone"></i> +43 100 783 001</h3>
                                <span className="small">
                                    Please contact with us if you have any questions. We are avalible 24h.
                                </span>
                            </div>
                        </div>

                        <div className="ibox">
                            <div className="ibox-content">

                                <p className="font-bold">
                                Other products you may be interested
                                </p>
                                <hr/>
                                <div>
                                    <Link to="/" className="product-name"> Product 1</Link>
                                    <div className="small m-t-xs">
                                        Many desktop publishing packages and web page editors now.
                                    </div>
                                    <div className="m-t text-righ">

                                        <Link to="/" className="btn btn-xs btn-outline btn-primary">Info <i className="fa fa-long-arrow-right"></i> </Link>
                                    </div>
                                </div>
                                <hr/>
                                <div>
                                    <Link to="/" className="product-name"> Product 2</Link>
                                    <div className="small m-t-xs">
                                        Many desktop publishing packages and web page editors now.
                                    </div>
                                    <div className="m-t text-righ">

                                        <Link to="/" className="btn btn-xs btn-outline btn-primary">Info <i className="fa fa-long-arrow-right"></i> </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart
