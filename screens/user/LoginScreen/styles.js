import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent:"center",
  },

  logo: {
    height: 50,
    width: 160,
    margin: 30,
    resizeMode: "cover",
    alignItems: "center",
    alignSelf: "center",
  },

  SectionStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: Colors.primary,
    height: 40,
    borderRadius: 5 ,
    padding:12,
},

  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 16,
    borderColor: "grey",
    borderWidth: 1,
  },
  button: {
    backgroundColor: Colors.primary,
    marginTop: 40,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  rowContainer: {
    flexDirection: "row",
    marginTop: 60,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  horizontal_divider: {
    backgroundColor: Colors.grey,
    flex: 1,
    height: 1,
  },

  tab_container: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
  },

  footer_container: {
    height: 70,
    width: 70,
    borderRadius: 12,
    borderColor: Colors.grey,
    borderWidth: 1,
  },

  footer_logo: {
    flex: 1,
    height: 30,
    width: 30,
    resizeMode: "contain",
    alignItems: "center",
    alignSelf: "center",
  },
  logo: {
    height: 50,
    width: 160,
    margin: 30,
    resizeMode: "cover",
    alignItems: "center",
    alignSelf: "center",
  },
});
