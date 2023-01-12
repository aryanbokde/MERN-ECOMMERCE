import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

const initialState = {
    loading:false,
    user: [],
    success: "",
    error: "",
    token: "",
    isAuthenticated:false,
}


const fetch1 = async(link, type, body) => {    //2
    const res = await fetch(link, {
        method:type,
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(body)
    })
    return await res.json();
};

const fetch2 = async(url, type) => {   //1
    const res = await fetch(url, {
        method:type,
        headers:{
            "Content-Type" : "application/json"
        },       
    })
    return await res.json();
};


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