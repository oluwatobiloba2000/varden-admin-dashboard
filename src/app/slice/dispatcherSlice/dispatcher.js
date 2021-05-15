import { createSlice } from '@reduxjs/toolkit'
import { createDispatcherApi, getDispatchers } from '../../../api/dispatchers';
import { handleRedirectBeforeLogout } from '../../../utils/handleLogout';

export const dispatcherSlice = createSlice({
  name: 'dispatcher',
  initialState: {
     data: [],
     loading: false,
     new_dispatcher_loading: false,
     new_dispatcher_error: null,
     error: ''
  },
  reducers: {
    add_dispatcher: (state, action) => {
      state.data = action.payload;
    },
    add_single_dispatcher: (state, action)=>{
      state.data.push(action.payload)
    },
    set_loading: (state, action)=> {
      state.loading = action.payload
    },
    set_error: (state, action)=>{
      state.error = action.payload
    },
    set_new_dispatcher_loading: (state, action)=>{
      state.new_dispatcher_loading = action.payload
    },
    set_new_dispatcher_error: (state, action)=>{
      state.new_dispatcher_error = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { add_dispatcher, set_loading, set_error, set_new_dispatcher_error, set_new_dispatcher_loading, add_single_dispatcher} = dispatcherSlice.actions

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
            return  handleRedirectBeforeLogout(history)
          }
          dispatch(set_loading(false))
          dispatch(set_error(getDispatcherApi.error))
      }
}

export const addNewDispatcherAsync = (history, data, toast, reset) => async (dispatch) =>{

  dispatch(set_new_dispatcher_loading(true))
  dispatch(set_new_dispatcher_error(''))
      const addDispatcherApi = await createDispatcherApi(data);
      if(addDispatcherApi.success){
          dispatch(set_new_dispatcher_loading(false))
          dispatch(add_single_dispatcher(data))
          toast({
            title: "Account created",
            description: "Dispatcher has been successfully added",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          reset();
      }else{
          if(addDispatcherApi.error && addDispatcherApi.error === 'Request failed with status code 401'){
            return  handleRedirectBeforeLogout(history)
          }
          dispatch(set_new_dispatcher_loading(false))
          dispatch(set_new_dispatcher_error(addDispatcherApi.error))
      }
}