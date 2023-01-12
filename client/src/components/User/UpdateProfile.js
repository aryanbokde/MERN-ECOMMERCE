import React, { useCallback, useEffect, useState } from 'react';
import './UpdateProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../View/Loading';
import { updateProfile } from "../../Reducers/ProfileReducer";
import { loadUser } from '../../Reducers/userReducer';

// import { refreshPage } from '../../Helpers/helper';
import MetaData from '../View/MetaData';

const UpdateProfile = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, loading } = useSelector((state) => state.profile);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);

  const setUser = useCallback(() => {
    if (isUpdated) {
      dispatch(loadUser());
    }
    
  },[isUpdated]);
  
  useEffect(() => {
    setUser();
    // eslint-disable-next-line 
  }, [isUpdated]);


  const registerDataChange = (e) => {    
        const reader = new FileReader();
        reader.onload = () => {
            if ( reader.readyState === 2 ) {             
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);    
  };

  const updateUserProfile = async(e) => {
    e.preventDefault();
    const userData = {
      name, email, avatar
    }
    console.log(userData)
    dispatch(updateProfile(userData));
    // dispatch(loadUser());
    
    // refreshPage('/account');
  }



  return (
    <div style={{ padding: "50px 0px", backgroundColor: "#eee" }}>
      {loading ? <Loader/> : 

      <div className="container register-form">
        { <MetaData title="Update Profile"/> }
        <div className="form">
          <div className="note">
            <h1 className="mb-4">Update Profile</h1> 
          </div>
            <div className="w-100">
                <div className="row">

                <div className="col-md-6">           
                    <form className="" encType="multipart/form-data" onSubmit={updateUserProfile}>
                          <div className="form-group mb-3">
                            <input className="form-control" type="text" placeholder="Name" required name="name" value={name} onChange={(e) => setName(e.target.value)} />
                          </div>
                          <div className="form-group mb-3">
                            <input className="form-control" type="email" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                          </div>

                          <div className="form-group mb-3">
                            <img src={avatarPreview} alt="Avatar Preview" className='avatarPrev'/>
                            <input className="form-control" type="file" name="avatar" accept="image/*" onChange={registerDataChange}/>
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

export default UpdateProfile
