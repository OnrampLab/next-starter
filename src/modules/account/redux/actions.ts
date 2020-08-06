import { Dispatch } from 'redux';
import { actionConsts } from './actionConsts';
import { AccountService } from '@onr/account';

export const accountActions = {
  setAccounts: (payload: {}) => ({
    payload,
    type: actionConsts.account.setAccounts,
  }),

  getAccounts: (payload: any) => async (dispatch: Dispatch) => {
    const accounts = await AccountService.getAccounts({
      params: payload.params,
    });

    dispatch(
      accountActions.setAccounts({
        accounts,
      }),
    );
  },
};
