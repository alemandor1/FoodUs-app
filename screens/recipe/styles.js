import { StyleSheet } from "react-native";
import { SIZES, COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  touch: {
    width: 50,
    paddingLeft: SIZES.padding * 2,
    justifyContent: "center",
  },
  img: {
    width: 30,
    height: 30,
  },
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SIZES.padding * 3,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray3,
  },
});

export default styles;
