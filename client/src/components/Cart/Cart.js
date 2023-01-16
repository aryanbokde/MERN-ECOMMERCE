import React from 'react';
import './Cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {removeFromCart, decreaseCart, increaseCart} from '../../Reducers/cartReducer';


const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    
    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem));
    }

    const handleDecreased = (product) => {
        dispatch(decreaseCart(product));
    }
    const handleIncreased = (product) => {
        dispatch(increaseCart(product))
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
                                <div className="ibox-content" key={item.product} data={item.product}>
                                    <div className="table-responsive">
                                        <table className="table shoping-cart-table">
                                           
                                            <tbody>
                                            <tr>
                                                <td width="90">
                                                    <div className="cart-product-imitation">
                                                        <img className='img-fluid' scr={item.image} alt={item.name}/>
                                                    </div>
                                                </td>
                                                <td className="desc">
                                                    <h3>
                                                    <Link to={`/product/${item.product}`} className="text-navy">
                                                        {item.name}
                                                    </Link>
                                                    </h3>
                                                    <dl className="small m-b-none">
                                                        <dt>Description lists</dt>
                                                        <dd>A description list is perfect for defining terms.</dd>
                                                    </dl>

                                                    <div className="m-t-sm">
                                                        <button onClick={() => handleRemoveFromCart(item) } className="text-muted"><i className="fa fa-trash"></i> Remove item</button>
                                                    </div>
                                                </td>

                                                <td>
                                                ₹{item.price}
                                                    <s className="small text-muted">₹230,00</s>
                                                </td>
                                                <td>
                                                    <div className='d-flex d-center'>
                                                    <button className='count' onClick={()=> handleDecreased(item)}>-</button>
                                                    <div className='count cart-num'>{item.quantity}</div>
                                                    <button className='count'onClick={()=> handleIncreased(item)}>+</button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h4>
                                                    ₹{item.price * item.quantity}
                                                    </h4>
                                                </td>
                                            </tr>
                                            </tbody>
                                           
                                        </table>
                                    </div>
                                </div>
                                )
                                
                            }
                            <div className="ibox-content">
                                <button className={`btn btn-primary pull-right ${cart.cartItems.length < 1 ? 'disabled' : ''}`}><i className="fa fa fa-shopping-cart"></i> Checkout</button>
                                <button className="btn btn-white"><i className="fa fa-arrow-left"></i> Continue shopping</button>
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
                                    <button className={`btn btn-primary btn-sm ${cart.cartItems.length < 1 ? 'disabled' : ''}`}><i className="fa fa-shopping-cart"></i> Checkout</button>
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
