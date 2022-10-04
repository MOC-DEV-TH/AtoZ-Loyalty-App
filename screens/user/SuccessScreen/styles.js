import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
    },
    button: {
        backgroundColor: Colors.yellow,
        height: 40,
        width:"50%",
        borderRadius: 14,
        marginTop:10,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft:15,
        paddingRight:15,
        position:"absolute",
        bottom:60
      },
      buttonTitle: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: "bold",
      },
  });