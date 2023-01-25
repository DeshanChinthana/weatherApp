import weatherReducer from "./reducers/weatherReducer";
import cacheMiddleware from "./middleware/cacheMiddleware";
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const preloadedState = {};
export const store = configureStore({
    middleware: [thunk, cacheMiddleware],
    reducer: weatherReducer,
    preloadedState,
});
