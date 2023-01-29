import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import { fetch1 } from '../Helpers/helper';

const initialState = {
    loading:false,
    isUpdated:false
}

//Trying update user Profile.
export const updateProfile = createAsyncThunk(
    'updateProfile',
    async(body)=> {
        
        const link = "/api/v1/me/update"; 
        const result = await fetch1(link, "put", body); 
        return result
    }
);
//Trying update user Profile.
export const resetProfile = createAsyncThunk(
    'resetProfile',
    async()=> {      
       
    }
);
export const updatePassword = createAsyncThunk(
    'updatePassword',
    async(body)=> {
        
        const link = "/api/v1/password/update"; 
        const result = await fetch1(link, "put", body); 
        return result
    }
);

export const ForgotPassword = createAsyncThunk(
    'forgotPassword',
    async(body)=> {
        
        const link = "/api/v1/password/forgot"; 
        const result = await fetch1(link, "post", body); 
        return result
    }
);

export const resetPassword = createAsyncThunk(
    'resetPassword',
    async(body)=> { 
        
        const { token } = body;
       
        const link = `/api/v1/password/reset/${token}`;  
             
        const result = await fetch1(link, "put", body); 
        return result
    }
);
const profileReducer = createSlice({
    name:"UserProfile",
    initialState,
    reducers:{},
    extraReducers: (builder) => {

        //==================Profile Update====================== //
        builder.addCase(updateProfile.pending, (state) => {
            state.loading = true
            state.isUpdated= false
        })
        builder.addCase(updateProfile.fulfilled, (state, {payload:{success, message}}) => {            
            if (success) {
                state.loading = false
                state.isUpdated= true
                toast.success(message);
            }else{             
                state.loading = false
                state.isUpdated= false
                toast.error(message);
            }
        })
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false
            state.isUpdated= false
            console.log(action.error.message);
        })
        //==================Reset Profile====================== //
        builder.addCase(resetProfile.pending, (state) => {
            state.loading = true
            state.isUpdated= false
        })
        builder.addCase(resetProfile.fulfilled, (state) => {            
            state.loading = false
            state.isUpdated= false
        })
        builder.addCase(resetProfile.rejected, (state) => {            
            state.loading = false
            state.isUpdated= false
        })
        //==================Update Password====================== //
        builder.addCase(updatePassword.pending, (state) => {
            state.loading = true
            state.isUpdated= false
        })
        builder.addCase(updatePassword.fulfilled, (state, {payload:{success, message}}) => {            
            if (success) {
                state.loading = false
                state.isUpdated= true
                toast.success("password has been updated");
            }else{             
                state.loading = false
                state.isUpdated= false
                toast.error(message);
            }
        })
        builder.addCase(updatePassword.rejected, (state, action) => {
            state.loading = false
            state.isUpdated= false
            console.log(action.error.message);
        })
        //==================Forgot Password====================== //
        builder.addCase(ForgotPassword.pending, (state) => {
            state.loading = true
            state.isUpdated= false
        })
        builder.addCase(ForgotPassword.fulfilled, (state, {payload:{success, message}}) => {            
            if (success) {
                state.loading = false
                state.isUpdated= true
                toast.success(message);
            }else{            
                state.isUpdated= false 
                state.loading = false
                toast.error(message);
            }
        })
        builder.addCase(ForgotPassword.rejected, (state, action) => {
            state.loading = false
            state.isUpdated= false
            console.log(action.error.message);
        })
        //==================Reset Password====================== //
        builder.addCase(resetPassword.pending, (state) => {
            state.loading = true
            state.isUpdated= false
        })
        builder.addCase(resetPassword.fulfilled, (state, {payload:{success, message}}) => {            
            if (success) {
                state.loading = false
                state.isUpdated= true
                toast.success("Password has been changed");
            }else{             
                state.loading = false
                state.isUpdated= false
                toast.error(message);
            }
        })
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loading = false
            state.isUpdated= false
            console.log(action.error.message);
        })
        

    }

});

export default profileReducer.reducer;