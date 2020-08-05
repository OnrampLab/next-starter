import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Layout, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { withRouter, WithRouterProps } from 'next/router';

import { Header } from './Header';
import { SidebarMenu } from './SidebarMenu';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/GlobalStyles';
import { Container, Inner } from './styles/Page';

import { IWrapperPage, IStore, DefaultPubSubContext, usePubSub } from '@onr/core';
import { authActions } from '@onr/auth';

const { Content } = Layout;

const NonDashboardRoutes = ['/auth/signin', '/auth/signup', '/forgot', '/lockscreen', '/_error'];
/* eslint-disable complexity*/
const Component = (props: IWrapperPage.IProps & WithRouterProps) => {
  const { router, menuItems, children } = props;
  const state = props;
  const dispatch = useDispatch();
  const currentUser = useSelector((store: IStore) => store.authStore.currentUser);
  const [loading, setLoading] = useState(true);
  const isNotDashboard = router && NonDashboardRoutes.includes(router.pathname);
  const { subscribe } = usePubSub(DefaultPubSubContext);

  useEffect(() => {
    fetchData();

    const unsub = subscribe('auth.updated', fetchData);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    return unsub;
  }, [loading]);

  async function fetchData() {
    dispatch(
      authActions.getCurrentUser({
        params: {},
      }),
    );
  }

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
                {...props}
                currentUser={currentUser}
                menuItems={menuItems}
                sidebarTheme={state.darkSidebar ? 'dark' : 'light'}
                sidebarMode={state.sidebarPopup ? 'vertical' : 'inline'}
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

const mapStateToProps = (state: IStore) => state.wrapper;

export const Page = withRouter(connect(mapStateToProps)(Component));
