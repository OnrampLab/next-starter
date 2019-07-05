import { Props } from 'react';

import { IStore } from '@Interfaces/Redux/Store';

declare namespace IApp {
	export interface IProps extends Props<{}> {
		store: IStore<any, AnyAction>;
	}

	export interface IState {}
}
