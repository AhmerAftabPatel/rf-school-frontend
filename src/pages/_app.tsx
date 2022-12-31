import { AppProps } from 'next/app';
import '@/styles/global.css';
import { LinkProvider } from '../context/links/auth/LinkContext';
// import '@fontsource/inter';

import { setup } from 'twind';
import twindConfig from '../twind.config';
import Page from '@/components/page';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import Navigation from '@/components/navigation';
if (typeof window !== `undefined`) {
  setup(twindConfig);
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <LinkProvider>
    <div style={{minHeight : "100vh"}}>
      <Navigation /> <Component {...pageProps} />
    </div>
    // </LinkProvider>
  );
}
