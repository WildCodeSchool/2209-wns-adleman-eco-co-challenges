import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingComponent = () => {
    return (
        <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
}

export default LoadingComponent



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});






