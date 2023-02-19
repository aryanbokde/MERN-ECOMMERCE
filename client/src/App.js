import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import ProductDetail from "./components/Products/ProductDetail";
import LoginSignup from "./components/User/LoginSignUp";
import { store } from "./store";
import { loadUser } from "./Reducers/userReducer";
import { getTotals } from "./Reducers/cartReducer";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoutes from "./components/Route/ProtectedRoutes";
// import AdminProtectedRoute from "./components/Route/AdminProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import ChangePassword from "./components/User/ChangePassword";
import ForgetPassword from "./components/User/ForgetPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
// import NotFound from "./components/View/NotFound";
import Shipping from './components/Chekout/Shipping';
import ConfirmOrder from './components/Chekout/ConfirmOrder';
import Payment from './components/Chekout/Payment';
import OrderSuccess from "./components/Chekout/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetail from "./components/Order/OrderDetail";
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import EditProduct from './components/Admin/EditProduct';


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  
  async function getStripeApiKey() {
    store.dispatch(loadUser());
    store.dispatch(getTotals());   
    
  }

  useEffect(() => {
    getStripeApiKey();       
    // eslint-disable-next-line
  }, []);
  
  return (
    <>

      <ToastContainer />      
      <Router>
        <Fragment>
          
            <Navbar isAuthenticated={isAuthenticated} user={user} />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/products" element={<Products />} />
              <Route exact path="/product/:id" element={<ProductDetail />} />
              <Route path="/products/:keyword" element={<Products />} />
              <Route exact path="/login" element={<LoginSignup />} />
              <Route exact path="/password/forgot" element={<ForgetPassword />}/>
              <Route exact path="/password/reset/:token" element={<ResetPassword />}/>
              <Route exact path="/cart" element={<Cart />} />              
              <Route exact path="/order-success" element={<OrderSuccess />} />              
              {isAuthenticated && 
                <Route element={<ProtectedRoutes />}>
                  <Route exact path="/account" element={<Profile />} />
                  <Route exact path="/me/update" element={<UpdateProfile />} />
                  <Route exact path="/password/update" element={<ChangePassword />}/>
                  {/* <Route exact path="/shipping" element={<Checkout />} /> */}
                  <Route exact path="/shipping" element={<Shipping />} />
                  <Route exact path="/order/confirm" element={<ConfirmOrder />} />
                  <Route exact path="/process/payment" element={<Payment/>} />
                  <Route exact path="/orders" element={<MyOrders/>} />
                  <Route exact path="/order/:id" element={<OrderDetail/>} />
                </Route>              
              }
              { user.role === 'admin' && 
                <Route element={<ProtectedRoutes />}>
                  <Route exact path="/admin/dashboard" element={<Dashboard />} />
                  <Route exact path="/admin/products" element={<ProductList />} />
                  <Route exact path="/admin/product" element={<NewProduct />} />
                  <Route exact path="/admin/product/:id" element={<EditProduct />} />
                </Route>
              }
              
              

            
            </Routes>
            <Footer/>
        </Fragment>
      </Router>

    </>
  );
}

export default App;
