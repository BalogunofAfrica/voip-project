import React from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { CustomText } from "../typography";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 16,
    width: "100%",
  },
  gradient: {
    alignItems: "center",
    backgroundColor: "rgb(7,45,146)",
    borderRadius: 50,
    height: 24,
    justifyContent: "center",
    marginRight: 24,
    width: 24,
  },
});

interface Props {
  title: string;
}
export const Block = (props: Props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { title } = props;
  return (
    <View style={styles.container}>
      <LinearGradient
        angle={45}
        angleCenter={{ x: 0.5, y: 0.5 }}
        colors={["#039BFE", "#072D92"]}
        style={styles.gradient}
        useAngle
      />
      <CustomText fontFamily="Medium">{title}</CustomText>
    </View>
  );
};
