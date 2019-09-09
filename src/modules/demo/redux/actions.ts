import { Dispatch } from 'redux';
import { actionConsts } from './actionConsts';
import { DemoService } from 'demo';

export const demoActions = {
  setPlanetImage: (payload: {}) => ({
    payload,
    type: actionConsts.demo.setPlanetImage,
  }),

  getPlanetImage: (payload: any) => async (dispatch: Dispatch) => {
    const image = await DemoService.getPlanetImage({
      params: payload.params,
    });

    try {
      dispatch(
        demoActions.setPlanetImage({
          image,
        }),
      );
    } catch (error) {
      // NOTE: ignore test error due to localStorge issues
    }
  },
};
