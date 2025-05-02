import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import articleReducer from './articleSlice';
import formReducer from './formSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
    form: formReducer,
  },
});
