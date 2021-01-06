import Head from 'next/head';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import createApolloClient from './apollo';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const initApolloClient = (initialState: any) => {
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
};

const withApollo = (PageComponent: any, { ssr = true } = {}) => {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }: any) => {
    const client = apolloClient || initApolloClient(apolloState);

    return <PageComponent {...pageProps} apolloClient={client} />;
  };

  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponent');
    }

    WithApollo.displayName = `withApollo (${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: any) => {
      const {
        AppTree,
        ctx: { res },
      } = ctx;

      const apolloClient = (ctx.ctx.apolloClient = initApolloClient({}));
      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(ctx)
        : {};

      if (typeof window === 'undefined') {
        if (res && res.finished) {
          return {};
        }

        if (ssr) {
          try {
            const { getDataFromTree } = await import('@apollo/react-ssr');

            await getDataFromTree(
              <AppTree
                pageProps={{ ...pageProps, apolloClient }}
                apolloClient={apolloClient}
              />
            );
          } catch (err) {
            console.error('Error while running `getDataFromTree`', err);
          }
        }

        Head.rewind();
      }

      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
      };
    };
  }

  return WithApollo;
};

export default withApollo;
