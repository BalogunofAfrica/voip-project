import { StyleSheet } from "react-native";

import { rf, rh, rw } from "@/utils/responsive-screen";

const styles = StyleSheet.create({
  actionButton: {
    marginHorizontal: rf(3),
  },
  actionButtonsContainer: {
    flexDirection: "row",
    marginHorizontal: rf(-3),
    paddingBottom: rf(5),
  },
  answerButton: {
    backgroundColor: "green",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    height: rh(100),
    width: rw(100),
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  callingText: {
    color: "black",
    fontSize: rf(3),
  },
  callingTextContainer: {
    paddingTop: rf(5),
  },
  cancelButton: {
    backgroundColor: "red",
  },
  container: {
    alignItems: "center",
    backgroundColor: "rgba(2, 2, 2, 0.5)",
    flex: 1,
    justifyContent: "space-between",
    padding: rf(2),
  },
  wrapper: {
    flex: 1,
  },
});

export { styles };
