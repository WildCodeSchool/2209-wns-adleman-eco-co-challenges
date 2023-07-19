import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import {
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../gql/generated/schema";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen() {
  const [credentials, setCredentials] = useState({
    nickName: "Jane B",
    password: "Password1",
  });
  const [error, setError] = useState("");

  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  // useEffect(() => {
  //   if (currentUser?.profile)
  //     registerForPushNotificationsAsync().then((expoNotificationToken) =>
  //       updateProfile({ variables: { data: { expoNotificationToken } } })
  //     );
  // }, [currentUser?.profile]);

  return (
    <View style={styles.container}>
      {currentUser?.profile ? (
        <View>
          <Text>Connecté.e en tant que {currentUser.profile.nickName}</Text>
          <Button
            onPress={async () => {
              try {
                await logout();
                SecureStore.deleteItemAsync("token");
              } catch (err) {
                setError("invalid credentials");
              } finally {
                client.resetStore();
              }
            }}
            title="Se déconnecter"
          />
        </View>
      ) : (
      <View>
        <TextInput
          value={credentials.nickName}
          onChangeText={(newValue) =>
            setCredentials({ ...credentials, nickName: newValue })
          }
        />
        <TextInput
          value={credentials.password}
          onChangeText={(newValue) =>
            setCredentials({ ...credentials, password: newValue })
          }
        />

        <Button
          onPress={async () => {
            try {
              setError("");
              const res = await login({ variables: { data: credentials } });
              SecureStore.setItemAsync("token", res.data?.login as string);
            } catch (err) {
              setError("invalid credentials");
            } finally {
              client.resetStore();
            }
          }}
          title="Se connecter"
        />

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
       )} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "red",
  },
});
