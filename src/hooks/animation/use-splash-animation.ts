import { useCallback } from "react";
import { Dimensions } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming as wt,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const withTiming = (value: string | number) =>
  wt(value, { duration: 1000, easing: Easing.elastic(0.7) });

const useSplashAnimation = () => {
  const { height } = Dimensions.get("window");
  const { width } = Dimensions.get("window");

  // SafeArea Value...
  const edges = useSafeAreaInsets();

  // Animation Values....
  const startAnimation = useSharedValue(0);

  // Scaling Down Both logo and Title...
  const scaleLogo = useSharedValue(1);
  const scaleTitle = useSharedValue(1);

  // Offset Animation....
  const moveLogoX = useSharedValue(0);
  const moveLogoY = useSharedValue(0);
  const moveTitleY = useSharedValue(0);

  // Animating COntent...
  const contentTransition = useSharedValue(height);

  // Animation function
  const animate = useCallback(() => {
    // Starting Animation after 500ms....
    setTimeout(() => {
      // Parallel Animation...
      Animated.block([
        (startAnimation.value = withTiming(-height + (edges.top + 65))),
        (scaleLogo.value = withTiming(0.3)),
        (scaleTitle.value = withTiming(0.8)),
        (contentTransition.value = withTiming(0)),
        (moveLogoX.value = withTiming(width / 2 - 35)),
        (moveLogoY.value = withTiming(height / 2 - 5)),
        (moveTitleY.value = withTiming(height / 2 - 100)),
      ]);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const style1 = useAnimatedStyle(() => ({
    transform: [{ translateY: startAnimation.value }],
  }));

  const style2 = useAnimatedStyle(() => ({
    transform: [
      { translateX: moveLogoX.value },
      { translateY: moveLogoY.value },
      { scale: scaleLogo.value },
    ],
  }));

  const style3 = useAnimatedStyle(() => ({
    transform: [{ translateY: moveTitleY.value }, { scale: scaleTitle.value }],
  }));

  const style4 = useAnimatedStyle(() => ({
    transform: [{ translateY: contentTransition.value }],
  }));

  return { animate, style1, style2, style3, style4 } as const;
};

export { useSplashAnimation };
