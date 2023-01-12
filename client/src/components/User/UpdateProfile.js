import React from 'react'

const UpdateProfile = () => {
  return (
    <div style={{ padding: "50px 0px", backgroundColor: "#eee" }}>
      <div className="container register-form">
        <div className="form">
          <div className="note">
            <h1 className="mb-4">Edit User</h1>
            
          </div>
            <div className="w-100">
            <form className="form-content" method="post">
                <div className="row">
                <div className="col-md-6">           
                    
                    <div className="form-group mb-3">
                        <input type="file" name="profilePic" className="form-control" placeholder="Upload your file *" />                       
                    </div>
                    <div className="form-group mb-3">
                        <input type="test" name="username" className="form-control" placeholder="Username" value="" />
                    </div>
                    <div className="form-group mb-3">
                        <input type="email" name="email" className="form-control" placeholder="Email" value="" />
                    </div>
                    <div className="form-group mb-3">                    
                        <input type="password" name="password" className="form-control" placeholder="Password" autoComplete="false" value=""/>
                    </div>
                        <button type="submit" className="btnSubmit btn btn-primary">Update User</button>

                </div>
                <div className="col-md-6"></div>
                </div>        
            </form>
            </div>
          
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile
