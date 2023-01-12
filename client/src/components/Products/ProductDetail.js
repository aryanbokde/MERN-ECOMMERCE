import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { productDetail } from '../../Reducers/productReducer';
import { useSelector, useDispatch } from 'react-redux';
import './ProductDetail.css';
import ReactStars from "react-rating-stars-component";
import ReviewCard from './ReviewCard';
import MetaData from "../View/MetaData";
import Loader from '../View/Loading';

const ProductDetail = () => {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const { products, loading } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productDetail(productId));
        // eslint-disable-next-line
    },[productId]);
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "#ffd700",
        size: window.innerWidth < 600 ? 10 : 20,
        value: products.ratings,
        isHalf: true,
    };

  return (
    <div style={{ padding: "100px 0px", backgroundColor: "#eee" }}>
        {loading ? <Loader/> :
        <>
        <div className="container">
            <MetaData title={`${products.name} - ECOMMERCE`} />
            <div className='row'>
                <div className='col-md-5 corousel'> 
                    <Carousel>
                        { products.images && 
                            products.images.map((item, i) => (
                                <img src={item.url} alt={`${i} Slide`} key={item.url+i} className="CarouselImage" />
                            ))

                        }
                    </Carousel>
                </div>
                <div className='col-md-5'>
                    <div className='Block-1'>
                        <h2>{products.name}</h2>
                        <span>Product # {products._id}</span>
                    </div>
                    <div className='Block-2'>
                        <ReactStars {...options} />
                        <span className="detailsBlock-2-span">
                        {" "}
                        ({products.numOfReviews} Reviews)
                        </span>
                    </div>
                    <div className='Block-1'>
                        <h3>{`₹${products.price}`}</h3>
                        <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button >-</button>
                            <input readOnly type="number" value="1" />
                            <button>+</button>
                        </div>
                        </div>
                        <p>
                            Status: {""}
                            <b className={products.stock < 1 ? "redColor" : "greenColor"}>
                                {products.stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>
                    <div className="Block-1"> 
                        Description : <p>{products.description}</p>
                    </div>
                    <button className='submitReview btn btn-success'> Submit Review</button>
                    
                </div>
                <div className='col-md-2'>
                    <h5>Sidebar</h5>
                </div>
            </div>
        </div>
        <div className='container reviews' style={{ paddingTop: "100px"}}>
        <h3 className='reviewsHeading'>REVIEW</h3>
        {products.reviews && products.reviews[0] ? 
            <div className='row'>
                {products.reviews && products.reviews.map((review) => <ReviewCard review={review}/>)}
            </div> 
            :
            <p className='moReviews'>No Reviews Yet</p>
        }
        </div>
        </>
        }
    </div>
  )
}

export default ProductDetail
