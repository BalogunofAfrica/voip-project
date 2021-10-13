import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { IconButton } from "@/components/buttons";

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    justifyContent: "flex-end",
  },
  wrapper: {
    flex: 1,
  },
});

const IncomingCall = () => (
  <View style={styles.wrapper}>
    <Image
      resizeMode="cover"
      source={require("@/assets/img/caller-placeholder.png")}
      style={[styles.background]}
    />
    <View style={styles.container}>
      <IconButton>
        <Text style={styles.buttonText}>A</Text>
      </IconButton>
    </View>
  </View>
);

export { IncomingCall };
