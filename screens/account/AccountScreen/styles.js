import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertButton: {
    width: 100,
    textAlign: "center",
    justifyContent: "center",
},
  alertButtonText: {
    textAlign: "center",
    color: Colors.primary,
},
  alertTitle: {
    color: Colors.white,
    fontSize: 16,
},
  alertContentContainer: {
    backgroundColor: Colors.primary,
    padding: 25,
},
});