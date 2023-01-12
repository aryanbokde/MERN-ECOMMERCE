import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../Reducers/userReducer';


const UserOptions = ({user}) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const options = [        
        { url: "orders", name: "Orders"},
        { url: "account", name: "Account"},
        { url: "logout", name: "Logout"}
    ];

    if (user.role === "admin") {
        options.unshift({ url: "dashboard", name: "Dashboard"});
    }

    const handleClick = async(e, value) => {
        e.preventDefault();
        if (value === "logout") {
            dispatch(userLogout());
            history("/login");
        }else{
            history(value);
        }
        
    }
  return (
    <>
        <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to={`/user/edituser/`} role="button" data-bs-toggle="dropdown" aria-expanded="true">
            <img src={user.avatar.url ? user.avatar.url : '/Profile.png'} alt="" style={{width:"30px", height:"30px", borderRadius:"15px"}}/>
            </Link>
            <ul className="dropdown-menu">
           
            {options.map((value, index) => (
                <li key={index} data={index} onClick={(e) =>handleClick(e, value.url)}><button className="dropdown-item">{value.name}</button></li>
            ))}
              
            </ul>
        </li>
    </>
  )
}

export default UserOptions
