import React from 'react';
import { Switch, Form, Input, Button } from 'antd';
import { FormProps } from 'antd/lib/form';
import { IAccount } from '@onr/account';

interface IAccountFormProps extends FormProps {
  currentAccount: Partial<IAccount>;
  handleSubmit: (account: IAccount) => void;
}

export const AccountForm: React.FC<IAccountFormProps> = ({
  form,
  currentAccount,
  handleSubmit,
}: IAccountFormProps) => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const onSubmit = (values: { account: IAccount }) => {
    handleSubmit(values.account);
    console.log('Received values of form: ', values);

    form?.resetFields();
  };

  return (
    <>
      <Form
        {...formItemLayout}
        onFinish={v => onSubmit(v as { account: IAccount })}
        initialValues={{
          account: {
            ...currentAccount,
            redirect_domain: currentAccount.redirect_domain || 'https://g17.net',
          },
        }}
      >
        <Form.Item
          label="Name"
          hasFeedback
          name={['account', 'name']}
          {...{
            rules: [{ required: true, message: 'Please input a name!' }],
          }}
        >
          <Input style={{ width: 400 }} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
