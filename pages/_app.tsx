import '@fontsource/aileron/300.css';
import '@fontsource/aileron/400.css';
import '@fontsource/aileron/600.css';
import '@fontsource/aileron/700.css';
import '@fontsource/aileron/800.css';
import '../styles/app.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';

import theme from '../styles/theme';
import createEmotionCache from '../styles/createEmotionCache';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo-client';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  children: React.ReactElement;
  pageProps: any;
}

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    children,
  } = props;
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar children={children} />
          <Component {...pageProps} />
          {/* <Footer /> */}
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}
