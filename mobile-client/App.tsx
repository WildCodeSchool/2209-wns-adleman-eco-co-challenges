import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { ApolloProvider } from "@apollo/client/react";
import client from "./gql/client";
import LoginScreen from "./screens/LoginScreen";
import EventsScreen from "././screens/EventsScreen";

const Drawer = createDrawerNavigator();

export default () => (
  <ApolloProvider client={client}>
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Events" component={EventsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  </ApolloProvider>
);
