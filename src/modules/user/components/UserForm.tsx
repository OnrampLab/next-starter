import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, Input, Spin, Select, Transfer } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { IUser, UserRoleName, UserRequestPayload } from '@onr/user';
import { IStore } from '@onr/core';
import { FormProps } from 'antd/lib/form';
import { TransferItem } from 'antd/lib/transfer';
import { IAccount } from '@onr/account';

interface IUserFormProps extends FormProps {
  currentUser: IUser;
  handleSubmit(user: UserRequestPayload): Promise<void>;
}

const layout = {
  form: {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  },
  submit: {
    wrapperCol: { span: 12, offset: 6 },
  },
};

const UserForm: React.FC<IUserFormProps> = ({ currentUser, handleSubmit }: IUserFormProps) => {
  const [loading, setLoading] = useState(false);
  const accounts: IAccount[] = useSelector((store: IStore) => store.accountStore.accounts);

  const onFinish = async (values: { user: UserRequestPayload['data'] }) => {
    console.log('Received values of form: ', values);
    setLoading(true);
    const formData = values.user;
    Object.keys(formData).forEach(key => {
      formData[key as keyof typeof formData] || delete formData[key as keyof typeof formData];
    });
    formData.accounts = formData.accounts.map(accountId => +accountId);
    await handleSubmit({ data: formData });

    setLoading(false);
  };

  const isCreateForm = Object.keys(currentUser).length === 0;

  return (
    <Spin spinning={loading}>
      <Form
        {...layout.form}
        onFinish={async values => onFinish(values as Parameters<typeof onFinish>[0])}
        initialValues={{
          ...currentUser,
          roles: currentUser?.roles?.map(role => role.name) || [],
          accounts: currentUser?.accounts?.map(x => `${x.id}`) || [],
        }}
      >
        <Form.Item
          label="Name"
          name={['user', 'name']}
          hasFeedback
          {...{
            rules: [{ required: true, message: 'Please input name!', type: 'string' }],
            initialValue: currentUser.name,
          }}
        >
          <Input style={{ width: 300 }} />
        </Form.Item>

        <Form.Item
          label="Email"
          name={['user', 'email']}
          hasFeedback
          {...{
            rules: [{ required: true, message: 'Please input email!', type: 'email' }],
            initialValue: currentUser.email,
          }}
        >
          <Input style={{ width: 300 }} />
        </Form.Item>

        <Form.Item
          label="Password"
          name={['user', 'password']}
          hasFeedback
          {...{
            rules: [{ required: isCreateForm, message: 'Please input password!', type: 'string' }],
            initialValue: null,
          }}
        >
          <Input.Password
            style={{ width: 300 }}
            iconRender={(visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item label="Roles" hasFeedback rules={[{ required: false, type: 'array' }]}>
          <Select mode="multiple" style={{ width: 300 }}>
            {Object.entries(UserRoleName).map((ele, i) => {
              <Select.Option key={i.toString()} value={ele[1]}>
                {ele[1].replace('-', ' ')}
              </Select.Option>;
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Accounts"
          hasFeedback
          name={['user', 'accounts']}
          rules={[{ type: 'array' }]}
          valuePropName="targetKeys"
        >
          <Transfer
            listStyle={{
              width: 250,
            }}
            dataSource={accounts.map(account => {
              const transferItem: TransferItem = {
                key: `${account.id}`,
                title: account.name,
              };
              return transferItem;
            })}
            titles={['Available Accounts', 'My Accounts']}
            render={item => item.title || ''}
          />
        </Form.Item>

        <Form.Item {...layout.submit}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export { UserForm };
