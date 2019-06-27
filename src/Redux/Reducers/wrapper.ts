//#region Global Imports
//#endregion Global Imports

//#region Local Imports
import { ActionConsts } from '@Definitions';
//#endregion Local Imports

//#region Interface Imports
import { IAction, IWrapperPage } from '@Interfaces';
//#endregion Interface Imports

/**
 * INITIAL_STATE
 */
const INITIAL_STATE: IWrapperPage.IStateProps = {
	app: {
		version: 1,
	},
	name: 'One',
	mobile: false,
	boxed: false,
	darkSidebar: false,
	sidebarPopup: false,
	sidebarIcons: false,
	collapsed: false,
	weakColor: false,
	optionDrawer: false,
	mobileDrawer: false,
	fullscreen: false,
};

type IMapPayload = IWrapperPage.Actions.IMapPayload;

/**
 * REDUCER
 */
/* eslint-disable complexity */
export const WrapperReducer = (state = INITIAL_STATE, action: IAction<IMapPayload>) => {
	switch (action.type) {
		case ActionConsts.Wrapper.SetReducer:
			return {
				...state,
				...action.payload,
			};

		case ActionConsts.Wrapper.ResetReducer:
			return INITIAL_STATE;

    case ActionConsts.Wrapper.ToggleOptionDrawer:
      return { ...state, ...{ optionDrawer: !state.optionDrawer } };

		default:
			return state;
  }
};
/* eslint-enable complexity */
