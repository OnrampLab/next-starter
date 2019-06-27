//#region Global Imports
import { Dispatch } from 'redux';
//#endregion Global Imports

//#region Local Imports
import { ActionConsts } from '@Definitions';
import { PlanetaryService } from '@Services';
//#endregion Local Imports

//#region Interface Imports
import { IWrapperPage } from '@Interfaces';
//#endregion Interface Imports

export const WrapperActions = {
	Map: (payload: {}) => ({
		payload,
		type: ActionConsts.Wrapper.SetReducer,
	}),

	Reset: () => ({
		type: ActionConsts.Wrapper.ResetReducer,
	}),

	GetApod: (payload: IWrapperPage.Actions.IGetApodPayload) => async (dispatch: Dispatch) => {
		const result = await PlanetaryService.GetPlanetImage({
			params: payload.params,
		});

		dispatch({
			payload: {
				image: result,
			},
			type: ActionConsts.Wrapper.SetReducer,
		});
	},
};
