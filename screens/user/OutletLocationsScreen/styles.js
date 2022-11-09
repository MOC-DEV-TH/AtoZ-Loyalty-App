import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import {Dimensions} from 'react-native';
import { translate } from "react-native-translate";
const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:10
  },
  headerIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginLeft: 18,
  },
  button: {
    backgroundColor: Colors.yellow,
    height: 40,
    paddingLeft:20,
    paddingRight:20,
    marginTop:10,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 17,
  },  
  image:{
    width:120,
    height:100,
    resizeMode:"cover"
  },
  title:{
    fontWeight: "bold",
    color:Colors.primary,    
    marginBottom:5
  },
  description:{
    textAlign:"justify",
    color:Colors.primary,
  },

  vContainer:{
    width:windowWidth - 150,
  },

  flatList:{
    marginTop:10,
    justifyContent:'space-between',
    alignItems:'flex-start',
  },
  description:{
    fontFamily:translate("bodyFont"),
    textAlign:"justify",
    color:Colors.primary,
    fontWeight:"600",
    lineHeight:30
  },

});