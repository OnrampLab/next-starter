//#region Global Imports
//#endregion Global Imports

//#region Local Imports
import { actionConsts } from '../actionConsts';
//#endregion Local Imports

//#region Interface Imports
import { IAction } from '@Interfaces';
//#endregion Interface Imports

/**
 * INITIAL_STATE
 */
const INITIAL_STATE = {
  demos: [],
};

type IMapPayload = any;

/**
 * REDUCER
 */
/* eslint-disable complexity */
export const demoReducer = (state = INITIAL_STATE, action: IAction<IMapPayload>) => {
  switch (action.type) {
    case actionConsts.demo.setPlanetImage:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
/* eslint-enable complexity */
