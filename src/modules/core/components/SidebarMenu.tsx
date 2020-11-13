import {
  Avatar,
  Badge,
  Divider,
  Drawer,
  Dropdown,
  Layout,
  List,
  Menu,
  Popconfirm,
  Row,
  Switch,
  Tooltip,
} from 'antd';
import { Book, LogOut, Triangle } from 'react-feather';
import React, { useEffect } from 'react';
import { withRouter, NextRouter } from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IUser } from '@onr/user';

import DashHeader from './styles/Header';
import Inner from './styles/Sidebar';
import { capitalize, lowercase } from '../../../lib/helpers';

import { wrapperActions, IWrapperPage, IStore } from '@onr/core';
import { useAuth, logout } from '@onr/auth';
import { MenuItem } from '@app';

import { useDispatch } from 'react-redux';

declare type WithRouterProps = {
  router: NextRouter;
};

/* eslint-disable complexity  */
interface ISidebarMenuProps extends IWrapperPage.IProps, WithRouterProps {
  sidebarTheme: 'dark' | 'light';
  sidebarMode: 'vertical' | 'inline';
  menuItems: MenuItem[];
  currentUser: IUser;
}

const { SubMenu } = Menu;
const { Header, Sider } = Layout;

const rootSubMenuKeys: string[] = [];

const getKey = (name: string, index: number) => {
  const string = `${name}-${index}`;
  const key = string.replace(' ', '-');
  return key.charAt(0).toLowerCase() + key.slice(1);
};

const UserMenu = (
  <Menu>
    <Menu.Item>Settings</Menu.Item>
    <Menu.Item>Profile</Menu.Item>
  </Menu>
);

