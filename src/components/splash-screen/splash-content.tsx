import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { CustomText } from "../typography";
import { Block } from "./action-block";

const styles = StyleSheet.create({
  detailWrapper: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  image: {
    borderRadius: 50,
    height: 100,
    marginRight: 24,
    resizeMode: "cover",
    width: 100,
  },
  separator: {
    borderTopColor: "#777",
    borderTopWidth: 1,
    marginVertical: 20,
    width: "100%",
  },
  text1: {
    marginBottom: 8,
  },
  text2: {
    color: "#777",
  },
});

type ContentType = {
  action(): void;
  title: string;
};
interface Props {
  options: ContentType[];
}
export const Content = (props: Props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { options } = props;
  return (
    <>
      <View style={styles.detailWrapper}>
        <Image source={require("@/assets/img/user.png")} style={styles.image} />
        <View>
          <CustomText fontFamily="Black" style={styles.text1}>
            Account Officer
          </CustomText>
          <CustomText fontFamily="Medium" style={styles.text2}>
            Available
          </CustomText>
        </View>
      </View>
      <View style={styles.separator} />
      {options.map(({ title }) => (
        <Block key={`block-${title}`} title={title} />
      ))}
    </>
  );
};
