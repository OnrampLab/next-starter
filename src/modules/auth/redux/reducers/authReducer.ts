//#region Global Imports
//#endregion Global Imports

//#region Local Imports
import { actionConsts } from '../actionConsts';
//#endregion Local Imports

//#region Interface Imports
import { IAction } from '@onr/core';
//#endregion Interface Imports

/**
 * INITIAL_STATE
 */
const INITIAL_STATE = {
  currentUser: {},
};

type IMapPayload = any;

/**
 * REDUCER
 */
/* eslint-disable complexity */
export const authReducer = (state = INITIAL_STATE, action: IAction<IMapPayload>) => {
  switch (action.type) {
    case actionConsts.auth.setCurrentUser:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
/* eslint-enable complexity */
