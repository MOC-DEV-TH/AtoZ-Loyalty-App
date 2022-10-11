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
    width: 120,
    height: 80,
    resizeMode: "contain",
    marginLeft:18
  },
  button: {
    backgroundColor: Colors.yellow,
    height: 40,
    paddingLeft:25,
    paddingRight:25,
    marginTop:30,
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
  alertButton: {
    width: 120,
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
    padding: 20,
},


});