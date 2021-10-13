import React, { FC } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { rf } from "@/utils/responsive-screen";

export type IconButtonProps = TouchableOpacityProps;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: rf(3),
    elevation: 10,
    height: rf(6),
    justifyContent: "center",
    width: rf(6),
  },
});

const IconButton: FC<IconButtonProps> = (props) => {
  // destructuring props for a cleaner button component
  // eslint-disable-next-line react/destructuring-assignment
  const { children, style, ...rest } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[styles.button, style]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};

export { IconButton };
