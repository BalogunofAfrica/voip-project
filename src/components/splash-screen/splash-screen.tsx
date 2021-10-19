import React, { useEffect } from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated from "react-native-reanimated";
import Toast from "react-native-simple-toast";

import { CustomText } from "@/components/typography";
import { useSplashAnimation } from "@/hooks/animation/use-splash-animation";
import { isWorkingHour, sendMail } from "@/utils/util-functions";

import { Content } from "./splash-content";
import { screenStyles } from "./styles";

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

interface Props {
  createCall(): void;
}

function SplashScreen(props: Props) {
  const handlePress = () => {
    if (isWorkingHour()) return props.createCall();
    return Toast.show(
      "Oops, sorry we are currently out of office. \nPlease call between 𝟴 𝗮.𝗺 and 𝟰 𝗽.𝗺.",
      Toast.LONG,
    );
  };

  const { animate, style1, style2, style3, style4 } = useSplashAnimation();
  const mail = "Anthony.Rommanus@stanbicibtc.com";
  const options = [
    {
      action: () => sendMail(mail),
      icon: "envelope",
      title: mail,
    },
    {
      action: handlePress,
      icon: "phone",
      title: "Voice Call",
    },
    {
      action: handlePress,
      icon: "video-camera",
      title: "Video Call",
    },
  ];

  useEffect(() => {
    animate();
  }, [animate]);

  // Going to Move Up like Nav Bar...
  return (
    <View style={screenStyles.container}>
      <AnimatedGradient
        angle={45}
        angleCenter={{ x: 0.5, y: 0.5 }}
        colors={["#039BFE", "#072D92"]}
        style={[screenStyles.gradient, style1]}
        useAngle
      >
        <Animated.View style={screenStyles.animatedWrapper}>
          <Animated.Image
            source={require("@/assets/standard_bank_logo.png")}
            style={[screenStyles.imageStyle, style2]}
          />

          <Animated.View style={[style3]}>
            <CustomText fontFamily="Black" style={screenStyles.animatedText}>
              Stanbic IBTC
            </CustomText>
          </Animated.View>
        </Animated.View>
      </AnimatedGradient>

      <Animated.View style={[screenStyles.contentWrapper, style4]}>
        <View style={screenStyles.contentChild}>
          <Content
            accountOfficerName="Anthony Rommanus"
            available="Available"
            options={options}
          />
        </View>
      </Animated.View>
    </View>
  );
}

export { SplashScreen };
