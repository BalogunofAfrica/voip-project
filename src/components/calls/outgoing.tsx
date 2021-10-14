import React, { VFC } from "react";
import { View } from "react-native";

import { IconButton } from "@/components/buttons";
import { styles } from "@/components/calls/shared/styles";
import { CustomText } from "@/components/typography";

type IncomingCallProps = {
  onCreate: () => void;
};

const OutgoingCall: VFC<IncomingCallProps> = (props) => (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      <View style={styles.callingTextContainer}>
        <CustomText style={styles.callingText}>Create call</CustomText>
      </View>
      <View style={styles.actionButtonsContainer}>
        <IconButton
          onPress={props.onCreate}
          style={[styles.actionButton, styles.createButton]}
        >
          <CustomText style={styles.buttonText}>C</CustomText>
        </IconButton>
      </View>
    </View>
  </View>
);

export { OutgoingCall };
