import { Center } from "native-base";
import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginLeft: 18,
    marginRight: 18,
  },
  item: {
    backgroundColor: "#f9c2ff",
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 18,
    alignSelf:"center",
    color:"white",
  },
  sectionTitleContainer : {
    padding:8,
    backgroundColor:Colors.yellow,
    alignItems:"center",
    alignSelf:"center",
    width:"100%",
    justifyContent:"center"
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#F5FCFF88"
  }
});
