import React from "react";
import { StyleSheet, View } from "react-native";

import { IncomingCall } from "@/components/calls";

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

const App = () => (
  <View style={styles.container}>
    <IncomingCall />
  </View>
);

export { App };
