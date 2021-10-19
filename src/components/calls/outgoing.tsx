import React, { VFC } from "react";
import { View } from "react-native";
import { MediaStream } from "react-native-webrtc";

import { IconButton } from "@/components/buttons";
import { styles } from "@/components/calls/shared/styles";
import { CustomText } from "@/components/typography";

type OutgoingCallProps = {
  onCreate: () => void;
  onHangUp: () => void;
  localStream: MediaStream | null;
};

const renderCallButton = (props: OutgoingCallProps): JSX.Element => (
  <IconButton
    onPress={props.onCreate}
    style={[styles.actionButton, styles.createButton]}
  >
    <CustomText style={styles.buttonText}>C</CustomText>
  </IconButton>
);
const renderEndCallButton = (props: OutgoingCallProps): JSX.Element => (
  <IconButton
    onPress={props.onHangUp}
    style={[styles.actionButton, styles.cancelButton]}
  >
    <CustomText style={styles.buttonText}>E</CustomText>
  </IconButton>
);

const OutgoingCall: VFC<OutgoingCallProps> = (props) => (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      <View style={styles.callingTextContainer}>
        <CustomText style={styles.callingText}>Create call</CustomText>
      </View>
      <View style={styles.actionButtonsContainer}>
        {props.localStream
          ? renderEndCallButton(props)
          : renderCallButton(props)}
      </View>
    </View>
  </View>
);

export { OutgoingCall };
