import React, { useCallback, useEffect } from 'react';
import './OrderDetail.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getOrderDetail } from '../../Reducers/orderReducer';
import OrderDetailComponent from './OrderDetailComponent';
import Loader from '../View/Loading';

const OrderDetail = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const orderId = location.pathname.split('/')[2];
    const { loading, orders } = useSelector((state) => state.order);

    const getDetails = useCallback(() => {
        dispatch(getOrderDetail(orderId));
    },[dispatch, orderId]);

    useEffect(() => {
        getDetails();
        // eslint-disable-next-line
    },[getDetails]);

  
  return (
    <div className="bg-p">
        { loading ? <Loader/> :
            <div className='container'>
                <div className='row'>
                    <OrderDetailComponent order={orders}/>
                </div>
            </div>
        }             
    </div>
  )
}

export default OrderDetail



