import React from 'react';
import { message } from 'antd';
import { DefaultPubSubContext, usePubSub } from '@onr/core';
import { IAccount, AccountForm, AccountService } from '@onr/account';

interface CreateAccountFormProps {
  onSubmit(): void;
}

export const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  onSubmit,
}: CreateAccountFormProps) => {
  const { publish } = usePubSub(DefaultPubSubContext);
  const currentAccount: Partial<IAccount> = {};

  async function handleSubmit(Account: IAccount) {
    await AccountService.createAccount({
      data: Account,
    });

    message.info(`Account ${Account.name} created`);
    publish('account.updated');

    if (onSubmit) {
      onSubmit();
    }
  }

  return <AccountForm currentAccount={currentAccount} handleSubmit={handleSubmit} />;
};
