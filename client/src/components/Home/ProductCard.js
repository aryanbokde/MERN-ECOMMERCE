import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

const ProductCard = ({product}) => {
    
    const option = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomoto",
        size: window.innerWidth < 600 ? 10 : 20,
        value: product.ratings,
        isHalf: true,
    }
  return (
    <div className="col-md-6">
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
                {<b className="d-inline-block mb-2 text-primary">{product.category}</b>}
                <h5 className="mb-0">{product.name}</h5>
                <div className="mb-1 text-muted"><ReactStars { ...option }/> <span> {product.numOfReviews} reviews </span></div>
                {<b className="d-inline-block mb-2 text-primary">{product.price}</b>}
                <Link to={`/product/${product._id}`} className="stretched-link">Continue reading</Link>
            </div>
            <div className="col-auto d-none d-lg-block"> 
                <img src={product.images[0].url} alt={product.name} className='' height="230" width="200"/>
            </div>
        </div>
    </div>
  )
}

export default ProductCard
