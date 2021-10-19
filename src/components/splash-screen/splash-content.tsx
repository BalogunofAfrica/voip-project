import React from "react";
import { Image, View } from "react-native";

import { CustomText } from "../typography";
import { Block } from "./action-block";
import { contentStyles } from "./styles";

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
      <View style={contentStyles.detailWrapper}>
        <Image
          source={require("@/assets/img/user_2.jpg")}
          style={contentStyles.image}
        />
        <View>
          <CustomText
            fontFamily="Medium"
            style={[
              contentStyles.text2,
              {
                fontSize: 10,
                marginBottom: 8,
              },
            ]}
          >
            Account Officer
          </CustomText>
          <CustomText fontFamily="Black" style={contentStyles.text1}>
            {accountOfficerName}
          </CustomText>
          <CustomText fontFamily="Medium" style={contentStyles.text2}>
            {available}
          </CustomText>
        </View>
      </View>
      <View style={contentStyles.separator} />
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
