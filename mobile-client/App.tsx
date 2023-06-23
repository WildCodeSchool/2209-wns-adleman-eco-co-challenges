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
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
          <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button>HOME </Button>
              <EventScreen />
              <Loading />
              <List
                    title='UI Kitten'
                    description='A set of React Native components'
              />
          </Layout>
        </ApplicationProvider>
    </ApolloProvider>
);