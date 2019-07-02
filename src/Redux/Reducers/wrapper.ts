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
    case ActionConsts.Wrapper.SetOptionDrawer:
      return {
				...state,
				optionDrawer: typeof(action.payload) === 'boolean' ? action.payload : !state.optionDrawer
			};

    case ActionConsts.Wrapper.SetMobile:
      return {
				...state,
				mobile: typeof(action.payload) === 'boolean' ? action.payload : !state.mobile
			};

    case ActionConsts.Wrapper.SetMobileDrawer:
      return {
				...state,
				mobileDrawer: typeof(action.payload) === 'boolean' ? action.payload : !state.mobileDrawer
			};

		case ActionConsts.Wrapper.SetBoxed:
      return {
				...state,
				boxed: typeof(action.payload) === 'boolean' ? action.payload : !state.boxed
			};

		case ActionConsts.Wrapper.SetSidebarTheme:
      return {
				...state,
				darkSidebar: typeof(action.payload) === 'boolean' ? action.payload : !state.darkSidebar
			};

		case ActionConsts.Wrapper.SetSidebarPopup:
      return {
				...state,
				sidebarPopup: typeof(action.payload) === 'boolean' ? action.payload : !state.sidebarPopup
			};

		case ActionConsts.Wrapper.SetSidebarIcons:
      return {
				...state,
				sidebarIcons: typeof(action.payload) === 'boolean' ? action.payload : !state.sidebarIcons
			};

		case ActionConsts.Wrapper.SetCollapse:
      const collapse = state.collapsed;
      let sidebarIcons = state.sidebarIcons;
      if (!collapse) sidebarIcons = true;
      return {
				...state,
				collapsed: typeof(action.payload) === 'boolean' ? action.payload : !state.collapsed,
				sidebarIcons,
			};

		case ActionConsts.Wrapper.SetWeak:
      const weak = state.weakColor;
      let darkSidebar = state.darkSidebar;
      if (!weak && darkSidebar) darkSidebar = false;
      return {
				...state,
				weakColor: typeof(action.payload) === 'boolean' ? action.payload : !state.weakColor,
				darkSidebar,
			};
		
		case ActionConsts.Wrapper.Setup:
      const settings = JSON.parse(localStorage.getItem('settings'));
      return { ...state, ...settings, ...action.payload };

		default:
			return state;
  }
};
/* eslint-enable complexity */
