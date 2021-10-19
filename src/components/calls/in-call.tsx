import React, { VFC } from "react";
import { View } from "react-native";
import { MediaStream, RTCView } from "react-native-webrtc";

import { IconButton } from "@/components/buttons";
import { styles } from "@/components/calls/shared/styles";
import { CustomText } from "@/components/typography";

type InCallProps = {
  onHangUp: () => void;
  onCreate: () => void;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isConnecting: boolean;
};

const renderLocalStream = (props: InCallProps): JSX.Element | null =>
  props.localStream ? (
    <View style={[styles.background]}>
      <RTCView
        objectFit="cover"
        streamURL={props.localStream.toURL()}
        style={{
          ...(props.remoteStream ? styles.localVideoSize : styles.fullSize),
          ...styles.elevated,
          zIndex: 3,
        }}
      />
    </View>
  ) : null;

const renderRemoteStream = (props: InCallProps): JSX.Element | null =>
  props.remoteStream ? (
    <View style={styles.background}>
      <RTCView
        objectFit="cover"
        streamURL={props.remoteStream.toURL()}
        style={styles.fullSize}
      />
    </View>
  ) : null;

const renderCallButton = (props: InCallProps): JSX.Element => (
  <IconButton
    onPress={props.onCreate}
    style={[styles.actionButton, styles.createButton]}
  >
    <CustomText style={styles.buttonText}>C</CustomText>
  </IconButton>
);

const renderEndCallButton = (props: InCallProps): JSX.Element => (
  <IconButton
    onPress={props.onHangUp}
    style={[styles.actionButton, styles.cancelButton]}
  >
    <CustomText style={styles.buttonText}>E</CustomText>
  </IconButton>
);

const renderCallText = (props: InCallProps): string =>
  props.isConnecting ? "" : "Create Call";

const InCall: VFC<InCallProps> = (props) => (
  <View style={styles.wrapper}>
    {renderRemoteStream(props)}
    {renderLocalStream(props)}
    <View
      style={[
        styles.container,
        styles.containerAbsolute,
        styles.flexEnd,
        { zIndex: 3 },
      ]}
    >
      <View style={styles.callingTextContainerFixed}>
        <View style={styles.callingTextContainer}>
          <CustomText style={styles.callingText}>
            {renderCallText(props)}
          </CustomText>
        </View>
      </View>
      <View style={styles.actionButtonsContainer}>
        {props.localStream
          ? renderEndCallButton(props)
          : renderCallButton(props)}
      </View>
    </View>
  </View>
);

export { InCall };
