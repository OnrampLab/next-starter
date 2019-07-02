import { Button, Checkbox, Form, Input, Message, Row } from 'antd';
import { Eye, Mail, Triangle } from 'react-feather';

import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';

import { AuthService } from '@Services';

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

const Signin = ({ form }) => (
  <Row
    type="flex"
    align="middle"
    justify="center"
    className="px-3 bg-white mh-page"
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

        <p className="text-muted">get started with our service</p>
      </div>

      <Form
        layout="vertical"
        onSubmit={e => {
          e.preventDefault();
          form.validateFields((err, values) => {
            if (!err) {
              AuthService.login({
                params: {
                  email: form.email,
                  password: form.password,
                }
              })
              .then((response) => {
                Message.success(
                  'Sign complete. Taking you to your dashboard!'
                ).then(() => Router.push('/'));
              })
              .catch((error) => {
                Message.success(
                  `Sign error: ${error.message}`
                );
              });
            }
          });
        }}
      >
        <FormItem label="Email">
          {form.getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]
          })(
            <Input
              prefix={
                <Mail
                  size={16}
                  strokeWidth={1}
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />
              }
              type="email"
              placeholder="Email"
            />
          )}
        </FormItem>

        <FormItem label="Password">
          {form.getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={
                <Eye
                  size={16}
                  strokeWidth={1}
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />
              }
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>

        <FormItem>
          {form.getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
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
            <span>Don't have an account yet?</span>{' '}
            <Link href="/signup">
              <a>&nbsp;Create one now!</a>
            </Link>
          </small>
        </div>
      </Form>
    </Content>
  </Row>
);

export default Form.create()(Signin);
