import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ImageBackground,
} from "react-native";
import React from "react";
import { useGetEventsQuery } from "../gql/generated/schema";
import { List } from "./../components/";

export default function EventsScreen() {
  const { data: events } = useGetEventsQuery({
    variables: {
      isOver: false,
    },
    errorPolicy: "ignore",
  });
  const datas = events?.getEvents?.map((event) => {
    return {
      name: event.name,
      description: "",
      image: event.image,
      id: event.id,
    };
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/bg_mobile.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.text}>Les Eco-co challenges en cours</Text>
        <FlatList
          data={datas}
          renderItem={({ item }) => {
            return (
              <List
                title={item.name ?? ""}
                description={item.description ?? ""}
                image={item.image ?? ""}
              />
            );
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 50,
    fontWeight: "bold",
    color: "#545863",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginBottom: 30,
  },
});
