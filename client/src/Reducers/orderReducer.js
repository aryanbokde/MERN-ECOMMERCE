import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import { fetch1, fetch2 } from '../Helpers/helper';

const initialState = {
    loading:false,
    orders:[],   
}

//Create New Order
export const createNewOrder = createAsyncThunk(
    'order/new',
    async (body, { rejectWithValue }) => {        
        const link = `/api/v1/order/new`;  
        try {
            const result = await fetch1(link, "post", body); 
            return result
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
);

//Get All Orders by user
export const myOrders = createAsyncThunk(
    'order/myorder',
    async (body, { rejectWithValue }) => {        
        const link = `/api/v1/orders/me`;  
        try {
            const result = await fetch2(link, "get"); 
            return result
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
);

//Get Single order detail by user
export const getOrderDetail = createAsyncThunk(
    'order/getSingleOrder',
    async (body, { rejectWithValue }) => {        
        const link = `/api/v1/order/${body}`; 
        try {
            const result = await fetch2(link, "get"); 
            return result
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
);


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
                toast.success("Order Created");
            }
        })
        builder.addCase(createNewOrder.rejected, (state, action) => {
            state.loading = false
            toast.error(action.payload);
        })


        //==================Get all Orders====================== //
        builder.addCase(myOrders.pending, (state) => {
            state.loading = true
        })
        builder.addCase(myOrders.fulfilled, (state, {payload:{success, orders}}) => {            
            if (success) {
                state.loading = false
                state.orders = orders
            }
        })
        builder.addCase(myOrders.rejected, (state, action) => {
            state.loading = false
            toast.error(action.payload);
        })


        //==================Get Single Order by user====================== //
        builder.addCase(getOrderDetail.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getOrderDetail.fulfilled, (state, {payload:{success, order}}) => {            
            if (success) {
                state.loading = false
                state.orders = order
            }
        })
        builder.addCase(getOrderDetail.rejected, (state, action) => {
            state.loading = false
            toast.error(action.payload);
        })
        
    }

});

export default orderReducer.reducer;