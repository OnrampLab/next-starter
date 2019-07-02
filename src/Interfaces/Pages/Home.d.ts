//#region Global Imports
import { Props } from 'react';
import { Store } from 'redux';
//#endregion Global Imports

//#region Interfaces Imports
import { PlanetaryModel } from '@Interfaces';
//#endregion Interfaces Imports

declare namespace IHomePage {
	export type IProps = IOwnProps & IStateProps & IDispatchProps & Store;

	export interface IOwnProps extends Props<{}> {}

	export interface IState {}

	export interface IStateProps {
		version: number;
	}

	export interface IDispatchProps {
		map(payload: Actions.IMapPayload): Actions.IMapResponse;
		getApod(payload: Actions.IGetApodPayload): Actions.IGetApodResponse;
	}

	namespace Actions {
		export interface IMapPayload {}

		export interface IMapResponse {}

		export interface IGetApodPayload extends PlanetaryModel.GetApodPayload {}

		export interface IGetApodResponse extends PlanetaryModel.GetApodResponse {}
	}
}
