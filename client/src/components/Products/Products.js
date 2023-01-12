import React, { useEffect, useState } from 'react';
import MetaData from '../View/MetaData';
import Loader from '../View/Loading';
import ProductCard from '../Home/ProductCard';
import { fetchAllProduct } from '../../Reducers/productReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Pagination from "react-js-pagination";
import './Products.css';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const categories = [
    "Music",
    "smartphones",
    "laptops",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes"
  ];

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading, productCount, resultPerPage, filteredProductCount} = useSelector((state) => state.product);
    const location = useLocation();
    let [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("");
    let keyword = location.pathname.split("/")[2] || '';
    const [price, setPrice] = useState([0, 25000]);
    const [ratings, setRatings] = useState(0);
    
    
    const setCurrentPageNo = async(e) => {
        setCurrentPage(e); 
    }

    const priceHandle = (event, newPrice) => {
        setPrice(newPrice);
    }

    useEffect(() => {        
        dispatch(fetchAllProduct({keyword, currentPage, price, category, ratings}));
        // eslint-disable-next-line
    },[keyword, currentPage, price, category, ratings]);

    let count = filteredProductCount;
    
  return (
    <>
    <MetaData title="Products - E-Commerce"/>
    <div style={{ padding: "50px 0px" }}>
        <div className="container">
        <div className="row">
            <div className="col-12">
                <h2 className="my-4">Products</h2>
            </div>
        </div>
        </div>
        <div className="container">
            <div className='row'>
                <div className='col-md-9'>
                { loading ? <Loader/> : 
                    <div className="row">
                    { products.length > 0  ? products.map((product) => <ProductCard  product={product} key={product._id}/>) :
                        <div>Product Not Found</div>
                    }          
                    </div>
                }
                    <div className='row'>
                        <nav aria-label="Page navigation example text-center">
                        {resultPerPage < count && 
                        <Pagination
                            activePage={currentPage}
                            totalItemsCount={productCount}
                            itemsCountPerPage={resultPerPage}                       
                            onChange={setCurrentPageNo}
                            nextPageText="Next"
                            prevPageText="Prev"
                            lastPageText="Last"
                            itemclassName='page-item'
                            linkclassName='page-link'
                            activeclassName='active'
                            activeLinkclassName='pageLinkActive'
                        />
                            
                        }
                        </nav>
                        
                        
                    </div>
                </div>
                <div className='col-md-3'>
                    <h3>Product Filter</h3>                    
                    <div className='w-100 filter priceFilter'>
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandle}
                            size="small"
                            valueLabelDisplay="auto"
                            aria-labelledby='range-slider'
                            min={0}
                            max={25000}
                        />
                    </div>
                    <div className='w-100 filter ratingFilter'>
                        <Typography>Ratings Above</Typography>
                        <Slider
                            value={ratings}
                            onChange={(e, newRating) => {setRatings(newRating)}}
                            aria-label="continuous-slider"
                            min={0}
                            max={5}
                            valueLabelDisplay="auto"
                        />
                    </div>
                    <div className='w-100 filter categoryFilter'>
                        <Typography>Category</Typography>
                        <ul className="list-group-item">
                            {
                                categories.map((category)=>(
                                    <li 
                                    className="list-group-item"
                                    key={category}
                                    onClick={()=>setCategory(category)}
                                    >{category}</li>
                                ))
                            }
                            
                        </ul>
                    </div>
                    
                </div>
            </div>
            
           
        </div>
    </div>
    </>
  )
}

export default Products
