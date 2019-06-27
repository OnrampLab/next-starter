import * as React from 'react';
import { Container, Inner } from './styles/Page';
import { connect } from 'react-redux';
import { Layout, Spin } from 'antd';
import { useEffect, useState } from 'react';

import Header from './Header';
import SidebarMenu from './SidebarMenu';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/GlobalStyles';
import { withRouter, WithRouterProps } from 'next/router';

import { IWrapperPage, IStore } from '@Interfaces';

const { Content } = Layout;

const NonDashboardRoutes = [
  '/auth/signin',
  '/auth/signup',
  '/forgot',
  '/lockscreen',
  '/_error'
];

const Page = (props: IWrapperPage.IProps & WithRouterProps) => {
  const { router, children } = props;
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
          {!isNotDashboard && <Header />}
          <Layout className="workspace">
            {!isNotDashboard && (
              <SidebarMenu
                sidebarTheme={state.darkSidebar ? 'dark' : 'light'}
                sidebarMode={state.sidebarPopup ? 'vertical' : 'inline'}
                sidebarIcons={state.sidebarIcons}
                collapsed={state.collapsed}
              />
            )}

            <Layout>
              <Content>
                {!isNotDashboard ? <Inner>{children}</Inner> : children}
              </Content>
            </Layout>
          </Layout>
        </Container>
      </ThemeProvider>
    </Spin>
  );
};

const mapStateToProps = (state: IStore) => state.wrapper;

export default withRouter(connect(mapStateToProps)(Page));
