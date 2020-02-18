import { Dispatch } from 'redux';
import { actionConsts } from './actionConsts';
import { DemoService } from '@onr/demo';

export const demoActions = {
  setPlanetImage: (payload: {}) => ({
    payload,
    type: actionConsts.demo.setPlanetImage,
  }),

  getPlanetImage: (payload: any) => async (dispatch: Dispatch) => {
    try {
      const image = await DemoService.getPlanetImage({
        params: payload.params,
      });
      dispatch(
        demoActions.setPlanetImage({
          image,
        }),
      );
    } catch (error) {
      // NOTE: ignore test error due to localStorge issues
      console.log(error);
    }
  },
};
