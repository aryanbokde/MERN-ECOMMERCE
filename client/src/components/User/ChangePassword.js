import React, { useState } from 'react';
import MetaData from '../View/MetaData';
import Loader from '../View/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, resetProfile } from '../../Reducers/ProfileReducer';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const { loading, isUpdated } = useSelector((state)=> state.profile)
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');


    const UpdatePassword = (e) => {
      e.preventDefault();
      const userData = {
        oldPassword, newPassword, comfirmPassword:cnfPassword
      }    
      dispatch(updatePassword(userData));
    }

    React.useEffect(() => {
      if(isUpdated){
        history('/account');
        dispatch(resetProfile());
      }
    },[isUpdated, history, dispatch]);

  return (
    <div style={{ padding: "50px 0px", backgroundColor: "#eee" }}>
      {loading ? <Loader/> : 

      <div className="container register-form">
        { <MetaData title="Change Password"/> }
        <div className="form">
          <div className="note">
            <h1 className="mb-4">Update Password</h1> 
          </div>
            <div className="w-100">
                <div className="row">

                <div className="col-md-6">           
                    <form className="" encType="multipart/form-data" onSubmit={UpdatePassword}>
                          <div className="form-group mb-3">
                            <input className="form-control" type="text" placeholder="Old Password" required name="name" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                          </div>
                          <div className="form-group mb-3">
                            <input className="form-control" type="text" placeholder="New Password" required name="name" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                          </div>
                          <div className="form-group mb-3">
                            <input className="form-control" type="text" placeholder="Confirm Password" required name="name" value={cnfPassword} onChange={(e) => setCnfPassword(e.target.value)} />
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

export default ChangePassword
