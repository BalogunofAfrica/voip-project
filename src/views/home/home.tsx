import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import React, { MutableRefObject, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  EventOnAddStream,
  MediaStream,
  RTCPeerConnection,
} from "react-native-webrtc";

import { InCall, IncomingCall, OutgoingCall } from "@/components/calls";
import { getMediaStream } from "@/utils/get-media-stream";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

const configuration = { iceServers: [{ url: "stun:stun.l.google.com:19302" }] };

const collectICEcandidates = async (
  peerConnection: MutableRefObject<RTCPeerConnection | undefined>,
  documentRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
  localName: string,
  remoteName: string,
) => {
  const candidateCollection = documentRef.collection(localName);

  if (peerConnection.current) {
    // eslint-disable-next-line no-param-reassign
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        candidateCollection.add(event.candidate);
      }
    };
  }

  documentRef.collection(remoteName).onSnapshot((snapshot) => {
    // eslint-disable-next-line unicorn/no-array-for-each
    snapshot.docChanges().forEach((documentChange) => {
      if (documentChange.type === "added") {
        const candidate = new RTCIceCandidate(documentChange.doc.data());
      }
    });
  });
};

const useWebRtcCall = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [incomingCall, setIncomingCalll] = useState(false);

  const peerConnection = useRef<RTCPeerConnection>();
  const connecting = useRef(false);

  const handleSetUpWebRtc = async () => {
    peerConnection.current = new RTCPeerConnection(configuration);

    const stream = await getMediaStream();

    if (stream) {
      setLocalStream(stream);
      peerConnection.current.addStream(stream);
    }

    peerConnection.current.onaddstream = (event: EventOnAddStream) => {
      setRemoteStream(event.stream);
    };
  };

  const handleCreate = async () => {
    console.log("connecting");

    connecting.current = true;

    await handleSetUpWebRtc();

    const documentRef = firestore().collection("meet").doc("chatID");

    collectICEcandidates(peerConnection, documentRef, "caller", "callee");
  };

  const handleJoin = async () => {};
  const handleHangup = async () => {};

  return {
    handleCreate,
    handleHangup,
    handleJoin,
    incomingCall,
    localStream,
    remoteStream,
  };
};

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
