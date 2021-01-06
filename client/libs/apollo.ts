import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import fetch from 'isomorphic-unfetch';
import { devServer, prodServer } from './constants';

const createApolloClient = (initialState = {}) => {
  const httpLink = new HttpLink({
    uri:
      process.env.NODE_ENV === 'production'
        ? `${prodServer}/graphql`
        : `${devServer}/graphql`,
    fetch,
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    // console.log(graphQLErrors, networkError);
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([errorLink, httpLink]),
    cache: new InMemoryCache().restore(initialState),
  });
};

export default createApolloClient;
