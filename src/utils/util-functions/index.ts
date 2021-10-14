import { Linking } from "react-native";

const sendMail = (mail: string) => {
  Linking.openURL(`mailto:${mail}`);
};

export { sendMail };
