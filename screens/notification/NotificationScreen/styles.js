import { Center } from "native-base";
import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import i18n from "../../../I18n/i18n";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft:20,
    paddingRight:20
  },
  headerIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginLeft: 18,
    marginRight: 18,
  },
  button: {
    backgroundColor: Colors.yellow,
    top:20,
    height: 40,
    width: 120,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    position : 'absolute',
  },
  text: {
    alignSelf: "center",
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 17,
    padding:10
  },
  description:{
    fontFamily:i18n.t("bodyFont"),
    textAlign:"justify",
    color:Colors.primary,
    fontWeight:"600",
  },
  title:{
    fontSize:17,
    fontWeight:"900",
    color:Colors.primary
  }
});
