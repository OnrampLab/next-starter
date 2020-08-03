import React from 'react';
import { message } from 'antd';
import { DefaultPubSubContext, usePubSub } from '@onr/core';
import { IAccount, AccountForm, AccountService } from '@onr/account';

interface UpdateAccountFormProps {
  currentAccount: IAccount;
  onSubmit(): void;
}

export const UpdateAccountForm: React.FC<UpdateAccountFormProps> = ({
  onSubmit,
  currentAccount,
}: UpdateAccountFormProps) => {
  const { publish } = usePubSub(DefaultPubSubContext);

  async function handleSubmit(account: IAccount) {
    await AccountService.updateAccount({
      accountId: currentAccount.id!,
      data: account,
    });

    message.info(`Account ${account.name} updated`);
    publish('account.updated');

    if (onSubmit) {
      onSubmit();
    }
  }

  return <AccountForm currentAccount={currentAccount} handleSubmit={handleSubmit} />;
};
