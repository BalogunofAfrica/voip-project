import React, { useEffect, VFC } from "react";
import { Image, Vibration, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { styles } from "@/components/calls/shared/styles";
import { CustomText } from "@/components/typography";
import { useIncomingCallAnimation } from "@/hooks/animation/use-incoming-call-animation";
import { playSound } from "@/utils/util-functions";

type IncomingCallProps = {
  onJoin: () => void;
  onHangUp: () => void;
};

const IncomingCall: VFC<IncomingCallProps> = (props) => {
  const {
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
  } = useIncomingCallAnimation(props.onJoin, props.onHangUp);

  useEffect(() => {
    // The gesture animation called
    animate();

    // The ringtone set and played
    const ringTone = playSound("ring_tone.mp3", true, 1);

    // Vibration settings
    const ONE_SECOND_IN_MS = 1000;
    // Setting the pattern of vibration
    const PATTERN = [
      1 * ONE_SECOND_IN_MS,
      2 * ONE_SECOND_IN_MS,
      3 * ONE_SECOND_IN_MS,
    ];
    Vibration.vibrate(PATTERN, true);

    return () => {
      // Clean-up, stop music and release resources
      ringTone.stop();
      ringTone.release();
      Vibration.cancel();
    };
  }, [animate, props.onHangUp, props.onJoin]);

  return (
    <View style={styles.wrapper}>
      <Image
        resizeMode="cover"
        source={require("@/assets/img/caller-placeholder.png")}
        style={[styles.background]}
      />
      <View style={styles.container}>
        <View style={styles.callingTextContainer}>
          <CustomText fontFamily="Bold" style={styles.callingText}>
            Incoming Call...
          </CustomText>
        </View>
        <Animated.View
          style={[styles.actionButtonsContainer, gestureContainerStyle]}
        >
          <PanGestureHandler
            activeOffsetY={[0, 0]}
            onGestureEvent={gestureHandler}
          >
            <Animated.View
              style={[styles.repeatContainer, repeatTranslateStyle]}
            >
              <Animated.View style={acceptStyle}>
                <CustomText style={styles.acceptText}>
                  Swipe up to answer...
                </CustomText>
              </Animated.View>
              <Animated.View style={swipeStyle}>
                <Animated.View
                  style={[styles.iconContainer, iconContainerStyle]}
                >
                  <Animated.View style={rotationStyle}>
                    <Icon color="white" name="phone" size={36} />
                  </Animated.View>
                </Animated.View>
              </Animated.View>
            </Animated.View>
          </PanGestureHandler>

          <Animated.View style={[declineStyle]}>
            <Animated.View style={[declineOpacity]}>
              <CustomText style={styles.declineText}>
                Swipe down to decline...
              </CustomText>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

export { IncomingCall };
