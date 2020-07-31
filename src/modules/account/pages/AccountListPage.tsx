import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultPubSubContext, IStore } from '@onr/core';
import { AccountList, accountActions } from '@onr/account';

export const AccountListPage: React.FC = () => {
  const dispatch = useDispatch();
  const accounts = useSelector((store: IStore) => store.accountStore.accounts);
  const context = useContext(DefaultPubSubContext);

  useEffect(() => {
    fetchData();

    const unsub = context.subscribe('account.updated', fetchData);

    return unsub;
  }, []);

  async function fetchData() {
    dispatch(
      accountActions.getAccounts({
        params: {},
      }),
    );
  }

  return (
    <>
      <AccountList accounts={accounts} />
    </>
  );
};
