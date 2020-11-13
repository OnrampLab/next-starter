import { AuthConsts, STORE_KEY, INITIAL_STATE } from './consts';
import { IAction } from '@onr/core';

export const authReducer = (state = INITIAL_STATE, action: IAction<IMapPayload>) => {
  switch (action.type) {
    case AuthConsts.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
      };
    
    case AuthConsts.SET_AUTH_STATE:
      return {
        ...state,
        state: action.payload.state, 
      }
    
    case AuthConsts.SET_AUTH_DATA:
      return {
        ...state, 
        data: action.payload.data,
      }

    default:
      return state;
  }
};
/* eslint-enable complexity */

export const reducers = {
  [STORE_KEY]: authReducer,
};
