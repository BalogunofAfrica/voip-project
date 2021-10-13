import React from "react";
import { Image, Text, View } from "react-native";

import { IconButton } from "@/components/buttons";
import { styles } from "@/components/calls/shared/styles";

const IncomingCall = () => (
  <View style={styles.wrapper}>
    <Image
      resizeMode="cover"
      source={require("@/assets/img/caller-placeholder.png")}
      style={[styles.background]}
    />
    <View style={styles.container}>
      <View style={styles.callingTextContainer}>
        <Text style={styles.callingText}>Incoming Call...</Text>
      </View>
      <View style={styles.actionButtonsContainer}>
        <IconButton style={[styles.actionButton, styles.answerButton]}>
          <Text style={styles.buttonText}>A</Text>
        </IconButton>
        <IconButton style={[styles.actionButton, styles.cancelButton]}>
          <Text style={styles.buttonText}>D</Text>
        </IconButton>
      </View>
    </View>
  </View>
);

export { IncomingCall };
