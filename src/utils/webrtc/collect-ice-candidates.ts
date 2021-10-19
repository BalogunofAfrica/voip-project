import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { MutableRefObject } from "react";
import {
  RTCIceCandidate,
  RTCIceCandidateType,
  RTCPeerConnection,
} from "react-native-webrtc";

const collectICEcandidates = async (
  peerConnection: MutableRefObject<RTCPeerConnection | undefined>,
  documentRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
  localName: string,
  remoteName: string,
) => {
  const candidateCollection = documentRef.collection(localName);

  if (peerConnection.current) {
    // On new ICE candidate, add it to firestore
    // eslint-disable-next-line no-param-reassign
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        candidateCollection.add(event.candidate);
      }
    };
  }

  // Get the ICE candidate added to firetore and update the local peer connection
  documentRef.collection(remoteName).onSnapshot((snapshot) => {
    // eslint-disable-next-line unicorn/no-array-for-each
    snapshot.docChanges().forEach((documentChange) => {
      if (documentChange.type === "added") {
        const candidate = new RTCIceCandidate(
          documentChange.doc.data() as RTCIceCandidateType,
        );

        peerConnection.current?.addIceCandidate(candidate);
      }
    });
  });
};

export { collectICEcandidates };
