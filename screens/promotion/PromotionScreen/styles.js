import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:10
  },
  headerIcon: {
    width: 100,
    height: 120,
    resizeMode: "contain",
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: Colors.yellow,
    height: 40,
    width: 150,
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
  },  
  image:{
    width:100,
    height:100,
  },
  title:{
    fontWeight: "bold",
    color:Colors.primary,    
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
  }

});