import { mediaDevices } from "react-native-webrtc";

const getMediaStream = async () => {
  const isFront = true;

  const sourceInfos = await mediaDevices.enumerateDevices();

  let videoSourceId;
  // eslint-disable-next-line unicorn/no-for-loop, no-plusplus
  for (let index = 0; index < sourceInfos.length; index++) {
    const sourceInfo = sourceInfos[index];
    if (
      sourceInfo.kind === "videoinput" &&
      sourceInfo.facing === (isFront ? "front" : "environment")
    ) {
      videoSourceId = sourceInfo.deviceId;
    }
  }
  const stream = await mediaDevices.getUserMedia({
    audio: true,
    video: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      deviceId: videoSourceId,
      facingMode: isFront ? "user" : "environment",
      frameRate: 30,
      height: 480,
      width: 640,
    },
  });

  if (typeof stream !== "boolean") return stream;

  // eslint-disable-next-line unicorn/no-useless-undefined
  return undefined;
};

export { getMediaStream };
