import React, { VFC } from "react";
import { View } from "react-native";
import Toast from "react-native-simple-toast";

import { IconButton } from "@/components/buttons";
import { styles } from "@/components/calls/shared/styles";
import { CustomText } from "@/components/typography";
import { isWorkingHour } from "@/utils/util-functions";

type IncomingCallProps = {
  onCreate: () => void;
};

const OutgoingCall: VFC<IncomingCallProps> = (props) => {
  const handlePress = () => {
    if (isWorkingHour("13:40:0", "23:00:0")) return props.onCreate();
    return Toast.show(
      "Oops, sorry we are currently out of office. \n\nPlease call between 𝟴 𝗮.𝗺 and 𝟰 𝗽.𝗺.",
      Toast.LONG,
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.callingTextContainer}>
          <CustomText style={styles.callingText}>Create call</CustomText>
        </View>
        <View style={styles.actionButtonsContainer}>
          <IconButton
            onPress={handlePress}
            style={[styles.actionButton, styles.createButton]}
          >
            <CustomText style={styles.buttonText}>C</CustomText>
          </IconButton>
        </View>
      </View>
    </View>
  );
};

export { OutgoingCall };
