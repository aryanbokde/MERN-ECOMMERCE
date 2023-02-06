import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import { fetch2, fetch1 } from './../Helpers/helper';

const initialState = {
    loading:false,
    products: [],
    success: "",
    error: "",
    productCount:null,
    resultPerPage:null,
    filteredProductCount:null,
}

//Fetch All Products 
export const fetchAllProduct = createAsyncThunk(
    'fetchallproduct',
    async(Obj = {keyword: '', currentPage: 1, price:[0, 25000], category:'', ratings:0})=> {
        const keyword = Obj.keyword;
        const currentPage = Obj.currentPage;
        const price = Obj.price;
        const category = Obj.category;
        const ratings = Obj.ratings;

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        const result = await fetch2(link, "get");
        return result
    }
);

//Fetch Product Detail
export const productDetail = createAsyncThunk(
    'productdetail',
    async(productId)=> {       
        const result = await fetch2(`/api/v1/product/${productId}`, "get");
        return result
    }
);

//Create review or update review
export const createReview = createAsyncThunk(
    'createreview',
    async (body, { rejectWithValue }) => {        
        const link = `/api/v1/review`; 
        
        try {
            const result = await fetch1(link, "put", body); 
            return result
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
);


const productReducer = createSlice({
    name:"product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // ========== Get All Products ============= //
        builder.addCase(fetchAllProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchAllProduct.fulfilled, (state, {payload:{success, products, productCount, resultPerPage, filteredProductCount, message}}) => {
            state.loading = false
            if (success) {
                state.products = products
                state.productCount = productCount
                state.resultPerPage = resultPerPage
                state.filteredProductCount = filteredProductCount
            }else{
                toast.error(message);
            } 
        })    
        builder.addCase(fetchAllProduct.rejected, (state, action) => {
            console.log(action.error.message);
        })    

        // ========== Get Product detail ============= //
        builder.addCase(productDetail.pending, (state) => {
            state.loading = true
        })
        builder.addCase(productDetail.fulfilled, (state, {payload:{success, product, message }}) => {
            state.loading = false
            if (success) {
                state.products = product
            }else{
                toast.error(message);
            }
        })    
        builder.addCase(productDetail.rejected, (state, action) => {
            console.log(action.error.message);
        })    

        // ========== Get Product detail ============= //
        builder.addCase(createReview.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createReview.fulfilled, (state, {payload:{success, message}}) => {
            state.loading = false
            if (success) {
                toast.success("Product review successfully created");
            }else{
                toast.error(message);
            }
        })    
        builder.addCase(createReview.rejected, (state, action) => {
            state.loading = false
            toast.error(action.payload);
        })    

        
           
    }
});

export default productReducer.reducer;