import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { Chart } from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import Loader from '../View/Loading';
import MetaData from '../View/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../Reducers/productReducer';

const Dashboard = () => {

  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.product);

  let outOfState = 0;

  Array.from(products).forEach(item => {
    if ( item.stock === 0 ) {
      outOfState += 1;
    }
  });
  // products && products.forEach((item) => {
  //   if ( item.stock === 0 ) {
  //     outOfState += 1;
  //   }
  // });

  useEffect(() => {
    dispatch(getAdminProducts());
  },[dispatch]);

  const lineState = {
    labels: ['Intial Amount', 'Amount Earned'],
    datasets: [
      {
        label:"Total Amount",
        backgroundColor:['tomoto'],
        hoverBackgroundColor: ["rgb(197,72,49)"],
        data:[0,4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets:[
      {
        backgroundColor:["#00A6B4", "#6800B4"],
        hoverBackgroundColor:["#4B5000", "#35014F"],
        data:[outOfState, products.length - outOfState],
      },
    ],
  };

  return (
    loading ? <Loader/>:
    <>
    <MetaData title="Dashboard"/>
    <main className="d-flex flex-nowrap mainDashboard">    
        <Sidebar/>
        <div className='bg-p'>
          <div className='container-fluid dashBoard'>
            <h1>Dashboard</h1>
              <div className='row'>                  
                  <div className='col-12'>
                    <div className='Total'>
                      <h3>Total</h3>
                      <h3>2000</h3>
                    </div>
                    <div className='orderSummary'>
                      <Link to='/'>  
                        <p>Products</p>
                        <p>{products && products.length}</p>
                      </Link>
                      <Link to='/'>  
                        <p>Orders</p>
                        <p>5</p>
                      </Link>
                      <Link to='/'>  
                        <p>Orders</p>
                        <p>5</p>
                      </Link>
                    </div>
                  </div>
              </div>
              <h2>Chart</h2>
              <div className="row">
                <div className='col-md-6'>
                    <div className='lineChart'>
                      <Line data={lineState}/>
                    </div>                    
                </div>
                <div className='col-md-6'>
                  <div className='doughnutChart'>
                    <Doughnut data={doughnutState}/>
                  </div>                
                </div>
              </div>
          </div>   
        </div>     
    </main>
    </>
  )
}

export default Dashboard
