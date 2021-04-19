import { createSlice } from '@reduxjs/toolkit'
import { fetchAllDistributionCenters } from '../../../api/distributionCenterApi';

export const distributionCenter = createSlice({
  name: 'distributionCenter',
  initialState: {
     data: [],
     loading: false,
     error: ''
  },
  reducers: {
    add_dsc: (state, action) => {
      state.data = action.payload;
    },
    edit_dsc: (state, action) => {
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
export const { add_dsc, edit_dsc, set_loading, set_error} = distributionCenter.actions

export default distributionCenter.reducer;

export const getDscAsync = (history) => async (dispatch) =>{
  dispatch(set_loading(true))
  dispatch(set_error(''))
      const getDscApi = await fetchAllDistributionCenters();
      if(getDscApi.success){
          dispatch(set_loading(false))
          dispatch(add_dsc(getDscApi.data))
      }else{
          if(getDscApi.error && getDscApi.error === 'Request failed with status code 401'){
            return history.push('/login');
          }
          dispatch(set_loading(false))
          dispatch(set_error(getDscApi.error))
      }
}