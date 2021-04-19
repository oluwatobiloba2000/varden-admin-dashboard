import { createSlice } from '@reduxjs/toolkit'
import { getOrders } from '../../../api/orderApi';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
     data: [],
     loading: false,
     error: ''
  },
  reducers: {
    add_order: (state, action) => {
      state.data = action.payload;
    },
    edit_order: (state, action) => {
      state.data = state.data.map(product => JSON.stringify(product._id) === JSON.stringify(action.payload.product._id) ? product = action.payload.product : product);
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
export const { add_order, edit_order, set_loading, set_error} = orderSlice.actions

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