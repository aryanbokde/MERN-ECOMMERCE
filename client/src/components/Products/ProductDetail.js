import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {toast} from 'react-toastify';
import Carousel from 'react-material-ui-carousel';
import { productDetail, createReview } from '../../Reducers/productReducer';
import { addToCart } from '../../Reducers/cartReducer';
import { useSelector, useDispatch } from 'react-redux';
import './ProductDetail.css';
import ReviewCard from './ReviewCard';
import MetaData from "../View/MetaData";
import Loader from '../View/Loading';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';


const ProductDetail = () => {

    const location = useLocation();
    const ref = React.createRef();
    const dispatch = useDispatch();

    const productId = location.pathname.split("/")[2];
    const { products, loading } = useSelector((state) => state.product);

    const options = {
        readOnly: true,        
        size:"medium",
        value: products.ratings,
        precision: 0.5,
    };
        
    // Cart related code
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {        
        if(products.stock <= quantity) {
            return
        }
        const qty = quantity + 1;
        setQuantity(qty);
    }
    const decreaseQuantity = () => {
        if(1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    }
    const addToCartHandle = async(e) => {  
        e.preventDefault();
        dispatch(addToCart({products, quantity}));
    }
    
    const singleProductDetail = useCallback(() => {
        if (productId) {
            dispatch(productDetail(productId));
        }
    },[productId, dispatch]);

    useEffect(() => {
        singleProductDetail();
        // eslint-disable-next-line
    },[singleProductDetail]);

    const submitReviewToggle = (e) => {
        open ? setOpen(false) : setOpen(true);
    }

    const reviewSubmitHandler = () => {
        if (!comment) {
            toast.error("Please enter comment");
            return;
        }
        if (!rating) {
            toast.error("Rating field not be emplty");
            return;
        }
        const data = {
            rating,
            comment,
            productId
        }
        dispatch(createReview(data));
        setOpen(false);
    }
    
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
                        <Rating {...options} />
                        <span className="detailsBlock-2-span">
                        {" "}
                        ({products.numOfReviews} Reviews)
                        </span>
                    </div>
                    <div className='Block-1'>
                        <h3>{`₹${products.price}`}</h3>
                        <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button onClick={decreaseQuantity}>-</button>
                            <input readOnly type="number" value={quantity} />
                            <button onClick={increaseQuantity}>+</button>
                            <button disabled={ products.stock < 1 ? true : false } onClick={addToCartHandle} className="btn ">Add to Cart</button>
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
                    <button onClick={submitReviewToggle} className='submitReview btn btn-success'> Submit Review</button>
                    
                </div>
                <div className='col-md-2'>
                    <h5>Sidebar</h5>
                </div>
            </div>
        </div>
        <div className='container reviews' style={{ paddingTop: "100px"}}>
        <h3 className='reviewsHeading'>REVIEW</h3>
        
        <Dialog 
            aria-labelledby='simple-dialog-title'
            open={open}
            onClose={submitReviewToggle}
        >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
            <Rating
                ref={ref}
                name="simple-controlled"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                size="medium"
            />
                
                <textarea
                    className='submitDialogTextArea'
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </DialogContent>
            <DialogActions className='actions'>
                <Button onClick={submitReviewToggle} className='btn btn-primary'>Cancel</Button>
                <Button onClick={reviewSubmitHandler} className='btn btn-primary'>Submit</Button>
            </DialogActions>
        </Dialog>


        {products.reviews && products.reviews[0] ? 
            <div className='row'>
                {products.reviews && products.reviews.map((review) => <ReviewCard review={review} key={review.user}/>)}
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

