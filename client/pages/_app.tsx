import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import GlobalStyle from '../libs/styles';
import withApollo from '../libs/withApollo';

interface ClosedStatusProps extends AppProps {
  apolloClient: any;
}

const ClosedStatus = ({ Component, pageProps, apolloClient }: ClosedStatusProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>휴업 현황</title>
      </Head>

      <GlobalStyle />

      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>

      <ToastContainer position="bottom-right" draggable={false} />
    </>
  );
};

export default withApollo(ClosedStatus);
