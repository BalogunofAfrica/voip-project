import React from "react";
import { Pressable, TextInput, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { styles } from "@/components/calls/shared/styles";
import { CustomText } from "@/components/typography";

import type { Props } from "./feedback";

const Form = (
  props: Props,
  handleSubmit: () => void,
  setFeedback: (feedback: string) => void,
  submitted: boolean,
) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { hide } = props;
  return !submitted ? (
    <>
      <CustomText fontFamily="Bold" style={styles.feedbackHeading}>
        How was your conversation?
      </CustomText>
      <LinearGradient
        angle={45}
        angleCenter={{ x: 0.5, y: 0.5 }}
        colors={["#039BFE", "#072D92"]}
        style={styles.gradientBorder}
        useAngle
      >
        <TextInput
          multiline
          onChangeText={setFeedback}
          selectionColor="#00A1E0"
          style={styles.textInput}
        />
      </LinearGradient>
      <View style={styles.feedbackButtonContainer}>
        <Pressable
          onPress={hide}
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1, width: "45%" },
          ]}
        >
          <LinearGradient
            angle={90}
            angleCenter={{ x: 0.5, y: 0.5 }}
            colors={["#a6a6a6", "#808080"]}
            style={styles.feedbackButton}
            useAngle
          >
            <CustomText fontFamily="Bold" style={styles.feedbackText}>
              Cancel
            </CustomText>
          </LinearGradient>
        </Pressable>
        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1, width: "45%" },
          ]}
        >
          <LinearGradient
            angle={90}
            angleCenter={{ x: 0.5, y: 0.5 }}
            colors={["#039BFE", "#072D92"]}
            style={styles.feedbackButton}
            useAngle
          >
            <CustomText fontFamily="Bold" style={styles.feedbackText}>
              Send
            </CustomText>
          </LinearGradient>
        </Pressable>
      </View>
    </>
  ) : null;
};

export { Form };
