import React from "react";

import { InCall, IncomingCall } from "@/components/calls";
import { useWebRtcCall } from "@/hooks/webrtc";

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

  return (
    <InCall
      isConnecting={controller.connecting.current}
      localStream={controller.localStream}
      onCreate={controller.handleCreate}
      onHangUp={controller.handleHangup}
      remoteStream={controller.remoteStream}
    />
  );
};

export { Home };
