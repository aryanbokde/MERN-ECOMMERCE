import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import { fetch1 } from '../Helpers/helper';

const initialState = {
    loading:false,
    orders:[],
   
}

export const createNewOrder = createAsyncThunk(
    'order/new',
    async (body, { rejectWithValue }) => {        
        const link = `/api/v1/order/new`;  
        try {
            const result = await fetch1(link, "post", body); 
            return result
        } catch (err) {
            return rejectWithValue("err.response.data")
        }
    }
)



const orderReducer = createSlice({
    name:"orders",
    initialState,
    reducers:{},
    extraReducers: (builder) => {

        //==================Create New Orders====================== //
        builder.addCase(createNewOrder.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createNewOrder.fulfilled, (state, {payload:{success, order}}) => {            
            if (success) {
                state.loading = false
                state.orders = order
                toast.success("Order Created");
            }
        })
        builder.addCase(createNewOrder.rejected, (state, action) => {
            state.loading = false
            console.log(action.payload);
        })
        
    }

});

export default orderReducer.reducer;