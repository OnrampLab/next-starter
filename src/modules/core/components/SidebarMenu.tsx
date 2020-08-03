import * as React from 'react';
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
} from 'antd';
import { Settings, LogOut, Triangle } from 'react-feather';
import Link from 'next/link';
import { capitalize } from '../../../lib/helpers';
import { has } from 'lodash';

import DashHeader from './styles/Header';
import Inner from './styles/Sidebar';
import { useAppState } from '@onr/core';
// import { IUser } from '@onr/user';
import { useAuth } from '@onr/auth';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';

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
    <Menu.Item>
      <Link href="/profile">
        <a>Profile</a>
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a href="https://one-readme.fusepx.com" target="_blank">
        Help?
      </a>
    </Menu.Item>
  </Menu>
);

interface ISidebarMenuProps {
  sidebarTheme: 'dark' | 'light';
  sidebarMode: 'vertical' | 'inline';
  sidebarIcons: boolean;
  collapsed: boolean;
  menuItems: any[];
  router?: any;
  // currentUser: IUser;
}

export const SidebarMenu: React.FC<ISidebarMenuProps> = ({
  sidebarTheme,
  sidebarMode,
  sidebarIcons,
  collapsed,
  menuItems,
  // currentUser,
}: ISidebarMenuProps) => {
  const [state, dispatch] = useAppState();
  const [accountId, setAccountId] = React.useState(state.accountId);
  const [currentUserRoles, setCurrentUserRoles] = React.useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);
  const [appRoutes] = React.useState(menuItems);
  const { pathname } = useRouter();
  const auth = useAuth();

  // useEffect(() => {
  //   if (currentUser.roles) {
  //     setCurrentUserRoles(currentUser.roles.map(x => x.name));
  //   }
  // }, [currentUser.roles]);

  useEffect(() => {
    appRoutes.forEach((route, index) => {
      const key = getKey(route.name, index);
      const routePaths = has(route, 'children')
        ? route.children.map((child: any) => child.path)
        : [route.path];
      const isCurrentPath = routePaths.find((path: string) => path === pathname) ? true : false;

      rootSubMenuKeys.push(key);

      if (isCurrentPath) {
        setOpenKeys([key]);
      }
    });

    // When account changed, need to reset selected keys and open keys of menu
    if (accountId && accountId !== state.accountId) {
      const homeKey = getKey('Home', 0);

      setSelectedKeys([homeKey]);
      setOpenKeys([]);
      setAccountId(state.accountId);
    }
  }, [state.accountId]);

  const onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.slice(-1);

    if (rootSubMenuKeys.indexOf(latestOpenKey[0]) === -1) {
      setOpenKeys([...latestOpenKey]);
    } else {
      setOpenKeys(latestOpenKey ? [...latestOpenKey] : []);
    }
  };

  const onSelect = (params: { selectedKeys: string[] }) => {
    setSelectedKeys(params.selectedKeys);
  };

  const SideMenu = (
    <>
      <Menu
        theme={sidebarTheme}
        mode={sidebarMode}
        className="border-0 scroll-y"
        style={{ flex: 1, height: '100%', paddingTop: '15px' }}
        selectedKeys={selectedKeys}
        onSelect={onSelect}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        {appRoutes
          .filter(route => {
            if (!route.roles) {
              return true;
            }
            for (const role of route.roles) {
              if (currentUserRoles.indexOf(role) !== -1) {
                return true;
              }
            }
            return false;
          })
          .map((route, index) => {
            const isDivider = route.name === 'divider';
            const hasChildren = route.children ? true : false;

            if (isDivider) {
              return (
                <Divider
                  key={getKey(route.name, index)}
                  className={`m-2`}
                  style={{
                    display: `${sidebarTheme === 'dark' ? 'none' : ''}`,
                  }}
                />
              );
            }

            if (hasChildren) {
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
                  {route.children.map((subitem: any, index: number) => (
                    <Menu.Item
                      key={getKey(subitem.name, index)}
                      className={pathname === subitem.path ? 'ant-menu-item-selected' : ''}
                      onClick={() => {
                        if (state.mobile) dispatch({ type: 'mobileDrawer' });
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
            }

            return (
              <Menu.Item
                key={getKey(route.name, index)}
                className={pathname === route.path ? 'ant-menu-item-selected' : ''}
                onClick={() => {
                  setOpenKeys([getKey(route.name, index)]);
                  if (state.mobile) dispatch({ type: 'mobileDrawer' });
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
                onClick={() => dispatch({ type: 'options' })}
              >
                <Settings size={20} strokeWidth={1} />
              </a>

              <Popconfirm
                placement="top"
                title="Are you sure you want to sign out?"
                onConfirm={() =>
                  auth.logout().then(() => {
                    Router.push('/signin');
                  })
                }
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
            {SideMenu}
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
              css={`
                overflow: hidden;
                flex: 1 1 auto;
                flex-direction: column;
                display: flex;
                height: 100vh;
              `}
            >
              <DashHeader>
                <Header>
                  <Link href="/">
                    <a className="brand">
                      <Triangle size={24} strokeWidth={1} />
                      <strong
                        className="mx-1"
                        css={`
                          display: inline;
                        `}
                      >
                        {state.name}
                      </strong>
                    </a>
                  </Link>
                </Header>
              </DashHeader>
              {SideMenu}
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
                key="collapsed-sidebar-menu-switch"
                size="small"
                checked={!!state.collapsed}
                onChange={() => dispatch({ type: 'collapse' })}
              />,
            ]}
          >
            <span
              css={`
                -webkit-box-flex: 1;
                -webkit-flex: 1 0;
                -ms-flex: 1 0;
                flex: 1 0;
              `}
            >
              Collapsed sidebar menu
            </span>
          </List.Item>
          <List.Item
            actions={[
              <Switch
                key="dark-sidebar-menu-switch"
                size="small"
                checked={!!state.darkSidebar}
                disabled={state.weakColor}
                onChange={() => dispatch({ type: 'sidebarTheme' })}
              />,
            ]}
          >
            <span
              css={`
                -webkit-box-flex: 1;
                -webkit-flex: 1 0;
                -ms-flex: 1 0;
                flex: 1 0;
              `}
            >
              Dark sidebar menu
            </span>
          </List.Item>
          <List.Item
            actions={[
              <Switch
                key="dark-mode-switch"
                size="small"
                checked={!!state.weakColor}
                onChange={checked => dispatch({ type: 'weak', value: checked })}
              />,
            ]}
          >
            <span
              css={`
                -webkit-box-flex: 1;
                -webkit-flex: 1 0;
                -ms-flex: 1 0;
                flex: 1 0;
              `}
            >
              Dark mode
            </span>
          </List.Item>
        </Drawer>
      </Inner>
    </>
  );
};
