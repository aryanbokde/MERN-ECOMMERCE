import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import { fetch1 } from '../Helpers/helper';

const initialState = {
    loading:false,
    isUpdated:false,
    success: ""
}

//Trying update user Profile.
export const updateProfile = createAsyncThunk(
    'updateProfile',
    async(body)=> {  
        let link = "/me/update"; 
        const result = await fetch1(link, "put", body); 
        return result
    }
);

const profileReducer = createSlice({
    name:"UserProfile",
    initialState,
    reducers:{},
    extraReducers: (builder) => {

        //==================User Logout====================== //
        builder.addCase(updateProfile.pending, (state) => {
            state.loading = true
            state.isUpdated = false
        })
        builder.addCase(updateProfile.fulfilled, (state, {payload:{success, message}}) => {            
            if (success) {
                state.loading = false
                state.isUpdated = true
                toast.success(message);
            }else{
                toast.error("Something goes wrong, Please try again");
            }
        })
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false
            state.isUpdated = false
            console.log(action.error.message);
        })
    }

});

export default profileReducer.reducer;