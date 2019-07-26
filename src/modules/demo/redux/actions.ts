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

    dispatch(demoActions.setPlanetImage({
      image,
    }));
  },
};
