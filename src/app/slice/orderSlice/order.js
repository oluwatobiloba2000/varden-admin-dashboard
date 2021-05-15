import { createSlice } from '@reduxjs/toolkit'
import { getOrders, getOrdersById } from '../../../api/orderApi';
import { handleRedirectBeforeLogout } from '../../../utils/handleLogout';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
     data: [],
     singleOrder: {},
     loading_single_order: false,
     single_order_error: '',
     loading: false,
     error: ''
  },
  reducers: {
    add_order: (state, action) => {
      state.data = action.payload;
    },
    set_loading: (state, action)=> {
      state.loading = action.payload
    },
    set_error: (state, action)=>{
      state.error = action.payload
    },
    add_single_order: (state, action)=> {
      state.singleOrder = action.payload;
    },
    edit_order: (state, action)=>{
      const index = state.data.findIndex((order)=> order.order_number === action.payload.order_number);
      if(index !== -1){
         state.data[index] = {...state.data[index], ...action.payload};
      }
    },
    set_single_order_loading: (state, action) =>{
      state.loading_single_order = action.payload
    },
    set_single_order_error: (state, action)=>{
      state.single_order_error = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {edit_order, add_order, set_loading, set_error, set_single_order_error, set_single_order_loading, add_single_order} = orderSlice.actions

export default orderSlice.reducer;

export const getOrdersAsync = (history) => async (dispatch) =>{
  dispatch(set_loading(true))
  dispatch(set_error(''))
      const getOrderApi = await getOrders();
      if(getOrderApi.success){
          dispatch(set_loading(false))
          dispatch(add_order(getOrderApi.data))
      }else{
          if(getOrderApi.error && getOrderApi.error === 'Request failed with status code 401'){
            return history.push('/login');
          }
          dispatch(set_loading(false))
          dispatch(set_error(getOrderApi.error))
      }
}


export const getSingleOrdersAsync = (history, id) => async (dispatch) =>{
  dispatch(set_single_order_loading(true))
  dispatch(set_single_order_error(''))
      const getOrderApi = await getOrdersById(id);
      if(getOrderApi.success){
          dispatch(set_single_order_loading(false))
          console.log({getOrderApi})
          dispatch(add_single_order(getOrderApi.data))
      }else{
          if(getOrderApi.error && getOrderApi.error === 'Request failed with status code 401'){
            return  handleRedirectBeforeLogout(history)
          }
          dispatch(set_single_order_loading(false))
          dispatch(set_single_order_error(getOrderApi.error))
      }
}

