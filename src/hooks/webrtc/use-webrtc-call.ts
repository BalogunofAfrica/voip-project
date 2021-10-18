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

  const handleResetLocalStream = () => setLocalStream(null);
  const handleResetRemoteStream = () => setRemoteStream(null);

  const handleSetUpWebRtc = async () => {
    try {
      peerConnection.current = new RTCPeerConnection(configuration);

      // Get the audio and video stream for the call
      const stream = await getMediaStream();

      if (stream) {
        setLocalStream(stream);
        peerConnection.current.addStream(stream);
      }

      // Get remote stream once it is available
      peerConnection.current.onaddstream = (event: EventOnAddStream) => {
        setRemoteStream(event.stream);
      };
    } catch (error) {
      console.log("handleSetUpWebRtc error =>", error);
    }
  };

  const handleCreate = async () => {
    connecting.current = true;

    try {
      // Setup webRtc
      await handleSetUpWebRtc();

      // Firestore document for the call
      const documentRef = firestore().collection("meet").doc("chatID");

      // Exchange ICE candidates between caller and callee
      collectICEcandidates(peerConnection, documentRef, "caller", "callee");

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
    } catch (error) {
      console.log("handleCreate error =>", error);
    }
  };

  const handleJoin = async () => {
    connecting.current = true;
    setIncomingCall(false);

    try {
      const documentRef = firestore().collection("meet").doc("chatID");
      const offer = (await documentRef.get()).data()?.offer;

      if (offer) {
        // Setup webRtc
        await handleSetUpWebRtc();

        // Exchange ICE candidates between caller and callee
        // The callee and caller are reversed for joining
        collectICEcandidates(peerConnection, documentRef, "callee", "caller");

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
    } catch (error) {
      console.log("handleJoin error =>", error);
    }
  };

  const handleHangup = useCallback(async () => {
    try {
      const documentRef = firestore().collection("meet").doc("chatID");

      connecting.current = false;
      setIncomingCall(false);

      // Close the connection
      // Release the stream
      streamCleanUp(
        localStream,
        handleResetLocalStream,
        handleResetRemoteStream,
      );

      // Delete the document for the call
      fireStoreCleanUp(documentRef);

      if (peerConnection.current) {
        peerConnection.current.close();
      }
    } catch (error) {
      console.log("handleHangup error =>", error);
    }
  }, [localStream]);

  useEffect(() => {
    const documentRef = firestore().collection("meet").doc("chatID");

    const subscribe = documentRef.onSnapshot((snapshot) => {
      try {
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
      } catch (error) {
        console.log("subscribe error =>", error);
      }
    });

    // On delete of collection, call handleHangUp
    // The other party has hung up
    const subscribeDelete = documentRef
      .collection("callee")
      .onSnapshot((snapshot) => {
        try {
          // eslint-disable-next-line unicorn/no-array-for-each
          snapshot.docChanges().forEach((documentChange) => {
            if (documentChange.type === "removed") {
              handleHangup();
            }
          });
        } catch (error) {
          console.log("subscribeDelete error =>", error);
        }
      });

    return () => {
      subscribe();
      subscribeDelete();
    };
  }, [handleHangup]);

  return {
    handleCreate,
    handleHangup,
    handleJoin,
    incomingCall,
    localStream,
    remoteStream,
  };
};

export { useWebRtcCall };
