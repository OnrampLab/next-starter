//#region Global Imports
import { Props } from 'react';
//#endregion Global Imports

//#region Interface Imports
import { IStore } from '@Interfaces/Redux/Store';
//#region Interface Imports

declare namespace IApp {
	export interface IProps extends Props<{}> {
		store: IStore<any, AnyAction>;
	}

	export interface IState {}
}
