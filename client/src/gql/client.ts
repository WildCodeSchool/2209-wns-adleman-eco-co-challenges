import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
  link: createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API_URL || "http://localhost:4000/",
    credentials: "include",
  }),
});

export default client;
