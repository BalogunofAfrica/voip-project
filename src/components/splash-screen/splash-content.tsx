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
    borderRadius: 36,
    height: 70,
    marginRight: 24,
    resizeMode: "cover",
    width: 70,
  },
  separator: {
    borderTopColor: "#777",
    borderTopWidth: 1,
    marginVertical: 20,
    width: "100%",
  },
  text1: {
    fontSize: 16,
    marginBottom: 4,
  },
  text2: {
    color: "#777",
  },
});

type ContentType = {
  action(): void;
  icon: string;
  title: string;
};
interface Props {
  accountOfficerName: string;
  available: string;
  options: ContentType[];
}
export const Content = (props: Props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { accountOfficerName, available, options } = props;
  return (
    <>
      <View style={styles.detailWrapper}>
        <Image source={require("@/assets/img/user.png")} style={styles.image} />
        <View>
          <CustomText fontFamily="Black" style={styles.text1}>
            {accountOfficerName}
          </CustomText>
          <CustomText fontFamily="Medium" style={styles.text2}>
            {available}
          </CustomText>
        </View>
      </View>
      <View style={styles.separator} />
      {options.map(({ action, icon, title }) => (
        <Block
          action={action}
          icon={icon}
          key={`block-${title}`}
          title={title}
        />
      ))}
    </>
  );
};
