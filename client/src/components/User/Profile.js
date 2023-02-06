import React from 'react';
import './Profile.css';
import MetaData from '../View/MetaData';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../View/Loading';


const Profile = () => {

    const { user, loading } = useSelector((state) => state.user);
    
   
  return (
    <div style={{ padding: "50px 0px", backgroundColor: "#eee" }}>
    {
        loading ? <Loader/> : (
            <>
            <MetaData title={ user ? `${user.name}'s - Ecommerce` : "E-Commerce"} />
            
                <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="my-4">ACCOUNT</h2>
                    </div>
                </div>
                </div>
                <div className="container">           
                    <div className="row">
                        <div className='col-md-5'>
                            <div className='profile-detail'>
                                <h6>Profile</h6>
                                <img src={user.avatar.url ? user.avatar.url : '/Profile.png'} alt={user.name} className="avatar"/>
                                <p><Link to="/me/update" className='btn btn-primary'>Edit Profile</Link></p>
                            </div>
                            
                        </div>
                        <div className='col-md-2'></div>
                        <div className='col-md-5'>
                        <div className='userDetail'>
                                <h6>User Name</h6>
                                <p>{user.name}</p>
                            </div>
                            <div className='userDetail'>
                                <h6>User Email</h6>
                                <p>{user.email}</p>
                            </div>
                            <div className='userDetail'>
                                <h6>Join On</h6>
                                <p>{String(user.createdAt).substring(0, 10)}</p>
                            </div>
                            <div className='userDetail'>
                                <p><Link to="/orders" className='btn btn-primary'>My Orders</Link></p>
                                <p><Link to="/password/update" className='btn btn-primary'>Change Password</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            )
    }
    </div>
  )
}

export default Profile
