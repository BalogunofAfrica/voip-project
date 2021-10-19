import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

import { FirebaseDocumentEnum } from "@/hooks/webrtc/enum";

const fireStoreCleanUp = async (
  documentRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
) => {
  if (documentRef) {
    const calleeCandidate = await documentRef
      .collection(FirebaseDocumentEnum.Callee)
      .get();
    // eslint-disable-next-line unicorn/no-array-for-each
    calleeCandidate.forEach(async (candidate) => {
      await candidate.ref.delete();
    });

    const callerCandidate = await documentRef
      .collection(FirebaseDocumentEnum.Caller)
      .get();
    // eslint-disable-next-line unicorn/no-array-for-each
    callerCandidate.forEach(async (candidate) => {
      await candidate.ref.delete();
    });

    documentRef.delete();
  }
};

export { fireStoreCleanUp };
