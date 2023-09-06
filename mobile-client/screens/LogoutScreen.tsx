import { Pressable, View, StyleSheet, Text } from "react-native";
import { useGetProfileQuery, useLogoutMutation } from "../gql/generated/schema";
import * as SecureStore from "expo-secure-store";

export default function LogoutScreen() {
  const [logout] = useLogoutMutation();
  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  return (
    <View style={styles.container}>
        
      <Pressable
        style={styles.button}
        onPress={async () => {
          await logout();
          client.resetStore();
          SecureStore.setItemAsync("token", "");
        }}
      >
        <Text style={styles.text}>Se déconnecter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 100,
        marginBottom: 100,
      },
  button: {
    marginTop: 50,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    width: 200,
    backgroundColor: "#27C7D4",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
