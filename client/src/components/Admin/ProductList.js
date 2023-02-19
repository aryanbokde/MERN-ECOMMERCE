import React, { useEffect } from 'react';
import './ProductList.css';
import { getAdminProducts, deleteProduct } from '../../Reducers/productReducer';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import MetaData from '../View/MetaData';
import Loader from '../View/Loading';
import { Link } from 'react-router-dom';

const ProductList = () => {

  const { loading, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminProducts());
    // eslint-disable-next-line
  },[dispatch]);

  const deleteProductHandler = async(id) => {
    dispatch(deleteProduct(id));
    dispatch(getAdminProducts());      
  }

  const columns = [
    {field:"id", headerName:"Product Id", minWidth:250, flex:0.5},
    {
      field:"name",
      headerName:"Name",
      minWidth:300,
      flex:1
    },
    {
      field:"stock",
      headerName:"Stock",
      type:"number",
      minWidth:100,
      flex:0.3
    },
    {
      field:"price",
      headerName:"Price",
      type:"number",
      minWidth:100,
      flex:0.5
    },
    {
      field:"actions",
      headerName:"Actions",
      flex:0.5,
      minWidth:100,
      type:"number",
      sortable:false,
      renderCell: (params) => {
        return(
          <>
            <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}><EditIcon/></Link>
            <button className="btnIcon" onClick={() => deleteProductHandler(params.getValue(params.id, 'id'))}><DeleteIcon/></button>
          </>
        );
      },
    }

  ];

  const rows = [];

  Array.from(products).forEach(item => {
    rows.push({
      id:item._id,
      stock:item.stock,
      price:item.price,
      name:item.name,
    });
  });


  return (
    <>
    <MetaData title="All Products"/>
    <main className="d-flex flex-nowrap mainDashboard">    
        <Sidebar/>
        <div className='bg-p'>
          { loading ? <Loader/> :
          <div className='container-fluid productList'>
            <h2>All Products</h2>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
          </div>
          }
          
        </div>
    </main>
    </>
  )
}

export default ProductList
