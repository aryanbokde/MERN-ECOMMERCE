import React, { useCallback, useEffect, useState } from 'react';
import MetaData from '../View/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../View/Loading';
import { ForgotPassword, resetProfile } from '../../Reducers/ProfileReducer';


const ForgetPassword = () => {

  const history = useNavigate();
  const { loading, isUpdated} = useSelector((state) => state.profile);    
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  
  const forgetPassword = (e) => {
      e.preventDefault();
      dispatch(ForgotPassword({email}));
  }

  const callBack = useCallback(() => {
    if(isAuthenticated){
      history('/account');
    }
    if (isUpdated) {
      history('/account');
      dispatch(resetProfile());
    }

  },[ isAuthenticated, history, isUpdated, dispatch ]);

  useEffect(() => {
    callBack();
    // eslint-disable-next-line 
  },[callBack]);

  return (
    <div style={{ padding: "50px 0px", backgroundColor: "#eee" }}>
      {loading ? <Loader/> : 

      <div className="container register-form">
        { <MetaData title="Change Password"/> }
        <div className="form">
          <div className="note">
            <h1 className="mb-4">Forget Password</h1> 
          </div>
            <div className="w-100">
                <div className="row">

                <div className="col-md-6">           
                    <form className="" onSubmit={forgetPassword}>
                          <div className="form-group mb-3">
                            <input className="form-control" type="email" placeholder="Enter your email" required name="name" value={email} onChange={(e) => setEmail(e.target.value)} />
                          </div>
                          <input type="submit" value="Update" className="btn" />
                    </form>
                </div>

                <div className="col-md-6"></div>
                </div>     
            </div>          
        </div>
      </div>
      }
    </div>
  )
}

export default ForgetPassword
