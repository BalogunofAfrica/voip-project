import React from "react";
import { Text, View } from "react-native";

import { IconButton } from "@/components/buttons";
import { styles } from "@/components/calls/shared/styles";

const OutgoingCall = () => (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      <View style={styles.callingTextContainer}>
        <Text style={styles.callingText}>Calling...</Text>
      </View>
      <View style={styles.actionButtonsContainer}>
        <IconButton style={[styles.actionButton, styles.cancelButton]}>
          <Text style={styles.buttonText}>E</Text>
        </IconButton>
      </View>
    </View>
  </View>
);

export { OutgoingCall };
