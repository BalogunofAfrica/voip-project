import React, { useCallback, useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming as wt,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CustomText } from "@/components/custom-text";

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const withTiming = (value: string | number) =>
  wt(value, { duration: 1000, easing: Easing.elastic(0.7) });

const styles = StyleSheet.create({
  animatedText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  animatedWrapper: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  container: StyleSheet.absoluteFillObject,
  contentChild: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  contentText: {
    color: "#000",
    fontSize: 14,
  },
  contentWrapper: {
    backgroundColor: "rgba(0,0,0,0.04)",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  gradient: {
    flex: 1,
    zIndex: 1,
  },
  imageStyle: {
    height: 100,
    marginBottom: 20,
    width: 100,
  },
});

function SplashScreen() {
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;

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
  const moveTitleX = useSharedValue(0);
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
        (moveTitleX.value = withTiming(0)),
        (moveTitleY.value = withTiming(height / 2 - 90)),
      ]);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    animate();
  }, [animate]);

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

  // Going to Move Up like Nav Bar...
  return (
    <View style={styles.container}>
      <AnimatedGradient
        angle={45}
        angleCenter={{ x: 0.5, y: 0.5 }}
        colors={["#039BFE", "#072D92"]}
        style={[styles.gradient, style1]}
        useAngle
      >
        <Animated.View style={styles.animatedWrapper}>
          <Animated.Image
            source={require("@/assets/standard_bank_logo.png")}
            style={[styles.imageStyle, style2]}
          />

          <Animated.View style={[style3]}>
            <CustomText fontFamily="Book" style={styles.animatedText}>
              Stanbic
            </CustomText>
          </Animated.View>
        </Animated.View>
      </AnimatedGradient>

      <Animated.View style={[styles.contentWrapper, style4]}>
        <View style={styles.contentChild}>
          <CustomText fontFamily="Bold" style={styles.contentText}>
            Stanbic
          </CustomText>
        </View>
      </Animated.View>
    </View>
  );
}

export { SplashScreen };
