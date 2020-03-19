import React from 'react';
import '@ant-design/compatible/assets/index.css';
import { Button, Checkbox, Input, message as Message, Row, Spin, Form } from 'antd';
import { Eye, Mail, Triangle } from 'react-feather';

import Link from 'next/link';
import styled from 'styled-components';
import styles from './Signin.module.scss';

import { useAuth, AuthState } from './Auth';

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

const Signin: React.FC = () => {
  const auth = useAuth();

  async function onFinish(params: FormFields) {
    try {
      await auth.login({
        params: {
          email: params.email,
          password: params.password,
        },
      });
      Message.success('Sign complete. Taking you to your dashboard!');
    } catch (error) {
      Message.error(error.message);
    }
  }

  return (
    <Spin spinning={auth.authState === AuthState.Prepare}>
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
            initialValues={{
              email: '',
              password: '',
              remember: true,
            }}
          >
            <FormItem
              label="Email"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
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
              rules={[{ required: true, message: 'Please input your Password!' }]}
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
