/* eslint-disable react/react-in-jsx-scope */
import Document, { NextDocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
	static async getInitialProps(ctx: NextDocumentContext) {
    const sheet = new ServerStyleSheet();

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
      });

    const initialProps = await Document.getInitialProps(ctx);
    const initalStyles = {
      *[Symbol.iterator] () {
        yield initialProps.styles;
      }
    }
    return {
      ...initialProps,
      styles: [...initalStyles, ...sheet.getStyleElement()]
    };
  }
}
