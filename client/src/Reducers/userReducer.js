import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import { fetch1, fetch2 } from '../Helpers/helper';

const initialState = {
    loading:false,
    user: [],
    success: "",
    error: "",
    token: "",
    isAuthenticated:false,
}


//User Trying to Login Check user and login.
export const loginUser = createAsyncThunk(
    'loginUser',
    async(body)=> {
        let link = "/login";
        const result = await fetch1(link, "post", body);
        return result
    }
);

//User Trying to Login Check user and login.
export const registerUser = createAsyncThunk(
    'registerUser',
    async(body)=> { 
        let link = "/register";       
        const result = await fetch1(link, "post", body);
        return result
    }
);

//Trying to load user data first. if login
export const loadUser = createAsyncThunk(
    'loadUser',
    async()=> {        
        let link = "/me";       
        const result = await fetch2(link, "get"); 
        return result
    }
);

//Trying to User logout
export const userLogout = createAsyncThunk(
    'userLogout',
    async()=> {        
        let link = "/logout";       
        const result = await fetch2(link, "get"); 
        return result
    }
);

const userReducer = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers: (builder) => {

        //==================User Login====================== //
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
            state.isAuthenticated = false
        })
        builder.addCase(loginUser.fulfilled, (state, {payload:{success, user, message}}) => {
            if (success) {
                state.loading = false
                state.user = user
                state.isAuthenticated = true
                toast.success("You have successfully LogedIn.");
            }else{
                toast.error(message);
            }
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            toast.error(action.error.message);
        })

        //==================User Register===================== //
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
            state.isAuthenticated = false
        })
        builder.addCase(registerUser.fulfilled, (state, {payload:{success, user, message}}) => {
            
            if (success) {
                state.loading = false
                state.user = user
                state.isAuthenticated = true
                toast.success("You have successfully Signup.");
            }else{
                toast.error(message);
            }
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            toast.error(action.error.message);
        })

        //==================Load User Data====================== //
        builder.addCase(loadUser.pending, (state) => {
            state.loading = true
            state.isAuthenticated = false
        })
        builder.addCase(loadUser.fulfilled, (state, {payload:{success, user, message}}) => {            
            if (success) {
                state.loading = false
                state.user = user
                state.isAuthenticated = true
            }
        })
        builder.addCase(loadUser.rejected, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.error = action.error.message
        })

        //==================User Logout====================== //
        builder.addCase(userLogout.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userLogout.fulfilled, (state, {payload:{success, message}}) => {            
            if (success) {
                state.loading = false
                state.user = null
                state.isAuthenticated = false
                toast.success(message);
            }else{
                toast.error(message);
            }
        })
        builder.addCase(userLogout.rejected, (state, action) => {
            state.loading = false
            state.user = null
            state.isAuthenticated = false
            console.log(action.error.message)
        })
    }

});

export default userReducer.reducer;