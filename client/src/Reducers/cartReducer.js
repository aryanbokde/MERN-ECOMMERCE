import { createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';



const initialState = {
    loading:false,
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalAmount: 0,
    cartTotalQuantity: 0
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
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart(state, action){
            const nextCartItems = state.cartItems.filter(
                (cartItem) => cartItem.product !== action.payload.product
            );
            state.cartItems = nextCartItems;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
           
            toast.success(`${action.payload.name} removed from cart`, {
                position:"bottom-center",
            });
        },
        decreaseCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem.product === action.payload.product 
            );
            if (state.cartItems[itemIndex].quantity > 1) {
                state.cartItems[itemIndex].quantity -= 1;
                toast.info(`Decreased ${action.payload.name} cart quantity`, {
                    position:"bottom-center",
                });
            }else if(state.cartItems[itemIndex].quantity === 1){
                const nextCartItems = state.cartItems.filter(
                    (cartItem) => cartItem.product !== action.payload.product
                );
                state.cartItems = nextCartItems;
                toast.error(`${action.payload.name} removed from cart`, {
                    position:"bottom-center",
                });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        }


    }
});
export const { addToCart, removeFromCart, decreaseCart } = cartReducer.actions;
export default cartReducer.reducer;