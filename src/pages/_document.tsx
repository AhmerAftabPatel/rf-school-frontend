import * as React from 'react';
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { asyncVirtualSheet, getStyleTagProperties } from 'twind/server';
import { setup } from 'twind';
import { ServerStyleSheet } from 'styled-components'
import twindConfig from '../twind.config';
const sheet = asyncVirtualSheet();
setup({ ...twindConfig, sheet });

class MyDocument extends Document {
  // static getInitialProps({ renderPage }) {
  //   // Step 1: Create an instance of ServerStyleSheet
  //   const sheet = new ServerStyleSheet()

  //   // Step 2: Retrieve styles from components in the page
  //   // eslint-disable-next-line react/display-name
  //   const page = renderPage(
  //     // eslint-disable-next-line react/display-name
  //     (App) => (props) => sheet.collectStyles(<App {...props} />),
  //   )

  //   // Step 3: Extract the styles as <style> tags
  //   const styleTags = sheet.getStyleElement()

  //   // Step 4: Pass styleTags as a prop
  //   return { ...page, styleTags }
  // }
  // eslint-disable-next-line react/display-name
  static async getInitialProps(ctx: DocumentContext) {
    sheet.reset();
    const initialProps = await Document.getInitialProps(ctx);
    const { id, textContent } = getStyleTagProperties(sheet);
    const styleProps = {
      id,
      key: id,
      dangerouslySetInnerHTML: {
        __html: textContent,
      },
    };

    return {
      ...initialProps,
      styles: [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ...initialProps.styles,
        React.createElement(`style`, styleProps),
      ],
    };
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
