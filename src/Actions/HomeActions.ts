import { Dispatch } from 'redux';

import { ActionConsts } from '@Definitions';
import { PlanetaryService } from '@Services';

import { IHomePage } from '@Interfaces';

export const HomeActions = {
	map: (payload: {}) => ({
		payload,
		type: ActionConsts.Home.SetReducer,
	}),

	reset: () => ({
		type: ActionConsts.Home.ResetReducer,
	}),

	getApod: (payload: IHomePage.Actions.IGetApodPayload) => async (dispatch: Dispatch) => {
		const result = await PlanetaryService.getPlanetImage({
			params: payload.params,
		});

		dispatch({
			payload: {
				image: result,
			},
			type: ActionConsts.Home.SetReducer,
		});
	},
};