const SidebarContent = (props: ISidebarMenuProps) => {
  const {
    menuItems,
    sidebarTheme,
    sidebarMode,
    sidebarIcons,
    collapsed,
    router,
    currentUser,
    setOptionDrawer,
    setMobileDrawer,
    setBoxed,
    setSidebarTheme,
    setSidebarPopup,
    setSidebarIcons,
    setCollapse,
    setWeak,
  } = props;
  const state = props;
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);
  const [appRoutes, setAppRoutes] = React.useState(menuItems);
  const { pathname = '' } = router || {};
  const dispatch = useDispatch();

  useEffect(() => {
    const roles = currentUser.roles || [];
    setAppRoutes(
      menuItems.filter(route => {
        if (!route.roles) {
          return true;
        }
        for (const role of route.roles) {
          if (roles.map(x => x.name).indexOf(role) !== -1) {
            return true;
          }
        }
        return false;
      }),
    );
  }, [currentUser?.roles]);

  React.useEffect(() => {
    appRoutes.forEach((route, index) => {
      const isCurrentPath = pathname.indexOf(lowercase(route.name)) > -1 ? true : false;
      const key = getKey(route.name, index);
      rootSubMenuKeys.push(key);
      if (isCurrentPath) setOpenKeys([...openKeys, key]);
    });
  }, []);

  const onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.slice(-1);
    if (rootSubMenuKeys.includes(latestOpenKey[0])) {
      setOpenKeys([...latestOpenKey]);
    } else {
      setOpenKeys(latestOpenKey ? [...latestOpenKey] : []);
    }
  };

  const menu = (
    <>
      <Menu
        theme={sidebarTheme}
        className="border-0 scroll-y"
        style={{ flex: 1, height: '100%' }}
        mode={sidebarMode}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        {appRoutes.map((route, index) => {
          const hasChildren = route.children ? true : false;
          if (!hasChildren)
            return (
              <Menu.Item
                key={getKey(route.name, index)}
                className={pathname === route.path ? 'ant-menu-item-selected' : ''}
                onClick={() => {
                  setOpenKeys([getKey(route.name, index)]);
                  if (state.mobile) setMobileDrawer();
                }}
              >
                <Link href={route.path}>
                  <a>
                    {sidebarIcons && <span className="anticon">{route.icon}</span>}
                    <span className="mr-auto">{capitalize(route.name)}</span>
                  </a>
                </Link>
              </Menu.Item>
            );

          if (hasChildren)
            return (
              <SubMenu
                key={getKey(route.name, index)}
                title={
                  <span>
                    {sidebarIcons && <span className="anticon">{route.icon}</span>}
                    <span>{capitalize(route.name)}</span>
                  </span>
                }
              >
                {route.children &&
                  route.children.map((subitem, index) => (
                    <Menu.Item
                      key={getKey(subitem.name, index)}
                      className={pathname === subitem.path ? 'ant-menu-item-selected' : ''}
                      onClick={() => {
                        if (state.mobile) setMobileDrawer();
                      }}
                    >
                      <Link href={`${subitem.path ? subitem.path : ''}`}>
                        <a>
                          <span className="mr-auto">{capitalize(subitem.name)}</span>
                        </a>
                      </Link>
                    </Menu.Item>
                  ))}
              </SubMenu>
            );
        })}
      </Menu>

      <Divider
        className={`m-0`}
        style={{
          display: `${sidebarTheme === 'dark' ? 'none' : ''}`,
        }}
      />
      <div className={`py-3 px-4 bg-${sidebarTheme}`}>
        <Row type="flex" align="middle" justify="space-around">
          <Dropdown overlay={UserMenu}>
            <span>
              <Badge
                count={6}
                overflowCount={5}
                style={{
                  color: 'rgb(245, 106, 0)',
                  backgroundColor: 'rgb(253, 227, 207)',
                }}
              >
                <Avatar shape="circle" size={40} src="/static/images/avatar.jpg" />
              </Badge>
            </span>
          </Dropdown>
          {!collapsed && (
            <>
              <span className="mr-auto" />
              <a
                className={`px-3 ${sidebarTheme === 'dark' ? 'text-white' : 'text-body'}`}
                href="https://one-readme.fusepx.com"
              >
                <Tooltip title="Help">
                  <Book size={20} strokeWidth={1} />
                </Tooltip>
              </a>

              <Popconfirm
                placement="top"
                title="Are you sure you want to sign out?"
                onConfirm={() => dispatch(logout())}
                okText="Yes"
                cancelText="Cancel"
              >
                <a className={`px-3 ${sidebarTheme === 'dark' ? 'text-white' : 'text-body'}`}>
                  <LogOut size={20} strokeWidth={1} />
                </a>
              </Popconfirm>
            </>
          )}
        </Row>
      </div>
    </>
  );

  const InnerDivStyle: React.CSSProperties = {
    overflow: 'hidden',
    flex: '1 1 auto',
    flexDirection: 'column',
    display: 'flex',
    height: '100vh',
  };

  const ListItemSpanStylye: React.CSSProperties = {
    WebkitBoxFlex: 1,
    WebkitFlex: '1 0',
    msFlex: '1 0',
    flex: '1 0',
  };

  return (
    <>
      <Inner>
        {!state.mobile && (
          <Sider
            width={240}
            className={`bg-${sidebarTheme}`}
            theme={sidebarTheme}
            collapsed={collapsed}
          >
            {menu}
          </Sider>
        )}

        <Drawer
          closable={false}
          width={240}
          placement="left"
          onClose={() => setMobileDrawer()}
          visible={state.mobileDrawer}
          className="chat-drawer"
        >
          <Inner>
            <div style={InnerDivStyle}>
              <DashHeader>
                <Header>
                  <Link href="/">
                    <a className="brand">
                      <Triangle size={24} strokeWidth={1} />
                      <strong
                        className="mx-1"
                        style={{
                          display: 'inline',
                        }}
                      >
                        {state.name}
                      </strong>
                    </a>
                  </Link>
                </Header>
              </DashHeader>
              {menu}
            </div>
          </Inner>
        </Drawer>

        <Drawer
          title="Settings"
          placement="right"
          closable={true}
          width={300}
          onClose={() => setOptionDrawer()}
          visible={state.optionDrawer}
        >
          <List.Item
            actions={[
              <Switch key={1} size="small" checked={!!state.boxed} onChange={() => setBoxed()} />,
            ]}
          >
            <span style={ListItemSpanStylye}>Boxed view</span>
          </List.Item>
          <List.Item
            actions={[
              <Switch
                key={1}
                size="small"
                checked={!!state.darkSidebar}
                disabled={state.weakColor}
                onChange={() => setSidebarTheme()}
              />,
            ]}
          >
            <span style={ListItemSpanStylye}>Dark sidebar menu</span>
          </List.Item>
          <List.Item
            actions={[
              <Switch
                size="small"
                checked={!!state.sidebarPopup}
                disabled={state.collapsed}
                onChange={() => setSidebarPopup()}
                key={1}
              />,
            ]}
          >
            <span style={ListItemSpanStylye}>Popup sub menus</span>
          </List.Item>
          <List.Item
            actions={[
              <Switch
                key={1}
                size="small"
                checked={!!state.sidebarIcons}
                disabled={state.collapsed}
                onChange={() => setSidebarIcons()}
              />,
            ]}
          >
            <span style={ListItemSpanStylye}>Sidebar menu icons</span>
          </List.Item>
          <List.Item
            actions={[
              <Switch
                key={1}
                size="small"
                checked={!!state.collapsed}
                onChange={() => setCollapse()}
              />,
            ]}
          >
            <span style={ListItemSpanStylye}>Collapsed sidebar menu</span>
          </List.Item>
          <List.Item
            actions={[
              <Switch
                key={1}
                size="small"
                checked={!!state.weakColor}
                onChange={() => setWeak()}
              />,
            ]}
          >
            <span style={ListItemSpanStylye}>Weak colors</span>
          </List.Item>
        </Drawer>
      </Inner>
    </>
  );
};

const mapStateToProps = (state: IStore) => state.wrapper;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setOptionDrawer: bindActionCreators(wrapperActions.setOptionDrawer, dispatch),
  setMobileDrawer: bindActionCreators(wrapperActions.setMobileDrawer, dispatch),
  setBoxed: bindActionCreators(wrapperActions.setBoxed, dispatch),
  setSidebarTheme: bindActionCreators(wrapperActions.setSidebarTheme, dispatch),
  setSidebarPopup: bindActionCreators(wrapperActions.setSidebarPopup, dispatch),
  setSidebarIcons: bindActionCreators(wrapperActions.setSidebarIcons, dispatch),
  setCollapse: bindActionCreators(wrapperActions.setCollapse, dispatch),
  setWeak: bindActionCreators(wrapperActions.setWeak, dispatch),
});

export const SidebarMenu = withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarContent));
