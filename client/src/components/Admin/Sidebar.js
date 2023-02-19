import React from 'react'
import './Sidebar.css';
import { Link } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const SideBar = () => {
  return (
<div className="adminSidebar flex-shrink-0">
    {/* <button className="d-flex align-items-center pb-3 mb-3 link-light text-decoration-none border-bottom">
      dfgfgdf<svg className="bi pe-none me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
      <span className="fs-5 fw-semibold">Collapsible</span>
    </button> */}
    <span className="fs-5 fw-semibold">Collapsible</span>
    <hr className="border-top my-3"/>
    <ul className="list-unstyled ps-0"> 
        <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
            <GridViewIcon/> <span>Dashboard</span> 
            </button>
            <div className="collapse" id="dashboard-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><Link to='/admin/dashboard' className="link-light d-inline-flex text-decoration-none rounded">Dashboard</Link></li>
                <li><Link to='/' className="link-light d-inline-flex text-decoration-none rounded">Weekly</Link></li>
                <li><Link to='/' className="link-light d-inline-flex text-decoration-none rounded">Monthly</Link></li>
                <li><Link to='/' className="link-light d-inline-flex text-decoration-none rounded">Annually</Link></li>
            </ul>
            </div>
        </li>
        <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
            <LocalMallIcon/> <span>Products</span>
            </button>
            <div className="collapse" id="home-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><Link to='/admin/products' className="link-light d-inline-flex text-decoration-none rounded">All Products</Link></li>
                <li><Link to='/admin/product' className="link-light d-inline-flex text-decoration-none rounded">Add New Product</Link></li>
                <li><Link to='/' className="link-light d-inline-flex text-decoration-none rounded">Reports</Link></li>
            </ul>
            </div>
        </li>
      
        <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
            <GridViewIcon/> <span>Orders</span>
            </button>
            <div className="collapse" id="orders-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><Link to='/' className="link-light d-inline-flex text-decoration-none rounded">New</Link></li>
                <li><Link to='/' className="link-light d-inline-flex text-decoration-none rounded">Processed</Link></li>
                <li><Link to='/' className="link-light d-inline-flex text-decoration-none rounded">Shipped</Link></li>
                <li><Link to='/' className="link-light d-inline-flex text-decoration-none rounded">Returned</Link></li>
            </ul>
            </div>
        </li>
        <li className="border-top my-3"></li>
        <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
            <GridViewIcon/> <span>Account</span>
            </button>
            <div className="collapse" id="account-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><Link to='/' className="link-light d-inline-flex text-decoration-none rounded">New...</Link></li>
                <li><Link to='/' className="link-light d-inline-flex text-decoration-none rounded">Profile</Link></li>
                <li><Link to='/' className="link-light d-inline-flex text-decoration-none rounded">Settings</Link></li>
                <li><Link to='/' className="link-light d-inline-flex text-decoration-none rounded">Sign out</Link></li>
            </ul>
            </div>
        </li>
    </ul>
</div>
  )
}

export default SideBar
