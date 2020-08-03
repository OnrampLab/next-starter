import React, { useEffect, useState, useContext } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { useRouter } from 'next/router';
import { Layout, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { IStore, useAppState } from '@onr/core';
import { authActions } from '@onr/auth';
import { DefaultPubSubContext } from '@onr/core';

import Header from './Header';
import { SidebarMenu } from './SidebarMenu';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/GlobalStyles';
import { Container, Inner } from './styles/Page';

import { IWrapperPage, IStore } from '@onr/core';

const { Content } = Layout;

const NonDashboardRoutes = [
  '/auth/signin',
  '/auth/signup',
  '/forgot',
  '/lockscreen',
  '/_error',
];

interface IPageProps {
  routes: any;
}

/* eslint-disable complexity*/
const Component = ({ children, routes }: IPageProps) => {
  const dispatch = useDispatch();
  // const currentUser = useSelector((store: IStore) => store.authStore.currentUser);
  const context = useContext(DefaultPubSubContext);

  const [loading, setLoading] = useState(true);
  const [state] = useAppState();
  const { pathname } = useRouter();
  const isNotDashboard = NonDashboardRoutes.includes(pathname);
  // const { router, menuItems, children } = props;
  // const [loading, setLoading] = useState(true);
  // const isNotDashboard = router && NonDashboardRoutes.includes(router.pathname);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);

  return (
    <Spin tip="Loading..." size="large" spinning={loading}>
      <ThemeProvider theme={theme}>
        <Container
          className={`${state.weakColor ? 'weakColor' : ''} ${
            state.boxed ? 'boxed shadow-sm' : ''
          }`}
        >
          {!isNotDashboard && <Header {...props} />}
          <Layout className="workspace">
            {!isNotDashboard && (
              <SidebarMenu
                // currentUser={currentUser}
                menuItems={menuItems}
                sidebarTheme={state.darkSidebar ? 'dark' : 'light'}
                sidebarMode={state.sidebarPopup ? 'vertical' : 'inline'}
                sidebarIcons={state.sidebarIcons}
                collapsed={state.collapsed}
              />
            )}

            <Layout>
              <Content>{!isNotDashboard ? <Inner>{children}</Inner> : children}</Content>
            </Layout>
          </Layout>
        </Container>
      </ThemeProvider>
    </Spin>
  );
};

const mapStateToProps = (state: IStore) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const Page = connect(mapStateToProps, mapDispatchToProps)(Component);
