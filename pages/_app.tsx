import '../src/assets/styles.less';

//#region Global Imports
import App, { Container, NextAppContext } from 'next/app';
import * as React from 'react';

import withRedux from 'next-redux-wrapper';
//#endregion Global Imports

//#region Local Imports
import store from '@Redux/store';
//#endregion Local Imports

//#region Interface Imports
import { IApp } from '@Interfaces';
//#endregion Interface Imports

import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';

import { Page, AppProvider } from '@Components';
import { GlobalStyles } from '@Components/styles/GlobalStyles';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App<IApp.IProps> {
    static async getInitialProps(props: NextAppContext) {
        let pageProps = {};

        if (props.Component.getInitialProps) {
            pageProps = await props.Component.getInitialProps(props.ctx);
        }

        return { pageProps };
    }


    render(): JSX.Element {
        const { Component, pageProps, store } = this.props;

        return (
            <Container>
                <GlobalStyles />
                <Head>
                    <meta
                        name="viewport"
                        content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height"
                    />
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <link rel="shortcut icon" href="/static/images/triangle.png" />
                    <title>One - React Next.js Ant Design Dashboard</title>
                    <link
                        href="https://fonts.googleapis.com/css?family=Anonymous+Pro:400,700"
                        rel="stylesheet"
                    />
                    {pageProps.ieBrowser && (
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.min.js" />
                    )}
                </Head>
                <AppProvider>
                    <Page>
                        <Component {...pageProps} />
                    </Page>
                </AppProvider>
            </Container>
        );
    }
}

export default MyApp;
// export default withRedux(store)(MyApp);
