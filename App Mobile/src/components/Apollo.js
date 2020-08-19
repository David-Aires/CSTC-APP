import { WebSocketLink } from 'apollo-link-ws';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from "apollo-cache-inmemory";

const makeApolloClient = () => {

  // create an apollo link instance, a network interface for apollo client
const link = new WebSocketLink({
    uri: `wss://hasura.digitalconstructionhub.ovh/v1/graphql`,
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
            'x-hasura-admin-secret':`52m4R6sB5VpdWhS8`
        }
      }
    }
})

  // create an inmemory cache instance for caching graphql data
  const cache = new InMemoryCache()

  // instantiate apollo client with apollo link instance and cache instance
  const client = new ApolloClient({
    link,
    cache
  });

  return client;
}

export default makeApolloClient;