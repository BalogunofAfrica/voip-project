import React from "react";
import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";

import { CustomText } from "../typography";
import { blockStyles } from "./styles";

interface Props {
  action(): void;
  icon: string;
  title: string;
}
export const Block = (props: Props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { action, icon, title } = props;
  return (
    <TouchableOpacity onPress={action} style={blockStyles.container}>
      <LinearGradient
        angle={45}
        angleCenter={{ x: 0.5, y: 0.5 }}
        colors={["#039BFE", "#072D92"]}
        style={blockStyles.gradient}
        useAngle
      >
        <Icon color="#fff" name={icon} size={16} />
      </LinearGradient>
      <CustomText fontFamily="Medium">{title}</CustomText>
    </TouchableOpacity>
  );
};
