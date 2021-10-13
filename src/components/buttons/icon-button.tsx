import React, { FC } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export type IconButtonProps = TouchableOpacityProps;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 25,
    color: "white",
    elevation: 10,
    height: 50,
    justifyContent: "center",
    padding: 5,
    width: 50,
  },
});

const IconButton: FC<IconButtonProps> = (props) => {
  // destructuring props for a cleaner button component
  // eslint-disable-next-line react/destructuring-assignment
  const { children, style, ...rest } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TouchableOpacity style={[styles.button, style]} {...rest}>
      {children}
    </TouchableOpacity>
  );
};

export { IconButton };
