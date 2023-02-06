import React from 'react';
import './OrderDetail.css';
import ConfirmItem from '../Chekout/ConfirmItem';

const OrderDetailComponent = ({order}) => {

    const { orderItems, shippingInfo, paymentInfo, user, totalPrice } = order;    

    return (
    <div className='col-8'>
        <div className='orderInfo'>
            <h4>{order && `OderId #${order._id}`}</h4>
            <h5 className="mb-3">Shipping Info</h5>
            <div className='mb-3'>
                <p><strong>Name : </strong> {user && user.name}</p>
            </div>
            <div className='mb-3'>
                <p><strong>Email : </strong> {user && user.email}</p>
            </div>
            <div className='mb-3'>
            <p><strong>Phone No. : </strong> {shippingInfo && shippingInfo.phoneNo}</p>
            </div>
            <div className='mb-3'>
                <p><strong>Address : </strong> {shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country} - ${shippingInfo.pinCode}`}</p>
            </div>
        </div>

        <div className='orderInfo'>
            <h5 className="mb-3">Payment Info</h5>
            <div className='mb-3'>
                <strong 
                className={
                    paymentInfo && paymentInfo.status === "succeeded" 
                    ? "greenColor" : "redColor"
                }
                >
                {
                    paymentInfo && paymentInfo.status === "succeeded" 
                    ? "PAID" : "NOT PAID"
                }
                </strong>
            </div>
            <div className='mb-3'>
            <p><strong>Amount : </strong> {totalPrice && `₹ ${totalPrice}`}</p>
            </div>
        </div>

        <div className='orderInfo'>
            <h5 className="mb-3">Order Status</h5>
            <div className='mb-3'>
                <p><strong className={
                    order.orderStatus && order.orderStatus === "Delivered" 
                    ? "greenColor" : "redColor"
                }>{order.orderStatus && order.orderStatus}</strong></p>
            </div>
        </div>

        <div className='orderInfo'>
            <h5 className="mb-3">Order Items</h5>
            {orderItems &&
              <ul className="list-group mb-3">
                  {orderItems.map((item) =>                 
                    <ConfirmItem item={item} key={item.product}/>                   
                  )}                
              </ul>                    
            }           
        </div>

    </div>
  )
}

export default OrderDetailComponent
