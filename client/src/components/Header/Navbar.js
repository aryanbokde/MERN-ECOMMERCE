import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../images/shop.png";
import UserOptions from './UserOptions';


const Navbar = ({isAuthenticated, user}) => {
  const history = useNavigate();
  const [keyword, setKeyword] = useState("");

  const {cartTotalQuantity} = useSelector((state) => state.cart)

  const searchSubmitHandle = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/products/${keyword}`);
    }else{
      history(`/products/`);
    }

    
  }
  return (
    <>
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/"><img src={logo} style={{ width:"30px"}} alt="Best E-coomerce app"/></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/products">Products</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/login">Login/Register</Link>
                  </li>  
                  <li className="nav-item">
                  <Link className="nav-link" to="/cart">Cart <span>({cartTotalQuantity})</span></Link>
                  </li>  
                  {
                    isAuthenticated && <UserOptions user={user}/>
                  }
                                          
              </ul>
              <form className="d-flex" onSubmit={searchSubmitHandle}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setKeyword(e.target.value) } value={keyword}/>
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
        </div>
      </nav>
    </div>
    
    </>    
  )
}

export default Navbar
