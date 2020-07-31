import React, { useState, useEffect } from 'react';
import { useAppState } from '@onr/core';
import AccountApiKey from './AccountApiKey.mdx';
import { AccountService } from '../services';
import { IAccountApiKey } from '../entities';

export const Authentication: React.FC = () => {
  const [accountApiKey, setAccountApiKey] = useState<IAccountApiKey | null>(null);
  const [state] = useAppState();
  const fetchData = async () => {
    const apiKeys = await AccountService.getAccountApiKeys({
      accountId: state.accountId,
    });

    setAccountApiKey(apiKeys[0] || {});
  };

  useEffect(() => {
    if (state.accountId) {
      fetchData();
    }
  }, [state.accountId]);

  return <>{accountApiKey && <AccountApiKey accountApiKey={accountApiKey} />}</>;
};
