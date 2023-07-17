import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function UserScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Eco-co Challenges, nous voilà! </Text>
      <Button
        title="Vers un challenge "
        onPress={() => navigation.navigate("EventScreeen")}
      />
    </View>
  );
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
  },
});

// export default function WildersScreen() {
//   const { loading: loadingWilders, data, refetch } = useWildersQuery();
//   const wilders = data?.wilders || [];

//   useEffect(() => {
//     refetch();
//   }, []);

//   return (
//     <View style={style.container}>
//       {loadingWilders && <Text>Loading...</Text>}
//       <FlatList
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         ItemSeparatorComponent={() => <View style={style.separator} />}
//         ListEmptyComponent={() => <Text>No wilders for now</Text>}
//         data={wilders}
//         refreshing={loadingWilders}
//         renderItem={({ item }) => <WilderListItem wilder={item} />}
//       />
//     </View>
//   );
// }
