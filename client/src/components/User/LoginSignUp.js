import React, { Fragment, useRef, useState, useEffect, useCallback } from "react";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from '../../Reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';


const LoginSignUp = () => {

  const history = useNavigate();

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("/Profile.png");  
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  const authenticated = useCallback(() => {
    if (isAuthenticated) {
      history('/account');
    }
  },[isAuthenticated]);

  useEffect(() => {
    authenticated();
    // eslint-disable-next-line 
  }, [authenticated]);

  const loginSubmit = (e) => {
    e.preventDefault(); 
    dispatch(loginUser({email:loginEmail, password:loginPassword}));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const userReg = {
      name, email, password, avatar
    }
    dispatch(registerUser(userReg));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
        const reader = new FileReader();
        reader.onload = () => {
            if ( reader.readyState === 2 ) {
             
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }else{
        setUser({...user, [e.target.name]: e.target.value })
    }
  };
  
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
 
  return (
    <Fragment>    
      <Fragment>
        <div style={{ padding: "50px 0px", backgroundColor: "#eee" }}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="LoginSignUpContainer">
                  <div className="LoginSignUpBox">
                    <div>
                      <div className="login_signUp_toggle">
                        <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                        <p onClick={(e) => switchTabs(e, "register")}>
                          REGISTER
                        </p>
                      </div>
                      <button ref={switcherTab}></button>
                    </div>
                    <form
                      className="loginForm"
                      ref={loginTab}
                      onSubmit={loginSubmit}
                    >
                      <div className="loginEmail">
                        <input
                          className="form-control"
                          type="email"
                          placeholder="Email"
                          name="email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                        />
                      </div>
                      <div className="loginPassword">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                          name="password"
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          autoComplete="on"
                        />
                      </div>
                      <Link to="/password/forgot">Forget Password ?</Link>
                      <input type="submit" value="Login" className="loginBtn" />
                    </form>
                    <form
                      className="signUpForm"
                      ref={registerTab}
                      encType="multipart/form-data"
                      onSubmit={registerSubmit}
                    >
                      <div className="signUpName">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Name"
                          required
                          name="name"
                          value={name}
                          onChange={registerDataChange}
                        />
                      </div>
                      <div className="signUpEmail">
                        <input
                          className="form-control"
                          type="email"
                          placeholder="Email"
                          required
                          name="email"
                          value={email}
                          onChange={registerDataChange}
                        />
                      </div>
                      <div className="signUpPassword">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                          required
                          name="password"
                          value={password}
                          onChange={registerDataChange}
                          autoComplete="on"
                        />
                      </div>

                      <div id="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input
                          className="form-control"
                          type="file"
                          name="avatar"
                          accept="image/*"
                          onChange={registerDataChange}
                        />
                      </div>
                      <input
                        type="submit"
                        value="Register"
                        className="signUpBtn"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
};

export default LoginSignUp;
