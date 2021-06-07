import { createSlice } from '@reduxjs/toolkit'
import { getProducts, getProductById, editProduct } from '../../../api/productApi';
import { handleRedirectBeforeLogout } from '../../../utils/handleLogout';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
     data: [],
     singleProduct: {},
     singleProductLoading: false,
     singleProductError: '',
     loading: false,
     error: '',
     editProductLoading: false,
     editProductError: ''
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
    set_edit_product: (state, action) => {
      const index = state.data.findIndex((product)=> parseInt(product.id) === parseInt(action.payload.id));
      if(index){
         state.data[index] = {...state.data[index], ...action.payload};
      }
    },
    edit_product_loading: (state, action)=> {
      state.editProductLoading = action.payload
    },
    edit_product_error: (state, action)=>{
      state.error = action.payload
    },
    set_loading: (state, action)=> {
      state.loading = action.payload
    },
    set_error: (state, action)=>{
      state.error = action.payload
    },
    delete_product: (state, action)=>{
      state.data = state.data.filter((product)=> product.id !== parseInt(action.payload.id));
    }
  },
})

// Action creators are generated for each case reducer function
export const {delete_product ,edit_product_error,edit_product_loading, add_single_product, set_single_product_error, single_product_loading,add_product,set_edit_product, set_loading, set_error} = productSlice.actions

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
            return  handleRedirectBeforeLogout(history)
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
            return  handleRedirectBeforeLogout(history)
          }
          dispatch(single_product_loading(false))
          dispatch(set_single_product_error(getProductApi.error))
      }
}

export const editProductAsync = (history, id, data, toast) => async (dispatch) =>{
  dispatch(edit_product_loading(true))
  dispatch(edit_product_error(''))
      const editProductApi = await editProduct(id, data);
      if(editProductApi.success){
          dispatch(edit_product_loading(false))
          dispatch(set_edit_product({...data, id}));
          toast({
            title: "Product Edited",
            description: "Product has been successfully Edited",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
      }else{
          if(editProductApi.error && editProductApi.error === 'Request failed with status code 401'){
            return  handleRedirectBeforeLogout(history);
          }
          dispatch(edit_product_loading(false));
          dispatch(edit_product_error(editProductApi.error));
      }
}