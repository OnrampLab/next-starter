//#region Global Imports
import { Dispatch } from 'redux';
//#endregion Global Imports

//#region Local Imports
import { ActionConsts } from '@Definitions';
import { PlanetaryService } from '@Services';
//#endregion Local Imports

//#region Interface Imports
import { IHomePage } from '@Interfaces';
//#endregion Interface Imports

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
