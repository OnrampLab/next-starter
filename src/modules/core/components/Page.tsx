import * as React from 'react';
import { connect } from 'react-redux';
import { Layout, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { withRouter, WithRouterProps } from 'next/router';

import Header from './Header';
import SidebarMenu from './SidebarMenu';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/GlobalStyles';
import { Container, Inner } from './styles/Page';

import { IWrapperPage, IStore } from '@Interfaces';

const { Content } = Layout;

const NonDashboardRoutes = ['/auth/signin', '/auth/signup', '/forgot', '/lockscreen', '/_error'];

const Component = (props: IWrapperPage.IProps & WithRouterProps) => {
  const { router, menuItems, children } = props;
  const state = props;
  const [loading, setLoading] = useState(true);
  const isNotDashboard = router && NonDashboardRoutes.includes(router.pathname);

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
          {!isNotDashboard && <Header {...(props as any)} />}
          <Layout className="workspace">
            {!isNotDashboard && (
              <SidebarMenu
                {...(props as any)}
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
