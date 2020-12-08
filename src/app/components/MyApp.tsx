import '../../assets/styles.less';
import '../../assets/tailwind-extension.css';

import App, { AppContext } from 'next/app';
import React from 'react';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';

import { Page, GlobalStyles, AppProvider } from '@onr/core';
import { store, afterComponentDidMount } from '../redux';

import { PageContainer } from './PageContainer';

const makeStore: MakeStore = (context: Context) => store();

const wrapper = createWrapper(makeStore, { debug: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
Router.events.on(
  'routeChangeComplete',
  () =>
    document.querySelector('.workspace > .ant-layout') &&
    (document.querySelector('.workspace > .ant-layout')!.scrollTop = 0),
);

export class AppComponent extends React.Component {
  // NOTE: In order to get runtime config. We will need to use getInitialProps. But the down side
  //       is it will opt out Next.js default static optimization.
  // Please refer to https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration

  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    // Keep in mind that this will be called twice on server, one for page and second for error page
    // ctx.store.dispatch({ type: "DEMO.SET_PLANT_IMAGE", payload: { demos:[] } });

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        // Some custom thing for all pages
        appProp: ctx.pathname,
      },
    };
  };

  componentDidMount() {
    afterComponentDidMount();
  }

  render(): JSX.Element {
    const { pageProps } = this.props;

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
        <AppProvider>
          <PageContainer {...this.props} />
          {/*<AuthenticationProvider>
            <PageContainer {...this.props}></PageContainer>
          </AuthenticationProvider>*/}
        </AppProvider>
      </>
    );
  }
}

export const MyApp = wrapper.withRedux(AppComponent);
