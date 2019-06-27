//#region Global Imports
import { Props } from 'react';
//#endregion Global Imports

//#region Interfaces Imports
import { PlanetaryModel } from '@Interfaces';
//#endregion Interfaces Imports

declare namespace IWrapperPage {
	export type IProps = IOwnProps & IStateProps & IDispatchProps;

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
	}

	namespace Actions {
		export interface IMapPayload {}

		export interface IMapResponse {}

		export interface IGetApodPayload extends PlanetaryModel.GetApodPayload {}

		export interface IGetApodResponse extends PlanetaryModel.GetApodResponse {}
	}
}
