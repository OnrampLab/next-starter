import React, { useState, useContext } from 'react';
import { Switch, Table, Card, Modal, Button, message, Popconfirm } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { IAccount, CreateAccountForm, UpdateAccountForm, AccountService } from '@onr/account';
import { DefaultPubSubContext } from '@onr/core';

interface IAccountListProps {
  accounts: IAccount[];
}

class AccountTable extends Table<IAccount> {}

export const AccountList: React.FC<IAccountListProps> = ({ accounts }: IAccountListProps) => {
  const [currentAccount, setCurrentAccount] = useState<IAccount>(accounts[0]);
  const [createAccountModalVisible, setCreateAccountModalVisible] = useState(false);
  const [updateAccountModalVisible, setUpdateAccountModalVisible] = useState(false);
  const { publish } = useContext(DefaultPubSubContext);

  const logoStyle = {
    maxHeight: '60px',
  };

  const columns: ColumnProps<IAccount>[] = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: 'email_validation_enabled',
      title: 'Email Validation',
      dataIndex: 'email_validation_enabled',
      render: (enabled: bool) => {
        return (
          <Switch checked={enabled} disabled="true" />
        );
      },
    },
    {
      key: 'redirect_domain',
      title: 'Redirect Domain',
      dataIndex: 'redirect_domain',
    },
    {
      key: 'logo',
      title: 'Logo',
      dataIndex: 'logo',
      render: (_text) => {
        return(
          <img src={_text} style={logoStyle}/>
        );
      },
    },
    {
      key: 'signature',
      title: 'Signature',
      dataIndex: 'signature',
    },
    {
      key: 'address',
      title: 'Address',
      dataIndex: 'address',
    },
    {
      key: 'operations',
      title: 'Operations',
      // eslint-disable-next-line react/display-name
      render: (_text, account) => {
        return (
          <span className="operations">
            <a onClick={() => openEditDialog(account)}>Edit</a>
            <Popconfirm
              title="Confirm delete account"
              onConfirm={() => deleteAccount(account)}>
              <a>Delete</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const openCreateDialog = () => {
    setCreateAccountModalVisible(true);
  };

  const openEditDialog = (account: IAccount) => {
    setCurrentAccount(account);
    setUpdateAccountModalVisible(true);
  };

  const deleteAccount = async (account: IAccount) => {
    try {
      if (!account.id) {
        throw new Error('No account id');
      }
      await AccountService.deleteAccount({ accountId: account.id });
      message.success(`Account ${account.name} deleted`);
      publish('account.updated');
    } catch (e) {
      message.error(`Failed to delete account${e.message && `: ${e.message}`}`);
    }
  }

  return (
    <>
      <Card
        title="Accounts"
        extra={
          <Button type="primary" onClick={() => openCreateDialog()}>
            Create Account
          </Button>
        }
      >
        <AccountTable rowKey="id" columns={columns} dataSource={accounts} pagination={false} />
      </Card>

      {createAccountModalVisible && (
        <Modal
          title="Create Account"
          visible={createAccountModalVisible}
          width={600}
          onCancel={() => setCreateAccountModalVisible(false)}
          footer={null}
        >
          <CreateAccountForm onSubmit={() => setCreateAccountModalVisible(false)} />
        </Modal>
      )}

      {updateAccountModalVisible && (
        <Modal
          title="Update Account"
          width={800}
          visible={updateAccountModalVisible}
          onCancel={() => setUpdateAccountModalVisible(false)}
          footer={null}
        >
          <UpdateAccountForm
            currentAccount={currentAccount}
            onSubmit={() => setUpdateAccountModalVisible(false)}
          />
        </Modal>
      )}
    </>
  );
};
