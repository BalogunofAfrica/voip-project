import { StyleSheet } from "react-native";

const blockStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 16,
    width: "100%",
  },
  gradient: {
    alignItems: "center",
    backgroundColor: "rgb(7,45,146)",
    borderRadius: 50,
    height: 32,
    justifyContent: "center",
    marginRight: 24,
    width: 32,
  },
});

const contentStyles = StyleSheet.create({
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

const screenStyles = StyleSheet.create({
  animatedText: {
    alignSelf: "center",
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  animatedWrapper: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  container: StyleSheet.absoluteFillObject,
  contentChild: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 84,
  },
  contentText: {
    color: "#000",
    fontSize: 14,
  },
  contentWrapper: {
    backgroundColor: "rgba(0,0,0,0.04)",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 0,
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    flex: 1,
    zIndex: 1,
  },
  imageStyle: {
    height: 114.29,
    marginBottom: 20,
    width: 100,
  },
});

export { blockStyles, contentStyles, screenStyles };
