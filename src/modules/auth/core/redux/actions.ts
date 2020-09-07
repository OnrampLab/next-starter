import { Dispatch } from 'redux';
import { SESSION_KEY } from './consts';
import { AuthService, AuthModel, AuthConsts, AuthState } from '@onr/auth';
import { message } from 'antd';

export const setCurrentUser = (currentUser) => ({
  type: AuthConsts.SET_CURRENT_USER,
  payload: {
    currentUser 
  }, 
})

export const getCurrentUser = () => async (dispatch: Dispatch) => {
  try {
    const currentUser = await AuthService.getCurrentUser();

    dispatch(setCurrentUser(currentUser));
  }catch(error) {
    console.error(error);
    message.error('Unkown Error', error);
  }
}

export const setAuthState = (state) => ({
  type: AuthConsts.SET_AUTH_STATE,
  payload: {
    state, 
  }
})

export const setAuthData = (data) => ({
  type: AuthConsts.SET_AUTH_DATA,
  payload: {
    data, 
  }
})

export const resolveAuthFromStorage = () => {
  const localSession = localStorage.getItem(SESSION_KEY) || '';
  
  try {
    const sessionObj = JSON.parse(localSession);

    return sessionObj;
  }catch(error) {
    console.error(error)

    return {}
  }
}

export const resolveAuthState = () => async(dispatch: Dispatch) => {
  const session = resolveAuthFromStorage();
  console.log("data", session)
  if(session.access_token) {
    dispatch(setAuthData(session));
    dispatch(setAuthState(AuthState.Authorized));
  }
  else {
    dispatch(setAuthState(AuthState.Unauthorized));
  }
}

export const login = (form: AuthModel.SigninPayload) => async(dispatch: Dispatch) => {
  dispatch(setAuthState(AuthState.Pending));

  try {
    const loginData: AuthModel.SigninResponse = await AuthService.login(form);
    
    const sessionData = {
      ...loginData, 
      email: form.data.email
    };
    
    dispatch(setAuthData(sessionData));
    dispatch(setAuthState(AuthState.Authorized));
  } catch (error) {
    console.error(error)
    dispatch(setAuthState(AuthState.Unauthorized));
    throw error;
  }
};

export const logout = () => async(dispatch: Dispatch) => {
  dispatch(setAuthState(AuthState.Pending));

  try {
    await AuthService.logout();

    return true;
  } catch (error) {
    throw error;
  } finally {
    dispatch(setAuthData({}));
    dispatch(setAuthState(AuthState.Unauthorized));
  }
};
