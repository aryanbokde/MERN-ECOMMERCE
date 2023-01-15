import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';


const initialState = {
    loading:false,
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
}


const cartReducer = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                (item) => item.product === action.payload.products._id
            );

            if ( itemIndex >= 0 ) {
                state.cartItems[itemIndex].quantity += action.payload.quantity;  
                toast.info(`increased ${state.cartItems[itemIndex].name} cart quantity`, {
                    position:"bottom-center",
                });         
            }else{
                const { products, quantity } = action.payload;
                const cartItem = {
                    product:products._id,
                    name:products.name,
                    price:products.price,
                    image:products.images[0].url,
                    stock:products.stock,
                    quantity
                }
                state.cartItems.push(cartItem);
                toast.success(`${action.payload.products.name} added to cart`, {
                    position:"bottom-center",
                });    
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            
        }
    }
});
export const { addToCart } = cartReducer.actions;
export default cartReducer.reducer;