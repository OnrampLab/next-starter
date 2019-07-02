import { ActionConsts } from '@Definitions';

import { IAction, IHomePage } from '@Interfaces';

const INITIAL_STATE: IHomePage.IStateProps = {
	version: 1,
};

type IMapPayload = IHomePage.Actions.IMapPayload;

/* eslint-disable complexity */
export const HomeReducer = (state = INITIAL_STATE, action: IAction<IMapPayload>) => {
	switch (action.type) {
		case ActionConsts.Home.SetReducer:
			return {
				...state,
				...action.payload,
			};

		case ActionConsts.Home.ResetReducer:
			return INITIAL_STATE;

		default:
			return state;
	}
};
/* eslint-enable complexity */
