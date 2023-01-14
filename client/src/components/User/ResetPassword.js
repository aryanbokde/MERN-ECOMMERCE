import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../View/Loading';
import MetaData from '../View/MetaData';
import { resetPassword, resetProfile } from '../../Reducers/ProfileReducer';


const ResetPassword = () => {
    const history = useNavigate();
    const location = useLocation(); 
    const token = location.pathname.split("/")[3];
    
    const { loading, isUpdated } = useSelector((state) => state.profile);
    const { isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const resetPasswordHandle = (e) => {
        e.preventDefault();
        const data = {
            token, password, confirmPassword
        }
        dispatch(resetPassword(data));        
    }

    const authenticated = useCallback(() => {
        if (isAuthenticated) {
            history('/account');
        }
        if(isUpdated){
          history('/account');
          dispatch(resetProfile());
        }
    },[isAuthenticated, history, isUpdated, dispatch]);
    
    useEffect(() => {
        authenticated();
        // eslint-disable-next-line 
    },[authenticated]);

  return (
    <div style={{ padding: "50px 0px", backgroundColor: "#eee" }}>
      {loading ? <Loader/> : 

      <div className="container register-form">
        { <MetaData title="Reset Password"/> }
        <div className="form">
          <div className="note">
            <h1 className="mb-4">Reset Password</h1> 
          </div>
            <div className="w-100">
                <div className="row">

                <div className="col-md-6">           
                    <form className="" onSubmit={resetPasswordHandle}>
                          <div className="form-group mb-3">
                            <input className="form-control" type="text" placeholder="New Password" required name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                          </div>
                          <div className="form-group mb-3">
                            <input className="form-control" type="text" placeholder="Confirm Password" required name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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

export default ResetPassword
