import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Button } from '@ui-kitten/components';
import { default as theme } from './theme.json'; // <-- Import app theme
import { ApolloProvider } from "@apollo/client/react";
import client from "./gql/client";
import EventScreen from '././screens/EventsScreen'
import {Loading, List } from "./components/"

export default () => (
    <ApolloProvider client={client}>
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <EventScreen />
          </Layout>
        </ApplicationProvider>
    </ApolloProvider>
);