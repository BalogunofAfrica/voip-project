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
  backDrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
  },
  blackBg: {
    backgroundColor: "#000",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  callingText: {
    color: "#fff",
    fontSize: rf(3),
  },
  callingTextContainer: {
    paddingTop: rf(5),
  },
  callingTextContainerFixed: {
    alignItems: "center",
    position: "absolute",
    top: 0,
  },
  cancelButton: {
    backgroundColor: "red",
  },
  container: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    flex: 1,
    justifyContent: "space-between",
    padding: rf(2),
  },
  containerAbsolute: {
    ...StyleSheet.absoluteFillObject,
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
  feedbackButton: {
    alignItems: "center",
    borderRadius: 40,
    height: 50,
    justifyContent: "center",
    width: "100%",
  },
  feedbackButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  feedbackHeading: {
    fontSize: 16,
  },
  feedbackHeading2: {
    fontSize: 18,
    marginBottom: 48,
  },
  feedbackText: {
    color: "#fff",
  },
  flexEnd: {
    justifyContent: "flex-end",
  },
  fullSize: {
    height: "100%",
    width: "100%",
  },
  gradientBorder: {
    borderRadius: 4,
    marginTop: 20,
    padding: 1.5,
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
    zIndex: 2,
  },
  modalContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  modalEffect: {
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 5,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "85%",
  },
  repeatContainer: {
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "white",
    minHeight: 100,
    textAlignVertical: "top",
    width: "100%",
  },
  wrapper: {
    flex: 1,
    position: "relative",
  },
});

export { styles };
