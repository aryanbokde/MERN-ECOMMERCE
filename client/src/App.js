
import './App.css';
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';

import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import ProductDetail from './components/Products/ProductDetail';
import LoginSignup from './components/User/LoginSignUp';
import { store } from './store';
import { loadUser } from './Reducers/userReducer';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile';
import ProtectedRoutes from './components/Route/ProtectedRoutes';
import UpdateProfile from './components/User/UpdateProfile';

function App() {
  
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
      <>
      <ToastContainer/>
      <Router>   
      <Fragment>     
        <Navbar isAuthenticated={isAuthenticated} user={user}/> 
          <Routes>           
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/products' element={<Products/>}/>
            <Route exact path='/product/:id' element={<ProductDetail/>}/>
            <Route path='/products/:keyword' element={<Products/>}/>
            <Route exact path='/login' element={<LoginSignup/>}/>
            <Route element={<ProtectedRoutes/>}>
              <Route exact path='/account' element={<Profile/>}/>
              <Route exact path='/me/update' element={<UpdateProfile/>}/>
            </Route>
          </Routes>
        <Footer/>
        </Fragment>
      </Router>
      </>
  );
}

export default App;
