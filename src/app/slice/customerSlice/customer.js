import { createSlice } from '@reduxjs/toolkit'
import { getCustomers, getCustomersOrders } from '../../../api/customerApi';

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
     data: [],
     orders: [],
     orders_loading: false,
     orders_error: null,
     loading: false,
     error: ''
  },
  reducers: {
    add_customer: (state, action) => {
      state.data = action.payload;
    },
    add_orders: (state, action)=>{
      state.orders = action.payload;
    },
    set_orders_loading: (state, action)=>{
      state.orders_loading = action.payload
    },
    set_orders_error: (state, action)=>{
      state.orders_error = action.payload
    },
    set_loading: (state, action)=> {
      state.loading = action.payload
    },
    set_error: (state, action)=>{
      state.error = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {add_orders, set_orders_error, set_orders_loading, add_customer, set_loading, set_error} = customerSlice.actions

export default customerSlice.reducer;

export const getCustomerAsync = (history) => async (dispatch) =>{
  dispatch(set_loading(true))
  dispatch(set_error(''))
      const getCustomerApi = await getCustomers();
      if(getCustomerApi.success){
          dispatch(set_loading(false))
          dispatch(add_customer(getCustomerApi.data))
      }else{
          if(getCustomerApi.error && getCustomerApi.error === 'Request failed with status code 401'){
            return history.push('/login');
          }
          dispatch(set_loading(false))
          dispatch(set_error(getCustomerApi.error))
      }
}

export const addCustomerOrdersAsync = (history, id) => async (dispatch) =>{
  dispatch(set_orders_loading(true))
  dispatch(set_orders_error(''))
      const getCustomerOrdersApi = await getCustomersOrders(id);
      if(getCustomerOrdersApi.success){
          dispatch(set_orders_loading(false))
          dispatch(add_orders(getCustomerOrdersApi.data))
      }else{
          if(getCustomerOrdersApi.error && getCustomerOrdersApi.error === 'Request failed with status code 401'){
            return history.push('/login');
          }
          dispatch(set_orders_loading(false))
          dispatch(set_orders_error(getCustomerOrdersApi.error))
      }
}
