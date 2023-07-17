import { StyleSheet, Text, View } from "react-native";

export default function UserScreen() {
    return (<View  style={styles.container}>
        <Text style={styles.text}>
            Challenge
        </Text>

    </View>);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#27c7d4",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: "white",
      fontWeight: "bold",
    }
  });
