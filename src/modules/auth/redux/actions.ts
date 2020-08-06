import { Dispatch } from 'redux';
import { actionConsts } from './actionConsts';
import { AuthService } from '@onr/auth';

export const authActions = {
  setCurrentUser: (payload: {}) => ({
    payload,
    type: actionConsts.auth.setCurrentUser,
  }),

  getCurrentUser: () => async (dispatch: Dispatch) => {
    const currentUser = await AuthService.getCurrentUser();

    dispatch(
      authActions.setCurrentUser({
        currentUser,
      }),
    );
  },
};
