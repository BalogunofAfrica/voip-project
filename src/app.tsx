import React from "react";
import { StyleSheet, Text, View } from "react-native";

// import {} from "@/components/buttons";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});

const App = () => (
  <View style={styles.container}>
    <Text>Open up App.tsx to start working on your app!</Text>
  </View>
);

export { App };
