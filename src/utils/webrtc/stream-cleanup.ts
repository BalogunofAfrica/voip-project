import { MediaStream } from "react-native-webrtc";

const streamCleanUp = async (
  localStream: MediaStream | null,
  handleResetLocalStream: () => void,
  handleResetRemoteStream: () => void,
) => {
  if (localStream) {
    // eslint-disable-next-line unicorn/no-array-for-each
    localStream.getTracks().forEach((track) => track.stop());
    localStream.release();
  }

  handleResetLocalStream();
  handleResetRemoteStream();
};

export { streamCleanUp };
