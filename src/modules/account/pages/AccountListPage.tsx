import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultPubSubContext, IStore, usePubSub } from '@onr/core';
import { AccountList, accountActions } from '@onr/account';

export const AccountListPage: React.FC = () => {
  const dispatch = useDispatch();
  const accounts = useSelector((store: IStore) => store.accountStore.accounts);
  const { subscribe } = usePubSub(DefaultPubSubContext);

  useEffect(() => {
    fetchData();

    const unsub = subscribe('account.updated', fetchData);

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
