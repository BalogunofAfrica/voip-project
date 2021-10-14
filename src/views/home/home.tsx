import React from "react";
import { StyleSheet, View } from "react-native";

import { InCall, IncomingCall, OutgoingCall } from "@/components/calls";
import { useWebRtcCall } from "@/hooks/webrtc";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

const Home = () => {
  const controller = useWebRtcCall();

  if (controller.incomingCall) {
    return (
      <IncomingCall
        onHangUp={controller.handleHangup}
        onJoin={controller.handleJoin}
      />
    );
  }

  if (controller.localStream) {
    return (
      <InCall
        localStream={controller.localStream}
        onHangUp={controller.handleHangup}
        remoteStream={controller.remoteStream}
      />
    );
  }

  return (
    <View style={styles.container}>
      <OutgoingCall onCreate={controller.handleCreate} />
    </View>
  );
};

export { Home };
