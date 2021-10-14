import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MediaStream } from "react-native-webrtc";

type InCallProps = {
  hangUp: () => void;
  localStream: MediaStream | null;
};

const InCall = () => <View />;
