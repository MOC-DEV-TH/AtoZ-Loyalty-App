import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { translate } from "react-native-translate";

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
headerIcon: {
  width: 30,
  height: 30,
  resizeMode: "contain",
  marginLeft: 18,
  marginRight: 18,
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
description:{
  fontFamily:translate("bodyFont"),
  textAlign:"justify",
  color:Colors.primary,
  fontWeight:"600",
},
triangleLeft: {
  width: 0,
  height: 0,
  borderLeftWidth: 60,
  borderRightWidth: 60,
  borderBottomWidth: 120,
  borderStyle: 'solid',
  backgroundColor: 'transparent',
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderBottomColor: '#00BCD4'
},
});