import React, { useCallback, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../Reducers/userReducer';


const UserOptions = ({user}) => {
    const dispatch = useDispatch();
   
    const history = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);
    const options = [        
        { url: "orders", name: "Orders"},
        { url: "account", name: "Account"},
        { url: "logout", name: "Logout"}
    ];

    if (user.role === "admin") {
        options.unshift({ url: "/admin/dashboard", name: "Dashboard"});
    }

    const handleClick = async(e, value) => {
        e.preventDefault();
        if (value === "logout") {
            dispatch(userLogout());
            window.location.href = '/login';
            // history("/login");
        }else{
            history(value);
        }        
    }

    const checkUserLogout = useCallback(() => {
        if(!isAuthenticated){
            history('/login');
        }
    },[isAuthenticated, history]);

    useEffect(() => {
        checkUserLogout();
    },[checkUserLogout]);

  return (
    <>
        <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to={`/user/edituser/`} role="button" data-bs-toggle="dropdown" aria-expanded="true">
            <img src={user.avatar.url ? user.avatar.url : '/Profile.png'} alt="" style={{width:"30px", height:"30px", borderRadius:"15px"}}/>
            </Link>
            <ul className="dropdown-menu">
           
            {options.map((value, index) => (
                <li key={index} data={index}><button onClick={(e) =>handleClick(e, value.url)} className="dropdown-item">{value.name}</button></li>
            ))}
              
            </ul>
        </li>
    </>
  )
}

export default UserOptions
