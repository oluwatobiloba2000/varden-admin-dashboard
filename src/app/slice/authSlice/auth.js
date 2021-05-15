import { createSlice } from '@reduxjs/toolkit';
import { clearTokenInLocalStorage, saveTokenInLocalStorage } from '../../../utils/auth';
import {loginApiFn} from '../../../api/authApi';

export const LoggedInAdmin = createSlice({
  name: 'LoggedInAdmin',
  initialState: {
      auth: {},
      authLoading: false,
      authError: ''
  },
  reducers: {
    set_loggedin_admin: (state, action) => {
     state.auth = action.payload;
    },
    logout_loggedin_admin: (state) => {
        state.auth = {};
    },
    set_auth_loading: (state, action)=>{
        state.authLoading = action.payload; 
    },
    set_auth_error: (state, action) =>{
        state.authError = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { set_loggedin_admin, set_auth_loading, set_auth_error, logout_loggedin_admin} = LoggedInAdmin.actions


export const logOut = _ => dispatch => {
    dispatch(logout_loggedin_admin())
    clearTokenInLocalStorage();
    // history.push('/')
    return;
}


export const login = (data, history, query) => async (dispatch) =>{
    dispatch(set_auth_loading(true))
    dispatch(set_auth_error(''))
        const dataFromLoginfn = await loginApiFn(data);
        if(dataFromLoginfn.success){
            dispatch(set_auth_loading(false))
            dispatch(set_loggedin_admin(dataFromLoginfn.admin))
            saveTokenInLocalStorage(dataFromLoginfn.token)
            const redirectUrl = query.get('rdr');
            if(redirectUrl){
                history.push(redirectUrl);
            }else{
                history.push('/orders');
            }
        }else{
            dispatch(set_auth_loading(false))
            dispatch(set_auth_error(dataFromLoginfn.error))
        }
}

export default LoggedInAdmin.reducer;