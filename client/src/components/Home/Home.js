import React from 'react';
import Loader from '../View/Loading';
import MetaData from "../View/MetaData";
import ProductCard from './ProductCard';
import { fetchAllProduct } from '../../Reducers/productReducer';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";

const Home = () => {

    const dispatch = useDispatch();
    const { loading, products } = useSelector((state) => state.product);
    
    useEffect(() => {
      dispatch(fetchAllProduct());
      // eslint-disable-next-line
    }, []);
  
  return (
    <>
    <MetaData title="E-Commerce" />
    <div style={{ padding: "50px 0px" }}>
        <div className="container">
        <div className="row">
            <div className="col-12">
                <h2 className="my-4">Lastest Product</h2>
            </div>
        </div>
        </div>
        <div className="container">
            { loading ? <Loader></Loader> : 
                <div className="row">
                { products.length > 1  && products.map((product) => <ProductCard  product={product} key={product._id}/>) }          
                </div>
            }
                    
        </div>
    </div>
    </>
  )
}

export default Home
