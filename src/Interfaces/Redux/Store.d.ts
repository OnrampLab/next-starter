import { IWrapperPage, IHomePage } from '@Interfaces';

export interface IStore {
	wrapper: IWrapperPage.IStateProps;
	home: IHomePage.IStateProps;
}
