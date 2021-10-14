import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

interface Props extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  fontFamily?:
    | "Black"
    | "Bold"
    | "Book"
    | "ExtraLight"
    | "Light"
    | "Medium"
    | "Regular"
    | "Thin";
}

const styles = StyleSheet.create({
  defaultStyle: {
    color: "#000",
    fontFamily: "BentonSans-Bold",
  },
});

const textStyles = StyleSheet.create({
  Black: {
    fontFamily: "BentonSans-Black",
  },
  Bold: {
    fontFamily: "BentonSans-Bold",
  },
  Book: {
    fontFamily: "BentonSans-Book",
  },
  ExtraLight: {
    fontFamily: "BentonSans-ExtraLight",
  },
  Light: {
    fontFamily: "BentonSans-Light",
  },
  Medium: {
    fontFamily: "BentonSans-Medium",
  },
  Regular: {
    fontFamily: "BentonSans-Regular",
  },
  Thin: {
    fontFamily: "BentonSans-Thin",
  },
});

function CustomText(props: Props) {
  // eslint-disable-next-line react/destructuring-assignment
  const { children, style = {}, fontFamily = "Regular", ...otherProps } = props;
  let textStyle: object;
  switch (fontFamily) {
    case "Black":
      textStyle = textStyles.Black;
      break;
    case "Bold":
      textStyle = textStyles.Bold;
      break;
    case "Book":
      textStyle = textStyles.Book;
      break;
    case "ExtraLight":
      textStyle = textStyles.ExtraLight;
      break;
    case "Light":
      textStyle = textStyles.Light;
      break;
    case "Medium":
      textStyle = textStyles.Medium;
      break;
    case "Regular":
      textStyle = textStyles.Regular;
      break;
    case "Thin":
      textStyle = textStyles.Thin;
      break;
    default:
      textStyle = textStyles.Regular;
      break;
  }
  return (
    <Text
      style={[styles.defaultStyle, textStyle, style]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      {children}
    </Text>
  );
}

export { CustomText };
