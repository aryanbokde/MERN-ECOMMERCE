import React, { useCallback, useEffect } from 'react';
import './MyOrders.css';
import LaunchIcon from '@mui/icons-material/Launch';
import { DataGrid } from '@mui/x-data-grid';
import MetaData from '../View/MetaData';
import Loader from '../View/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders } from '../../Reducers/orderReducer';
import { Link } from 'react-router-dom';

const MyOrders = () => {

    const dispatch = useDispatch();
    const { loading, orders } = useSelector((state) => state.order);

    const getAllOrders = useCallback(() => {
        dispatch(myOrders());
    },[dispatch]);   
    
    const rows = [];
   
    Array.from(orders).forEach(item => {
            rows.push({
            itemQty: item.orderItems.length,
            id: item._id,
            status:item.orderStatus,
            amount: item.totalPrice,
        });
      });
  
    const columns = [
        { field: 'id', headerName: 'Order ID', minWidth:300, flex: 1 },
        { 
            field: 'status', 
            headerName: 'Status', 
            minWidth:150, 
            flex: 0.5, 
            cellClassName:(params) => {
                return params.getValue(params.id, 'status') === "Delivered" 
                ? "greenColor" : "redColor";
            } 
        },
        { field: 'itemQty', headerName: 'Item Qty', type: 'number', minWidth:150, flex: 0.3 },
        { field: 'amount', headerName: 'Amount', type: 'number', minWidth:270, flex: 0.5 },
        { 
            field: 'action', 
            headerName: 'Actions', 
            type: 'number', 
            flex: 0.5, 
            sortable:false,
            renderCell: (params) => {
                return(
                    <Link to={`/order/${params.getValue(params.id, 'id')}`}><LaunchIcon/></Link>
                );
            },
        },
    ];
    
    useEffect(() => {
        getAllOrders();
        // eslint-disable-next-line
    },[getAllOrders]);

  return (
    <div className='bg-p'>
        <MetaData title="My Orders"/>
        <div className='container'>
            <div className='row'>
                <div className='col-12 text-center'>
                    <h2 className='mb-4'>My Orders</h2>
                    {loading ? <Loader/> : 
                    <DataGrid
                        rows={rows} 
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        className="myOrders"
                        autoHeight
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                    }                    
                </div>
            </div>
        </div>    
            
    </div>
  )
}

export default MyOrders
