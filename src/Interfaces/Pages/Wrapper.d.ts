//#region Global Imports
import { Props } from 'react';
import { Store } from 'redux';
//#endregion Global Imports

//#region Interfaces Imports
import { PlanetaryModel } from '@Interfaces';
//#endregion Interfaces Imports

declare namespace IWrapperPage {
	export type IProps = IOwnProps & IStateProps & IDispatchProps & Store;

	export interface IOwnProps extends Props<{}> {}

	export interface IState {}

	export interface IStateProps {
		app: any;
		name: string;
		mobile: boolean;
		boxed: boolean;
		darkSidebar: boolean;
		sidebarPopup: boolean;
		sidebarIcons: boolean;
		collapsed: boolean;
		weakColor: boolean;
		optionDrawer: boolean;
		mobileDrawer: boolean;
		fullscreen: boolean;
	}

	export interface IDispatchProps {
		SetOptionDrawer(payload?: boolean): AnyAction;
		SetMobile(payload?: boolean): AnyAction;
		SetMobileDrawer(payload?: boolean): AnyAction;
		SetBoxed(payload?: boolean): AnyAction;
		SetSidebarTheme(payload?: boolean): AnyAction;
		SetSidebarPopup(payload?: boolean): AnyAction;
		SetSidebarIcons(payload?: boolean): AnyAction;
		SetCollapse(payload?: boolean): AnyAction;
		SetWeak(payload?: boolean): AnyAction;
	}

	namespace Actions {
		export interface IMapPayload {}

		export interface IMapResponse {}

		export interface IGetApodPayload extends PlanetaryModel.GetApodPayload {}

		export interface IGetApodResponse extends PlanetaryModel.GetApodResponse {}
	}
}
