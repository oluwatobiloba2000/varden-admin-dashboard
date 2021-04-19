import { createSlice } from '@reduxjs/toolkit'
import { getDispatchers } from '../../../api/dispatchers';

export const dispatcherSlice = createSlice({
  name: 'dispatcher',
  initialState: {
     data: [],
     loading: false,
     error: ''
  },
  reducers: {
    add_dispatcher: (state, action) => {
      state.data = action.payload;
    },
    edit_dispatcher: (state, action) => {
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
export const { add_dispatcher, edit_dispatcher, set_loading, set_error} = dispatcherSlice.actions

export default dispatcherSlice.reducer;

export const getDispatcherAsync = (history) => async (dispatch) =>{
  dispatch(set_loading(true))
  dispatch(set_error(''))
      const getDispatcherApi = await getDispatchers();
      if(getDispatcherApi.success){
          dispatch(set_loading(false))
          dispatch(add_dispatcher(getDispatcherApi.data))
      }else{
          if(getDispatcherApi.error && getDispatcherApi.error === 'Request failed with status code 401'){
            return history.push('/login');
          }
          dispatch(set_loading(false))
          dispatch(set_error(getDispatcherApi.error))
      }
}