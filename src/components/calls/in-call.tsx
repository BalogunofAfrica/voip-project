import React, { VFC } from "react";
import { View } from "react-native";
import { MediaStream, RTCView } from "react-native-webrtc";

import { IconButton } from "@/components/buttons";
import { styles } from "@/components/calls/shared/styles";
import { CustomText } from "@/components/typography";

type InCallProps = {
  onHangUp: () => void;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
};

const renderLocalStream = (props: InCallProps) =>
  props.localStream ? (
    <View style={styles.background}>
      <RTCView
        objectFit="cover"
        streamURL={props.localStream.toURL()}
        style={{
          ...(props.remoteStream ? styles.localVideoSize : styles.fullSize),
          ...styles.elevated,
        }}
      />
    </View>
  ) : null;

const renderRemoteStream = (props: InCallProps) =>
  props.remoteStream ? (
    <View style={styles.background}>
      <RTCView
        objectFit="cover"
        streamURL={props.remoteStream.toURL()}
        style={styles.fullSize}
      />
    </View>
  ) : null;

const InCall: VFC<InCallProps> = (props) => (
  <View style={styles.wrapper}>
    {renderRemoteStream(props)}
    {renderLocalStream(props)}
    <View style={styles.container}>
      <View style={styles.actionButtonsContainer}>
        <IconButton
          onPress={props.onHangUp}
          style={[styles.actionButton, styles.cancelButton]}
        >
          <CustomText style={styles.buttonText}>E</CustomText>
        </IconButton>
      </View>
    </View>
  </View>
);

export { InCall };
