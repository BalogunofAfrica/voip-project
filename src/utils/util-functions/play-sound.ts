import Sound from "react-native-sound";

let ringTone: Sound;

const playSound = (fileName: string, loop: boolean, volume: number) => {
  Sound.setCategory("Playback");
  ringTone = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
    if (loop) ringTone.setNumberOfLoops(-1);
    if (error) {
      return;
    }
    // Play the sound
    ringTone.play();
  });

  // Set the volume
  ringTone.setVolume(volume);

  return ringTone;
};

export { playSound };
