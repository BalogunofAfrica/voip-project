import { Dimensions } from "react-native";
import { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import {
  Easing,
  Extrapolate,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

// Type declaration
type Context = {
  translateY: number;
};
type Accept = () => void;
type Decline = () => void;

// Constants
const dimm = Dimensions.get("window");

// Hook
const useIncomingCallAnimation = (accept: Accept, decline: Decline) => {
  const gestureOpacity = useSharedValue(0);
  const gestureTranslate = useSharedValue(100);
  const repeatTranslate = useSharedValue(0);
  const swipe = useSharedValue(0);
  const textOpacity = useSharedValue(1);

  const doRepeat = () => {
    "worklet";

    repeatTranslate.value = withRepeat(
      withTiming(-50, {
        duration: 1500,
      }),
      -1,
      true,
    );
  };

  const animate = () => {
    gestureTranslate.value = withTiming(
      0,
      {
        duration: 1000,
        easing: Easing.elastic(1),
      },
      (isFinished) => {
        if (isFinished) {
          doRepeat();
        }
      },
    );
    gestureOpacity.value = withTiming(1, { duration: 1000 });
  };

  //   Declaring the various animation styles
  const acceptStyle = useAnimatedStyle(() => ({ opacity: textOpacity.value }));

  const declineOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      repeatTranslate.value,
      [-50, 0],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return { opacity };
  });

  const declineStyle = useAnimatedStyle(() => ({ opacity: textOpacity.value }));

  const gestureContainerStyle = useAnimatedStyle(() => ({
    opacity: gestureOpacity.value,
    transform: [{ translateY: gestureTranslate.value }],
  }));

  const iconContainerStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      swipe.value,
      [-100, 0, 50],
      ["green", "rgba(0,0,0,0.2)", "red"],
    );
    return {
      backgroundColor: color,
    };
  });

  const repeatTranslateStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: repeatTranslate.value }],
  }));

  const rotationStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      swipe.value,
      [10, 40],
      [0, 135],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  const swipeStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: swipe.value }],
  }));

  //   Handling gesture event
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onActive: ({ translationY }, context) => {
      textOpacity.value = withTiming(0);
      swipe.value = interpolate(
        translationY + context.translateY,
        [-dimm.height / 2, dimm.height / 2],
        [-150, 150],
        Extrapolate.CLAMP,
      );
    },
    onFinish: () => {
      swipe.value = withSpring(0);
      textOpacity.value = withTiming(1);
      if (swipe.value < -75) {
        runOnJS(accept)();
      } else if (swipe.value >= 50) {
        runOnJS(decline)();
      }
    },
    onStart: (_, context) => {
      context.translateY = swipe.value;
    },
  });

  return {
    acceptStyle,
    animate,
    declineOpacity,
    declineStyle,
    gestureContainerStyle,
    gestureHandler,
    iconContainerStyle,
    repeatTranslateStyle,
    rotationStyle,
    swipeStyle,
  };
};

export { useIncomingCallAnimation };
