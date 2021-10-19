import React from "react";
import { Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { styles } from "@/components/calls/shared/styles";
import { CustomText } from "@/components/typography";

import type { Props } from "./feedback";

const Remarks = (
  props: Props,
  setSubmitted: (parameter: boolean) => void,
  submitted: boolean,
) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { hide } = props;
  return submitted ? (
    <>
      <CustomText fontFamily="Bold" style={styles.feedbackHeading2}>
        Thanks for your feedback!
      </CustomText>
      <Pressable
        onPress={() => {
          hide();
          setSubmitted(false);
        }}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1, width: "100%" }]}
      >
        <LinearGradient
          angle={90}
          angleCenter={{ x: 0.5, y: 0.5 }}
          colors={["#a6a6a6", "#808080"]}
          style={styles.feedbackButton}
          useAngle
        >
          <CustomText fontFamily="Bold" style={styles.feedbackText}>
            Close
          </CustomText>
        </LinearGradient>
      </Pressable>
    </>
  ) : null;
};

export { Remarks };
