import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {removeFromCart, decreaseCart, increaseCart} from '../../Reducers/cartReducer';

const CartItem = ({item}) => {

    const dispatch = useDispatch();
    

    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item));
    }
    const handleDecreased = (item) => {
        dispatch(decreaseCart(item));
    }
    const handleIncreased = (item) => {
        dispatch(increaseCart(item));
    }

  return (
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
                                <button onClick={() => handleRemoveFromCart(item) } className="btn btn-primary"><i className="fa fa-trash"></i> Remove item</button>
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

export default CartItem
