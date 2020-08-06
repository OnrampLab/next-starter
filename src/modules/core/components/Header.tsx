import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Layout, Menu, Select, message } from 'antd';
import { BarChart, Settings, Triangle } from 'react-feather';
import Link from 'next/link';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Router from 'next/router';

import { wrapperActions, IWrapperPage, IStore } from '@onr/core';
import { IAccount } from '@onr/account';

import DashHeader from './styles/Header';

const { SubMenu } = Menu;

const MainHeader = (props: IWrapperPage.IProps) => {
  const { setOptionDrawer, setMobileDrawer, setAccountId } = props;
  const state = props;
  const currentUser = useSelector((store: IStore) => store.authStore.currentUser);
  const [accounts, setAccounts] = React.useState<IAccount[]>([]);

  useEffect(() => {
    if (currentUser.accounts) {
      setAccounts(currentUser.accounts);

      if (accounts[0] && !state.accountId) {
        changeAccount(accounts[0].id);
      }
    }
  }, [currentUser.accounts]);

  return (
    <DashHeader>
      <Layout.Header>
        {state.mobile && (
          <a onClick={() => setMobileDrawer()} className="trigger">
            <BarChart size={20} strokeWidth={1} />
          </a>
        )}
        <Link href="/">
          <a className="brand">
            <Triangle size={24} strokeWidth={1} />
            <strong className="mx-1 text-black">{state.name}</strong>
          </a>
        </Link>

        <Select
          showSearch
          style={{ width: 200 }}
          optionFilterProp="children"
          onChange={changeAccount}
          value={state.accountId}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {accounts.map(account => (
            <Select.Option key={account.id} value={account.id}>
              {account.id} | {account.name}
            </Select.Option>
          ))}
        </Select>

        <span className="mr-auto" />

        <Menu mode="horizontal">
          <Menu.Item onClick={() => setOptionDrawer()}>
            <Settings size={20} strokeWidth={1} />
          </Menu.Item>

          <SubMenu title={<Avatar src="/static/images/avatar.jpg" />}>
            <Menu.Item>Settings</Menu.Item>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Divider />
            <Menu.Item>
              <a href="https://one-readme.fusepx.com">Help?</a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Layout.Header>
    </DashHeader>
  );

  function changeAccount(accountId: number) {
    setAccountId(accountId);
    Router.push('/');
    message.info('Account has been changed');
  }
};

const mapStateToProps = (state: IStore) => state.wrapper;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setOptionDrawer: bindActionCreators(wrapperActions.setOptionDrawer, dispatch),
  setMobileDrawer: bindActionCreators(wrapperActions.setMobileDrawer, dispatch),
  setAccountId: bindActionCreators(wrapperActions.setAccountId, dispatch),
});

export const Header = connect(mapStateToProps, mapDispatchToProps)(MainHeader);
