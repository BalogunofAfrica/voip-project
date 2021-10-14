import React from "react";
import { Image, View } from "react-native";

import { IconButton } from "@/components/buttons";
import { styles } from "@/components/calls/shared/styles";
import { CustomText } from "@/components/typography";

const IncomingCall = () => (
  <View style={styles.wrapper}>
    <Image
      resizeMode="cover"
      source={require("@/assets/img/caller-placeholder.png")}
      style={[styles.background]}
    />
    <View style={styles.container}>
      <View style={styles.callingTextContainer}>
        <CustomText style={styles.callingText}>Incoming Call...</CustomText>
      </View>
      <View style={styles.actionButtonsContainer}>
        <IconButton style={[styles.actionButton, styles.answerButton]}>
          <CustomText style={styles.buttonText}>A</CustomText>
        </IconButton>
        <IconButton style={[styles.actionButton, styles.cancelButton]}>
          <CustomText style={styles.buttonText}>D</CustomText>
        </IconButton>
      </View>
    </View>
  </View>
);

export { IncomingCall };
