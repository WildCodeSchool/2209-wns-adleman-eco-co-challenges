import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

import Constants from "expo-constants";
<<<<<<< HEAD:mobile-client/gql/client.ts
const env = Constants.expoConfig?.extra || {};
=======
const env = Constants.expoConfig?.extra ?? {};
>>>>>>> e95ad893a35cafe7287bd0eed8de5558aa643751:client-mobile/gql/client.ts

//https://www.apollographql.com/docs/react/networking/authentication/#cookie
export default new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
  link: createHttpLink({
<<<<<<< HEAD:mobile-client/gql/client.ts
    uri: env.GRAPHQL_API_URL,
=======
    uri: env.GRAPHQL_API_URL as string,
>>>>>>> e95ad893a35cafe7287bd0eed8de5558aa643751:client-mobile/gql/client.ts
    credentials: "include",
  }),
});
