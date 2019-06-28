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
  Tooltip
} from 'antd';
import { Book, LogOut, Triangle } from 'react-feather';
import { useEffect, useState } from 'react';
import { withRouter, WithRouterProps } from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';

import DashHeader from './styles/Header';
import Inner from './styles/Sidebar';
import Routes from '../lib/routes';
import { capitalize, lowercase } from '../lib/helpers';

import { IWrapperPage, IStore } from '@Interfaces';

interface ISidebarMenuProps extends IWrapperPage.IProps, WithRouterProps {
  sidebarTheme: 'dark' | 'light';
  sidebarMode: 'vertical' | 'inline';
}

const { SubMenu } = Menu;
const { Header, Sider } = Layout;

let rootSubMenuKeys: any[] = [];

const getKey = (name: string, index: number) => {
  const string = `${name}-${index}`;
  let key = string.replace(' ', '-');
  return key.charAt(0).toLowerCase() + key.slice(1);
};

const UserMenu = (
  <Menu>
    <Menu.Item>Settings</Menu.Item>
    <Menu.Item>Profile</Menu.Item>
    <Menu.Item>Notifications</Menu.Item>
  </Menu>
);

const SidebarContent = (props: ISidebarMenuProps) => {
  const {
    sidebarTheme,
    sidebarMode,
    sidebarIcons,
    collapsed,
    router,
    dispatch,
  } = props;
  const state = props;
  const [openKeys, setOpenKeys] = useState<Array<string>>([]);
  const [appRoutes] = useState(Routes);
  const { pathname = '' } = router || {};

  useEffect(() => {
    appRoutes.forEach((route, index) => {
      const isCurrentPath =
        pathname.indexOf(lowercase(route.name)) > -1 ? true : false;
      const key = getKey(route.name, index);
      rootSubMenuKeys.push(key);
      if (isCurrentPath) setOpenKeys([...openKeys, key]);
    });
  }, []);

  const onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.slice(-1);
    if (rootSubMenuKeys.indexOf(latestOpenKey) === -1) {
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
                className={
                  pathname === route.path ? 'ant-menu-item-selected' : ''
                }
                onClick={() => {
                  setOpenKeys([getKey(route.name, index)]);
                  if (state.mobile) dispatch({ type: 'mobileDrawer' });
                }}
              >
                <Link href={route.path} prefetch>
                  <a>
                    {sidebarIcons && (
                      <span className="anticon">{route.icon}</span>
                    )}
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
                    {sidebarIcons && (
                      <span className="anticon">{route.icon}</span>
                    )}
                    <span>{capitalize(route.name)}</span>
                  </span>
                }
              >
                {route.children && route.children.map((subitem, index) => (
                  <Menu.Item
                    key={getKey(subitem.name, index)}
                    className={
                      pathname === subitem.path ? 'ant-menu-item-selected' : ''
                    }
                    onClick={() => {
                      if (state.mobile) dispatch({ type: 'mobileDrawer' });
                    }}
                  >
                    <Link href={`${subitem.path ? subitem.path : ''}`} prefetch>
                      <a>
                        <span className="mr-auto">
                          {capitalize(subitem.name)}
                        </span>
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
          display: `${sidebarTheme === 'dark' ? 'none' : ''}`
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
                  backgroundColor: 'rgb(253, 227, 207)'
                }}
              >
                <Avatar
                  shape="circle"
                  size={40}
                  src="/static/images/avatar.jpg"
                />
              </Badge>
            </span>
          </Dropdown>
          {!collapsed && (
            <>
              <span className="mr-auto" />
              <Link href="https://one-readme.fusepx.com">
                <a
                  className={`px-3 ${
                    sidebarTheme === 'dark' ? 'text-white' : 'text-body'
                  }`}
                >
                  <Tooltip title="Help">
                    <Book size={20} strokeWidth={1} />
                  </Tooltip>
                </a>
              </Link>

              <Popconfirm
                placement="top"
                title="Are you sure you want to sign out?"
                onConfirm={() => router && router.push('/signin')}
                okText="Yes"
                cancelText="Cancel"
              >
                <a
                  className={`px-3 ${
                    sidebarTheme === 'dark' ? 'text-white' : 'text-body'
                  }`}
                >
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
          onClose={() => dispatch({ type: 'mobileDrawer' })}
          visible={state.mobileDrawer}
          className="chat-drawer"
        >
          <Inner>
            <div
              style={InnerDivStyle}
            >
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
          onClose={() => dispatch({ type: 'options' })}
          visible={state.optionDrawer}
        >
          <List.Item
            actions={[
              <Switch
                size="small"
                checked={!!state.boxed}
                onChange={() => dispatch({ type: 'boxed' })}
              />
            ]}
          >
            <span style={ListItemSpanStylye}>
              Boxed view
            </span>
          </List.Item>
          <List.Item
            actions={[
              <Switch
                size="small"
                checked={!!state.darkSidebar}
                disabled={state.weakColor}
                onChange={() => dispatch({ type: 'sidebarTheme' })}
              />
            ]}
          >
            <span style={ListItemSpanStylye}>
              Dark sidebar menu
            </span>
          </List.Item>
          <List.Item
            actions={[
              <Switch
                size="small"
                checked={!!state.sidebarPopup}
                disabled={state.collapsed}
                onChange={() => dispatch({ type: 'sidebarPopup' })}
              />
            ]}
          >
            <span style={ListItemSpanStylye}>
              Popup sub menus
            </span>
          </List.Item>
          <List.Item
            actions={[
              <Switch
                size="small"
                checked={!!state.sidebarIcons}
                disabled={state.collapsed}
                onChange={() => dispatch({ type: 'sidebarIcons' })}
              />
            ]}
          >
            <span style={ListItemSpanStylye}>
              Sidebar menu icons
            </span>
          </List.Item>
          <List.Item
            actions={[
              <Switch
                size="small"
                checked={!!state.collapsed}
                onChange={() => dispatch({ type: 'collapse' })}
              />
            ]}
          >
            <span style={ListItemSpanStylye}>
              Collapsed sidebar menu
            </span>
          </List.Item>
          <List.Item
            actions={[
              <Switch
                size="small"
                checked={!!state.weakColor}
                onChange={() => dispatch({ type: 'weak', value: 'checked' })}
              />
            ]}
          >
            <span style={ListItemSpanStylye}>
              Weak colors
            </span>
          </List.Item>
        </Drawer>
      </Inner>
    </>
  );
};

const mapStateToProps = (state: IStore) => state.wrapper;

export default withRouter(connect(mapStateToProps)(SidebarContent));
