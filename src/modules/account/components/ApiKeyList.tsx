
import React, { useState, useEffect } from 'react';
import { useAppState } from '@onr/core';
import { AccountService, IAccountApiKey } from '@onr/account';
import { Table, Button, Card, Modal, message, Popconfirm, Icon } from 'antd';

export const ApiKeyList: React.FC = () => {
  const [accountApiKeys, setAccountApiKeys] = useState<IAccountApiKey[] | []>([]);
  const [state] = useAppState();

  const fetchData = async () => {
    const apiKeys = await AccountService.getAccountApiKeys({
      accountId: state.accountId,
    });

    setAccountApiKeys(apiKeys);
  };

  const apiKeysColumns = [
    {
      title: 'Account ID',
      dataIndex: 'account_id',
    },
    {
      title: 'Token ID',
      dataIndex: 'id',
    },
    {
      title: 'API Token',
      dataIndex: 'token',
    },
    {
      title: 'Create at',
      dataIndex: 'created_at',
    },
    {
      title: 'Operations',
      render: (_text: any, apiKey: IAccountApiKey) => {
        return (
          state.accountId && (
            <Popconfirm
              title="If deleted, all apps using this key will no longer have access to this account to post leads."
              onConfirm={async () => deleteToken(apiKey)}
              okText="Delete"
              okType="danger"
              icon={
                <>
                  <div>
                    <Icon type="exclamation-circle" />{' '}
                    <b>Are you sure you want to delete this key ?</b>
                  </div>
                </>
              }
            >
              <a>Delete</a>
            </Popconfirm>
          )
        );
      },
    },
  ];

  useEffect(() => {
    if (state.accountId) {
      fetchData();
    }
  }, [state.accountId]);

  const openAddTokenModal = () => {
    Modal.confirm({
      title: 'Confirm add new token',
      onOk: async () => {
        try {
          const response = await AccountService.createAccountApiKeys({
            accountId: state.accountId,
          });
          message.success(`Token ${response.token} created`);
          fetchData();
        } catch (e) {
          message.error(`Failed to create token${e.message && `: ${e.message}`}`);
        }
      },
      onCancel: () => {},
    });
  };

  const deleteToken = async (apiKey: IAccountApiKey) => {
    if (!apiKey || !apiKey.id) {
      return;
    }

    try {
      await AccountService.deleteAccountApiKeys({
        accountId: state.accountId,
        accountApiKeyId: apiKey.id,
      });
      fetchData();
      message.success(`Token ${apiKey.token} deleted`);
    } catch (e) {
      message.error(`Failed to delete token${e.message && `: ${e.message}`}`);
    }
  };

  return (
    <Card
      title="API Keys"
      extra={
        state.accountId && (
          <Button type="primary" onClick={() => openAddTokenModal()}>
            Add New
          </Button>
        )
      }
    >
      <Table
        data-testid="table"
        rowKey="id"
        size="small"
        columns={apiKeysColumns}
        dataSource={accountApiKeys}
      />
    </Card>
  );
};
