import React, { FC } from "react";
import { View } from "react-native";
import { MediaStream } from "react-native-webrtc";

type InCallProps = {
  hangUp: () => void;
  localStream: MediaStream | null;
};

const InCall: FC<InCallProps> = () => <View />;

export { InCall };
