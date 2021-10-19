import firestore from "@react-native-firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  EventOnAddStream,
  MediaStream,
  RTCPeerConnection,
  RTCSessionDescription,
} from "react-native-webrtc";

import {
  collectICEcandidates,
  fireStoreCleanUp,
  getMediaStream,
  streamCleanUp,
} from "@/utils/webrtc";

import { FirebaseDocumentEnum, MediaType } from "./enum";

const configuration = {
  iceServers: [
    {
      url: "stun:stun3.l.google.com:19302",
    },
    {
      credential: "muazkh",
      url: "turn:numb.viagenie.ca",
      username: "webrtc@live.com",
    },
  ],
};

const useWebRtcCall = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [incomingCall, setIncomingCall] = useState(false);

  const peerConnection = useRef<RTCPeerConnection>();
  const connecting = useRef(false);
  const isVideo = useRef(false);

  const handleResetLocalStream = () => setLocalStream(null);
  const handleResetRemoteStream = () => setRemoteStream(null);

  const handleSetUpWebRtc = async (mediaType: MediaType) => {
    peerConnection.current = new RTCPeerConnection(configuration);

    // Get the audio and video stream for the call
    const stream = await getMediaStream(mediaType);

    if (stream) {
      setLocalStream(stream);
      peerConnection.current.addStream(stream);
    }

    // Get remote stream once it is available
    peerConnection.current.onaddstream = (event: EventOnAddStream) => {
      setRemoteStream(event.stream);
    };
  };

  const handleCreate = async (mediaType: MediaType) => {
    connecting.current = true;

    // Setup webRtc
    await handleSetUpWebRtc(mediaType);

    // Firestore document for the call
    const documentRef = firestore()
      .collection(FirebaseDocumentEnum.MeetingRoom)
      .doc(FirebaseDocumentEnum.ChatID);

    // Exchange ICE candidates between caller and callee
    collectICEcandidates(
      peerConnection,
      documentRef,
      FirebaseDocumentEnum.Caller,
      FirebaseDocumentEnum.Callee,
    );

    if (peerConnection.current) {
      // Create the offer for the call
      // Store the offer in the document
      const offer = await peerConnection.current.createOffer();

      peerConnection.current.setLocalDescription(offer);

      const connectionWithOffer = {
        offer: {
          sdp: offer.sdp,
          type: offer.type,
        },
      };

      documentRef.set(connectionWithOffer);
    }
  };

  const handleJoin = async () => {
    connecting.current = true;
    setIncomingCall(false);

    const documentRef = firestore()
      .collection(FirebaseDocumentEnum.MeetingRoom)
      .doc(FirebaseDocumentEnum.ChatID);
    const offer = (await documentRef.get()).data()?.offer;

    isVideo.current = offer.sdp.includes("BUNDLE audio video");

    if (offer) {
      // Setup webRtc
      await handleSetUpWebRtc(
        isVideo.current ? MediaType.Video : MediaType.Audio,
      );

      // Exchange ICE candidates between caller and callee
      // The callee and caller are reversed for joining
      collectICEcandidates(
        peerConnection,
        documentRef,
        FirebaseDocumentEnum.Callee,
        FirebaseDocumentEnum.Caller,
      );

      if (peerConnection.current) {
        peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(offer),
        );

        // Create the answer for the call
        // Update the document with answer
        const answer = await peerConnection.current.createAnswer();

        peerConnection.current.setLocalDescription(answer);

        const connectionWithAnswer = {
          answer: {
            sdp: answer.sdp,
            type: answer.type,
          },
        };

        documentRef.update(connectionWithAnswer);
      }
    }
  };

  const handleHangup = useCallback(async () => {
    const documentRef = firestore()
      .collection(FirebaseDocumentEnum.MeetingRoom)
      .doc(FirebaseDocumentEnum.ChatID);

    connecting.current = false;
    setIncomingCall(false);

    // Close the connection
    // Release the stream
    streamCleanUp(localStream, handleResetLocalStream, handleResetRemoteStream);

    // Delete the document for the call
    fireStoreCleanUp(documentRef);

    if (peerConnection.current) {
      peerConnection.current.close();
    }
  }, [localStream]);

  useEffect(() => {
    const documentRef = firestore()
      .collection(FirebaseDocumentEnum.MeetingRoom)
      .doc(FirebaseDocumentEnum.ChatID);

    const subscribe = documentRef.onSnapshot((snapshot) => {
      const data = snapshot.data();

      // On answer start the call
      if (
        peerConnection.current &&
        !peerConnection.current.remoteDescription &&
        data &&
        data.answer
      ) {
        peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(data.answer),
        );
      }

      // if there is offer for the chatID, set the incomingCall flag
      if (data && data.offer && !connecting.current) {
        setIncomingCall(true);
      }
    });

    // On delete of collection, call handleHangUp
    // The other party has hung up
    const subscribeDelete = documentRef
      .collection(FirebaseDocumentEnum.Callee)
      .onSnapshot((snapshot) => {
        // eslint-disable-next-line unicorn/no-array-for-each
        snapshot.docChanges().forEach((documentChange) => {
          if (documentChange.type === "removed") {
            handleHangup();
          }
        });
      });

    return () => {
      subscribe();
      subscribeDelete();
    };
  }, [handleHangup]);

  return {
    connecting,
    handleCreate,
    handleHangup,
    handleJoin,
    incomingCall,
    isVideo,
    localStream,
    remoteStream,
  };
};

export { useWebRtcCall };
