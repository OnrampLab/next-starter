import '../../assets/styles.less';
import '../../assets/tailwind-extension.css';

import App, { NextAppContext } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';

import { Page, GlobalStyles } from '@onr/core';
import { store, afterComponentDidMount } from '../redux';
import { menuItems } from '../configs';
import { AuthenticationProvider } from './AuthProvider';
import { useUser } from '@onr/auth/components/smart/User';
import { Signin } from '@onr/auth';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
Router.events.on(
  'routeChangeComplete',
  () => (document.querySelector('.workspace > .ant-layout')!.scrollTop = 0),
);

const PageContainer: React.FC = (props: any) => {
  const user = useUser();
  const { Component, pageProps, store } = props;
  return (
    <>
      {user ? (
        <Page {...props} menuItems={menuItems}>
          <Component {...pageProps} />
        </Page>
      ) : (
        <Signin></Signin>
      )}
    </>
  );
};

export class AppComponent extends App<any> {
  static async getInitialProps(props: NextAppContext) {
    let pageProps = {};

    if (props.Component.getInitialProps) {
      pageProps = await props.Component.getInitialProps(props.ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    afterComponentDidMount();
  }

  render(): JSX.Element {
    const { Component, pageProps, store } = this.props;

    return (
      <>
        <GlobalStyles />

        <Head>
          <meta
            name="viewport"
            content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height"
          />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="shortcut icon" href="/static/images/triangle.png" />
          <title>Next Starter</title>
          <link
            href="https://fonts.googleapis.com/css?family=Anonymous+Pro:400,700"
            rel="stylesheet"
          />
          {pageProps.ieBrowser && (
            <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.min.js" />
          )}
        </Head>
        <Provider store={store}>
          <AuthenticationProvider>
            <PageContainer {...this.props}></PageContainer>
          </AuthenticationProvider>
        </Provider>
      </>
    );
  }
}

export const MyApp = withRedux(store)(AppComponent);
