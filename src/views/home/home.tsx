import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { InCall, IncomingCall } from "@/components/calls";
import { FeedBack } from "@/components/feeback";
import { SplashScreen } from "@/components/splash-screen";
import { useWebRtcCall } from "@/hooks/webrtc";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

const Home = () => {
  const controller = useWebRtcCall();
  const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);
  const toggleFeedbackModal = () => {
    setFeedbackVisible(!feedbackVisible);
  };
  const handleHangup = async () => {
    await controller.handleHangup();
    toggleFeedbackModal();
  };

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
        onHangUp={handleHangup}
        remoteStream={controller.remoteStream}
      />
    );
  }

  return (
    <View style={styles.container}>
      <SplashScreen createCall={controller.handleCreate} />
      <FeedBack hide={toggleFeedbackModal} visible={feedbackVisible} />
    </View>
  );
};

export { Home };
