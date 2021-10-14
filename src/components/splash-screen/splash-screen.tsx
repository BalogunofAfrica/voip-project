import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated from "react-native-reanimated";

import { CustomText } from "@/components/typography";
import { useSplashAnimation } from "@/hooks/animation/use-splash-animation";
import { useWebRtcCall } from "@/hooks/webrtc";
import { sendMail } from "@/utils/util-functions";

import { Content } from "./splash-content";

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const styles = StyleSheet.create({
  animatedText: {
    alignSelf: "center",
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
    paddingHorizontal: 16,
    paddingTop: 84,
  },
  contentText: {
    color: "#000",
    fontSize: 14,
  },
  contentWrapper: {
    backgroundColor: "rgba(0,0,0,0.04)",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 0,
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    flex: 1,
    zIndex: 1,
  },
  imageStyle: {
    height: 114.29,
    marginBottom: 20,
    width: 100,
  },
});

function SplashScreen() {
  const { animate, style1, style2, style3, style4 } = useSplashAnimation();
  const controller = useWebRtcCall();
  const mail = "Rm@stanbic.com";
  const options = [
    {
      action: () => sendMail(mail),
      icon: "mail",
      title: mail,
    },
    {
      action: controller.handleCreate,
      icon: "phone-call",
      title: "Call",
    },
    {
      action: controller.handleCreate,
      icon: "video",
      title: "Video Call",
    },
  ];

  useEffect(() => {
    animate();
  }, [animate]);

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
            <CustomText fontFamily="Black" style={styles.animatedText}>
              Stanbic
            </CustomText>
          </Animated.View>
        </Animated.View>
      </AnimatedGradient>

      <Animated.View style={[styles.contentWrapper, style4]}>
        <View style={styles.contentChild}>
          <Content
            accountOfficerName="Account Officer"
            available="Available"
            options={options}
          />
        </View>
      </Animated.View>
    </View>
  );
}

export { SplashScreen };
