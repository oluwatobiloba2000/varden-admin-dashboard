import { createSlice } from '@reduxjs/toolkit'
import { getProducts, getProductById } from '../../../api/productApi';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
     data: [],
     singleProduct: {},
     singleProductLoading: false,
     singleProductError: '',
     loading: false,
     error: ''
  },
  reducers: {
    add_product: (state, action) => {
      state.data = action.payload;
    },
    add_single_product: (state, action)=>{
      state.singleProduct = action.payload
    },
    single_product_loading: (state, action)=>{
      state.singleProductLoading = action.payload;
    },
    set_single_product_error: (state, action)=>{
      state.singleProductError = action.payload;
    },
    edit_product: (state, action) => {
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
export const { add_single_product, set_single_product_error, single_product_loading,add_product,edit_product, set_loading, set_error} = productSlice.actions

export default productSlice.reducer;

export const getProductAsync = (history) => async (dispatch) =>{
  dispatch(set_loading(true))
  dispatch(set_error(''))
      const getProductApi = await getProducts();
      if(getProductApi.success){
          dispatch(set_loading(false))
          dispatch(add_product(getProductApi.data))
      }else{
          if(getProductApi.error && getProductApi.error === 'Request failed with status code 401'){
            return history.push('/login');
          }
          dispatch(set_loading(false))
          dispatch(set_error(getProductApi.error))
      }
}


export const getProductByIdAsync = (history, id) => async (dispatch) =>{
  dispatch(single_product_loading(true))
  dispatch(set_single_product_error(''))
      const getProductApi = await getProductById(id);
      if(getProductApi.success){
          dispatch(single_product_loading(false))
          dispatch(add_single_product(getProductApi.data))
      }else{
          if(getProductApi.error && getProductApi.error === 'Request failed with status code 401'){
            return history.push('/login');
          }
          dispatch(single_product_loading(false))
          dispatch(set_single_product_error(getProductApi.error))
      }
}