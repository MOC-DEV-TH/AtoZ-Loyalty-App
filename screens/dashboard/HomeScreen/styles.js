import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  placeholderStyles: {
    color: "grey",
  },
  dropDownContainer : {
    position : "absolute",
    width:100,
    height:30,
    right:10,
    top:10
  },
  headerIcon: {
    width: 100,
    height: 120,
    resizeMode: "contain",
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    flex: 1,
    height:'100%',
    width:'100%',
    resizeMode: "contain",
  },
})
