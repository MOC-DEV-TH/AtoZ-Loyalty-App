import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerIcon: {
    width: 100,
    height: 120,
    resizeMode: "contain",
    marginLeft: 10,
    marginRight: 10,
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
    backgroundColor:Colors.primary,
    alignItems:"center"
  }
});
