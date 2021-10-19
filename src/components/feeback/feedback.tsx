import React, { useState } from "react";
import { Modal, View } from "react-native";

import { styles } from "@/components/calls/shared/styles";

import { Form } from "./input";
import { Remarks } from "./submitted-remarks";

export type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  hide: () => void;
  visible: boolean;
};

const FeedBack = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [feedback, setFeedback] = useState<string>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleSubmit = () => {
    setSubmitted(true);
  };
  return (
    <Modal animationType="fade" collapsable transparent visible={props.visible}>
      <View style={styles.backDrop} />
      <View style={styles.modalContainer}>
        <View style={styles.modalEffect}>
          {Form(props, handleSubmit, setFeedback, submitted)}
          {Remarks(props, setSubmitted, submitted)}
        </View>
      </View>
    </Modal>
  );
};

export { FeedBack };
