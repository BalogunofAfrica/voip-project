import React, { useEffect, VFC } from "react";
import { Image, Vibration, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { IconButton } from "@/components/buttons";
import { styles } from "@/components/calls/shared/styles";
import { CustomText } from "@/components/typography";

type IncomingCallProps = {
  onJoin: () => void;
  onHangUp: () => void;
};

const IncomingCall: VFC<IncomingCallProps> = (props) => {
  const actionTranslate = useSharedValue(100);
  const actionOpacity = useSharedValue(0);
  useEffect(() => {
    const ONE_SECOND_IN_MS = 1000;

    const PATTERN = [
      1 * ONE_SECOND_IN_MS,
      2 * ONE_SECOND_IN_MS,
      3 * ONE_SECOND_IN_MS,
    ];

    actionTranslate.value = withTiming(0, {
      duration: 1000,
      easing: Easing.elastic(1),
    });
    actionOpacity.value = withTiming(1, { duration: 1000 });

    // Vibration.vibrate(PATTERN, true);

    return () => Vibration.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rstyle = useAnimatedStyle(() => ({
    opacity: actionOpacity.value,
    transform: [{ translateY: actionTranslate.value }],
  }));
  return (
    <View style={styles.wrapper}>
      <Image
        resizeMode="cover"
        source={require("@/assets/img/caller-placeholder.png")}
        style={[styles.background]}
      />
      <View style={styles.container}>
        <View style={styles.callingTextContainer}>
          <CustomText style={styles.callingText}>Incoming Call...</CustomText>
        </View>
        <Animated.View style={[styles.actionButtonsContainer, rstyle]}>
          <Animated.View style={{ alignItems: "center" }}>
            <CustomText
              style={{ color: "#fff", fontStyle: "italic", marginBottom: 12 }}
            >
              Swipe up to answer...
            </CustomText>
            <IconButton
              onPress={props.onJoin}
              style={[styles.actionButton, styles.answerButton]}
            >
              <Icon color="green" name="phone" size={24} />
            </IconButton>
          </Animated.View>
          <CustomText
            style={{ color: "#fff", fontStyle: "italic", marginTop: 12 }}
          >
            Swipe down to decline...
          </CustomText>
        </Animated.View>
      </View>
    </View>
  );
};

export { IncomingCall };
