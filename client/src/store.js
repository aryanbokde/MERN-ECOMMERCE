import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from './Reducers/productReducer';
import UserReducer from './Reducers/userReducer';
import ProfileReducer from './Reducers/ProfileReducer';

export const store = configureStore({
    reducer: {
        product: ProductReducer,
        user: UserReducer,
        profile: ProfileReducer
      },
  });