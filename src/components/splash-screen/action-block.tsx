import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Feather";

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
    height: 32,
    justifyContent: "center",
    marginRight: 24,
    width: 32,
  },
});
interface Props {
  action(): void;
  icon: string;
  title: string;
}
export const Block = (props: Props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { action, icon, title } = props;
  return (
    <TouchableOpacity onPress={action} style={styles.container}>
      <LinearGradient
        angle={45}
        angleCenter={{ x: 0.5, y: 0.5 }}
        colors={["#039BFE", "#072D92"]}
        style={styles.gradient}
        useAngle
      >
        <Icon color="#fff" name={icon} size={16} />
      </LinearGradient>
      <CustomText fontFamily="Medium">{title}</CustomText>
    </TouchableOpacity>
  );
};
