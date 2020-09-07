import React from 'react';
import { Button, Checkbox, Input, message as Message, Row, Spin, Form } from 'antd';
import { Eye, Mail, Triangle } from 'react-feather';

import Link from 'next/link';
import styled from 'styled-components';
import styles from './Signin.module.scss';

import { useAuth, AuthState, login } from '@onr/auth';
import { useDispatch } from 'react-redux';

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

type FormFields = {
  email: string;
  password: string;
  remember: boolean;
};

const INIT_VALUES = {
  email: '',
  password: '',
  remember: true,
};

const EMAIL_RULES = [
  {
    type: 'email',
    message: 'The input is not valid E-mail!',
  },
  {
    required: true,
    message: 'Please input your E-mail!',
  },
];

const PASSWORD_RULES = [{ required: true, message: 'Please input your Password!' }];

const Signin: React.FC = () => {
  const { state } = useAuth(), dispatch = useDispatch();

  async function onFinish(params: FormFields) {
    try {
      await dispatch(login({
        data: {
          email: params.email,
          password: params.password,
        },
      }));
      Message.success('Sign complete. Taking you to your dashboard!');
    } catch (error) {
      Message.error(error.message);
    }
  }

  return (
    <Spin spinning={state === AuthState.Prepare || state === AuthState.Pending || state === AuthState.Authorized}>
      <Row
        align="middle"
        justify="center"
        className="px-3 bg-white mh-page flex"
        style={{ minHeight: '100vh' }}
      >
        <Content>
          <div className="text-center mb-5">
            <Link href="/signin">
              <a className="brand mr-0">
                <Triangle size={32} strokeWidth={1} />
              </a>
            </Link>
            <h5 className="mb-0 mt-3">Sign in</h5>

            <p className={styles.error}>get started with our service</p>
          </div>

          <Form
            layout="vertical"
            onFinish={e => {
              onFinish(e as any);
            }}
            onFinishFailed={err => {
              Message.error(err);
            }}
            initialValues={INIT_VALUES}
          >
            <FormItem
              label="Email"
              name="email"
              rules={EMAIL_RULES}
            >
              <Input
                prefix={<Mail size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="email"
                placeholder="Email"
              />
            </FormItem>

            <FormItem
              label="Password"
              name="password"
              rules={PASSWORD_RULES}
            >
              <Input
                prefix={<Eye size={16} strokeWidth={1} style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            </FormItem>

            <FormItem>
              <FormItem name="remember" noStyle valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </FormItem>
              <Link href="/forgot">
                <a className="text-xs-right">
                  <small>Forgot password</small>
                </a>
              </Link>
              <Button type="primary" htmlType="submit" block className="mt-3">
                Log in
              </Button>
            </FormItem>

            <div className="text-center">
              <small className="text-muted">
                <span>{`Don't have an account yet?`}</span>{' '}
                <Link href="/signup">
                  <a>&nbsp;Create one now!</a>
                </Link>
              </small>
            </div>
          </Form>
        </Content>
      </Row>
    </Spin>
  );
};

export { Signin };
