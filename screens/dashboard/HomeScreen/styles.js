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
    width: 120,
    height: 80,
    resizeMode: "contain",
    marginLeft:18
  },
  image: {
    flex: 1,
    height:'100%',
    width:'100%',
    resizeMode: "contain",
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    with:"100%",
    height:"100%",
    resizeMode: "cover",
    backgroundColor: Colors.primary
  },
})
