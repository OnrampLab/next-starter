import React from 'react';
import { Switch, Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { IAccount } from '@onr/account';

interface IAccountFormProps extends FormComponentProps {
  currentAccount: IAccount;
  handleSubmit: (account: IAccount) => void;
}

export const Component: React.FC<IAccountFormProps> = ({
  form,
  currentAccount,
  handleSubmit,
}: IAccountFormProps) => {
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const onSubmit = (e: MouseEvent) => {
    e.preventDefault();

    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);

      handleSubmit(values.account);
      form.resetFields();
    });
  };

  const onEmailValidationChange = (checked: bool): void => {
    currentAccount.email_validation_enabled = checked;
  };

  return (
    <>
      <Form {...formItemLayout} onSubmit={onSubmit}>
        <Form.Item label="Name" hasFeedback>
          {getFieldDecorator('account.name', {
            rules: [{ required: true, message: 'Please input a name!' }],
            initialValue: currentAccount.name,
          })(<Input style={{ width: 400 }} />)}
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

export const AccountForm = Form.create<IAccountFormProps>({
  name: 'account_form',
})(Component);
