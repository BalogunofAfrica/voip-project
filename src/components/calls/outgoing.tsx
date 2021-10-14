import React from "react";
import { View } from "react-native";

import { IconButton } from "@/components/buttons";
import { styles } from "@/components/calls/shared/styles";
import { CustomText } from "@/components/typography";

const OutgoingCall = () => (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      <View style={styles.callingTextContainer}>
        <CustomText style={styles.callingText}>Calling...</CustomText>
      </View>
      <View style={styles.actionButtonsContainer}>
        <IconButton style={[styles.actionButton, styles.cancelButton]}>
          <CustomText style={styles.buttonText}>E</CustomText>
        </IconButton>
      </View>
    </View>
  </View>
);

export { OutgoingCall };
