import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import {combineReducers} from 'redux';
import LoggedInAdmin from '../slice/authSlice/auth';
import adminSlice from '../slice/adminSlice/admin';
import customerSlice from '../slice/customerSlice/customer';
import  productSlice from '../slice/productSlice/product';
import orderSlice from '../slice/orderSlice/order';
import dispatcherSlice  from '../slice/dispatcherSlice/dispatcher';
import  distributionCenter from '../slice/distributionCenterSlice/distributionCenter';
const storage = require("redux-persist/lib/storage").default;

let rootReducers  = combineReducers({
    loggedinadmin: LoggedInAdmin,
    admins: adminSlice,
    customers: customerSlice,
    products: productSlice,
    orders: orderSlice,
    dispatchers: dispatcherSlice,
    distributionCenters: distributionCenter
})


// export const makeStore = (initialState, { isServer, req, debug, storeKey }) => {
//     if(isServer){
//         initialState = initialState || {formServer: "foo"}

//         return configureStore({
//                 reducer: rootReducers,
//                 preloadedStore: initialState
//             })
//     }   
//     else{}
const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})

const persisConfig = {
    key: 'varden-root',
    whitelist: ["dcs", "dcsProducts"],
    storage
}

const persistedReducers = persistReducer(persisConfig, rootReducers)
export const store = configureStore({
    reducer: persistedReducers,
    middleware: customizedMiddleware
})

export const persistor= persistStore(store);
