import { StyleSheet } from "react-native";

import { rf, rh, rw } from "@/utils/responsive-screen";

const styles = StyleSheet.create({
  acceptText: {
    color: "#fff",
    fontStyle: "italic",
    marginBottom: 12,
  },
  actionButton: {
    marginHorizontal: rf(3),
  },
  actionButtonsContainer: {
    alignItems: "center",
    marginHorizontal: rf(-3),
    paddingBottom: rf(5),
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
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
  createButton: {
    backgroundColor: "blue",
  },
  declineText: {
    color: "#fff",
    fontStyle: "italic",
    marginTop: 12,
  },
  elevated: {
    elevation: 10,
  },
  flexEnd: {
    justifyContent: "flex-end",
  },
  fullSize: {
    height: "100%",
    width: "100%",
  },
  iconContainer: {
    borderRadius: 30,
    padding: 20,
  },
  localVideoSize: {
    height: rh(25),
    position: "absolute",
    right: rf(3),
    top: rf(3),
    width: rw(25),
  },
  repeatContainer: {
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
  },
});

export { styles };
