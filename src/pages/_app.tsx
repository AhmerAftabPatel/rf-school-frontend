import { AppProps } from 'next/app';
import '@/styles/global.css';
import { LinkProvider } from '../context/links/auth/LinkContext';
// import '@fontsource/inter';

import { setup } from 'twind';
import twindConfig from '../twind.config';
import Page from '@/components/page';
import { useEffect, useState } from 'react';
import Router from 'next/router';
if (typeof window !== `undefined`) {
  setup(twindConfig);
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log('start');
      setLoading(true);
    };
    const end = () => {
      console.log('finished');
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);
  return (
    // <LinkProvider>
    <Page>{loading ? <h3 style={{ textAlign: 'center' }}>Loading...</h3> : <Component {...pageProps} />}</Page>
    // </LinkProvider>
  );
}
