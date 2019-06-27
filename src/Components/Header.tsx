import { Avatar, Badge, Layout, List, Menu } from 'antd';
import {
  BarChart,
  Bell,
  ChevronsDown,
  Maximize,
  Minimize,
  Settings,
  Triangle
} from 'react-feather';
import Link from 'next/link';
import { useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IWrapperPage, IStore } from '@Interfaces';
import { WrapperActions } from '@Actions';

import DashHeader, { Notification } from './styles/Header';

const { SubMenu } = Menu;
const { Header } = Layout;

const MainHeader = (props: IWrapperPage.IProps) => {
  const { dispatch } = props;
  const state = props;
  const [notifications] = useState([]);
  return (
    <DashHeader>
      <Header>
        {state.mobile && (
          <a
            onClick={() => dispatch({ type: 'mobileDrawer' })}
            className="trigger"
          >
            <BarChart size={20} strokeWidth={1} />
          </a>
        )}
        <Link href="/">
          <a className="brand">
            <Triangle size={24} strokeWidth={1} />
            <strong className="mx-1 text-black">{state.name}</strong>
          </a>
        </Link>

        <Menu mode="horizontal" className="menu-divider">
          {!state.mobile && (
            <Menu.Item>
              <Link href="/apps/calendar">
                <a>Calendar</a>
              </Link>
            </Menu.Item>
          )}

          {state.mobile && (
            <SubMenu title={<ChevronsDown size={20} strokeWidth={1} />}>
              <Menu.Item>Calendar</Menu.Item>
            </SubMenu>
          )}
        </Menu>

        <span className="mr-auto" />

        <Menu mode="horizontal">
          {!state.mobile && (
            <Menu.Item onClick={() => dispatch({ type: 'fullscreen' })}>
              {!state.fullscreen ? (
                <Maximize size={20} strokeWidth={1} />
              ) : (
                <Minimize size={20} strokeWidth={1} />
              )}
            </Menu.Item>
          )}
          <Menu.Item onClick={() => dispatch(WrapperActions.ToggleOptionDrawer())}>
            <Settings size={20} strokeWidth={1} />
          </Menu.Item>
          <SubMenu
            title={
              <Badge count={notifications.length}>
                <span className="submenu-title-wrapper">
                  <Bell size={20} strokeWidth={1} />
                </span>
              </Badge>
            }
          >
            <Menu.Item
              className="p-0 bg-transparent"
              style={{ height: 'auto' }}
            >
              <List
                className="header-notifications"
                itemLayout="horizontal"
                dataSource={notifications}
                footer={<div>{notifications.length} Notifications</div>}
                renderItem={(item: any) => (
                  <Notification>
                    <List.Item>
                      <List.Item.Meta
                        avatar={item.avatar}
                        title={<a href="javascript:;">{item.title}</a>}
                        description={<small>{item.description}</small>}
                      />
                    </List.Item>
                  </Notification>
                )}
              />
            </Menu.Item>
          </SubMenu>

          <SubMenu title={<Avatar src="/static/images/avatar.jpg" />}>
            <Menu.Item>Settings</Menu.Item>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item>Notifications</Menu.Item>
            <Menu.Divider />
            <Menu.Item>
              <Link href="https://one-readme.fusepx.com">
                <a>Help?</a>
              </Link>
            </Menu.Item>
            <Menu.Item>Signout</Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
    </DashHeader>
  );
};

const mapStateToProps = (state: IStore) => state.wrapper;

export default connect(mapStateToProps)(MainHeader);
