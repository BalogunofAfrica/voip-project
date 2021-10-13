import React from "react";
import { StyleSheet, View } from "react-native";

import { IncomingCall } from "@/components/calls";

const styles = StyleSheet.create({
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
