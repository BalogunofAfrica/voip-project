import React, { VFC } from "react";
import { Pressable, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MediaStream, RTCView } from "react-native-webrtc";

import { styles } from "@/components/calls/shared/styles";

type InCallProps = {
  onHangUp: () => void;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
};

const renderLocalStream = (props: InCallProps) =>
  props.localStream ? (
    <View
      style={
        props.remoteStream ? [{ backgroundColor: "#000" }] : styles.background
      }
    >
      <RTCView
        objectFit="cover"
        streamURL={props.localStream.toURL()}
        style={{
          ...(props.remoteStream ? styles.localVideoSize : styles.fullSize),
          // ...styles.elevated,
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
    <View style={[styles.container, styles.flexEnd]}>
      <View style={styles.actionButtonsContainer}>
        <Pressable
          onPress={props.onHangUp}
          style={({ pressed }) => [
            styles.iconContainer,
            styles.cancelButton,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <Icon color="white" name="phone-hangup" size={36} />
        </Pressable>
      </View>
    </View>
  </View>
);

export { InCall };
