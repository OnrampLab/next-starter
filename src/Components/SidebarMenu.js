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
import { capitalize, lowercase } from '../lib/helpers';
import { useEffect, useState } from 'react';

import DashHeader from './styles/Header';
import Inner from './styles/Sidebar';
import Link from 'next/link';
import Routes from '../lib/routes';
import { useAppState } from './shared/AppProvider';
import { withRouter } from 'next/router';

const { SubMenu } = Menu;
const { Header, Sider } = Layout;

let rootSubMenuKeys = [];

const getKey = (name, index) => {
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

const SidebarContent = ({
  sidebarTheme,
  sidebarMode,
  sidebarIcons,
  collapsed,
  router
}) => {
  const [state, dispatch] = useAppState();
  const [openKeys, setOpenKeys] = useState([]);
  const [appRoutes] = useState(Routes);
  const { pathname } = router;

  const badgeTemplate = badge => <Badge count={badge.value} />;

  useEffect(() => {
    appRoutes.forEach((route, index) => {
      const isCurrentPath =
        pathname.indexOf(lowercase(route.name)) > -1 ? true : false;
      const key = getKey(route.name, index);
      rootSubMenuKeys.push(key);
      if (isCurrentPath) setOpenKeys([...openKeys, key]);
    });
  }, []);

  const onOpenChange = openKeys => {
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
                    {route.badge && badgeTemplate(route.badge)}
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
                    {route.badge && badgeTemplate(route.badge)}
                  </span>
                }
              >
                {route.children.map((subitem, index) => (
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
                        {subitem.badge && badgeTemplate(subitem.badge)}
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
                onConfirm={() => router.push('/signin')}
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
                onChange={checked => dispatch({ type: 'boxed' })}
              />
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
              Boxed view
            </span>
          </List.Item>
          <List.Item
            actions={[
              <Switch
                size="small"
                checked={!!state.darkSidebar}
                disabled={state.weakColor}
                onChange={checked => dispatch({ type: 'sidebarTheme' })}
              />
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
                size="small"
                checked={!!state.sidebarPopup}
                disabled={state.collapsed}
                onChange={checked => dispatch({ type: 'sidebarPopup' })}
              />
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
              Popup sub menus
            </span>
          </List.Item>
          <List.Item
            actions={[
              <Switch
                size="small"
                checked={!!state.sidebarIcons}
                disabled={state.collapsed}
                onChange={checked => dispatch({ type: 'sidebarIcons' })}
              />
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
              Sidebar menu icons
            </span>
          </List.Item>
          <List.Item
            actions={[
              <Switch
                size="small"
                checked={!!state.collapsed}
                onChange={checked => dispatch({ type: 'collapse' })}
              />
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
                size="small"
                checked={!!state.weakColor}
                onChange={checked => dispatch({ type: 'weak', value: checked })}
              />
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
              Weak colors
            </span>
          </List.Item>
        </Drawer>
      </Inner>
    </>
  );
};

export default withRouter(SidebarContent);
