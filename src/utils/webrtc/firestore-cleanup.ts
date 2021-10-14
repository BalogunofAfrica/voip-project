import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

const fireStoreCleanUp = async (
  documentRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
) => {
  if (documentRef) {
    const calleeCandidate = await documentRef.collection("callee").get();
    // eslint-disable-next-line unicorn/no-array-for-each
    calleeCandidate.forEach(async (candidate) => {
      await candidate.ref.delete();
    });

    const callerCandidate = await documentRef.collection("caller").get();
    // eslint-disable-next-line unicorn/no-array-for-each
    callerCandidate.forEach(async (candidate) => {
      await candidate.ref.delete();
    });

    documentRef.delete();
  }
};

export { fireStoreCleanUp };
