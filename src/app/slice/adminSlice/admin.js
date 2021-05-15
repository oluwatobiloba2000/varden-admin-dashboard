import { createSlice } from '@reduxjs/toolkit'
import { addAdmin, getAdmin, getAdminDetails } from '../../../api/adminApi';
import { handleRedirectBeforeLogout } from '../../../utils/handleLogout';


export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
     data: [],
     adminDetails: {},
     adminDetailsLoading: false,
     adminDetailsError: null,
     newAdminLoading: false,
     newAdminError: null,
     loading: false,
     error: null
  },
  reducers: {
    add_admin: (state, action) => {
      state.data = action.payload;
    },
    add_admin_details: (state, action) => {
      state.adminDetails = action.payload
    },
    add_new_admin: (state, action) =>{
      state.data.push(action.payload)
    },
    set_new_admin_loading: (state, action)=> {
      state.newAdminLoading = action.payload
    },
    set_new_admin_error: (state, action)=> {
      state.newAdminError = action.payload
    },
    set_loading: (state, action)=> {
      state.loading = action.payload
    },
    set_admin_details_loading: (state, action)=> {
      state.adminDetailsLoading = action.payload
    },
    set_admin_details_error: (state, action)=>{
      state.adminDetailsError = action.payload
    },
    set_error: (state, action)=>{
      state.error = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { add_admin,add_new_admin, set_new_admin_loading, set_new_admin_error, edit_admin, set_loading, set_error,add_admin_details, set_admin_details_error, set_admin_details_loading} = adminSlice.actions

export default adminSlice.reducer;

export const getAdminAsync = (history) => async (dispatch) =>{
  dispatch(set_loading(true))
  dispatch(set_error(''))
      const getAdminApi = await getAdmin();
      if(getAdminApi.success){
          dispatch(set_loading(false))
          dispatch(add_admin(getAdminApi.data))
      }else{
          if(getAdminApi.error && getAdminApi.error === 'Request failed with status code 401'){
            return  handleRedirectBeforeLogout(history)
          }
          dispatch(set_loading(false))
          dispatch(set_error(getAdminApi.error))
      }
}

export const getAdminDetailsAsync = (history, id) => async (dispatch) =>{

  dispatch(set_admin_details_loading(true))
  dispatch(set_admin_details_error(''))
      const getAdminDetailsApi = await getAdminDetails(id);
      if(getAdminDetailsApi.success){
          dispatch(set_admin_details_loading(false))
          dispatch(add_admin_details(getAdminDetailsApi.data))
      }else{
          if(getAdminDetailsApi.error && getAdminDetailsApi.error === 'Request failed with status code 401'){
            return  handleRedirectBeforeLogout(history)
          }
          dispatch(set_loading(false))
          dispatch(set_admin_details_error(getAdminDetailsApi.error))
      }
}

export const addNewAdminAsync = (history, data, toast, reset) => async (dispatch) =>{

  dispatch(set_new_admin_loading(true))
  dispatch(set_new_admin_error(''))
      const addAdminApi = await addAdmin(data);
      if(addAdminApi.success){
          dispatch(set_new_admin_loading(false))
          dispatch(add_new_admin(data))
          toast({
            title: "Account created",
            description: "Admin has been successfully added",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          reset();
      }else{
          if(addAdminApi.error && addAdminApi.error === 'Request failed with status code 401'){
            return  handleRedirectBeforeLogout(history)
          }
          dispatch(set_new_admin_loading(false))
          dispatch(set_new_admin_error(addAdminApi.error))
      }
}