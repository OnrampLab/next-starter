//#region Interface Imports
import { IWrapperPage, IHomePage } from '@Interfaces';
//#endregion Interface Imports

export interface IStore {
	wrapper: IWrapperPage.IStateProps;
	home: IHomePage.IStateProps;
}
