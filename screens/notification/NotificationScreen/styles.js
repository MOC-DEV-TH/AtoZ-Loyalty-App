import { Center } from "native-base";
import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerIcon: {
    width: 100,
    height: 120,
    resizeMode: "contain",
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    marginTop: 20,
    height: 40,
    width: 120,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
});
