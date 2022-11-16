import AwesomeAlert from "react-native-awesome-alerts";
import { translate } from "react-native-translate";
import Colors from "../constants/Colors";
import styles from "../screens/account/AccountScreen/styles";

export default function DeactivateAccountAlert(props) {
  return (
    <AwesomeAlert
      show={props.showAlert}
      title="Account Deactivation"
      showConfirmButton={true}
      showCancelButton={true}
      confirmText="Deactivate Now"
      cancelText="Cancel"
      message={translate("deactivate_body_text")}
      closeOnHardwareBackPress={false}
      confirmButtonColor={"red"}
      confirmButtonStyle={{}}
      confirmButtonTextStyle={{color:"white",textAlign:"center"}}
      cancelButtonStyle={styles.alertButton}
      cancelButtonColor={"white"}
      cancelButtonTextStyle={{color:"black",textAlign:"center"}}
      titleStyle={{color:"white",fontWeight:"400",}}
      closeOnTouchOutside={false}
      messageStyle={{color:Colors.white,paddingTop:20}}
      contentContainerStyle={{ width: "100%", backgroundColor: Colors.primary,justifyContent:"center",}}
      actionContainerStyle={{padding:20}}
      onConfirmPressed={props.onConfirmPressed}
      onCancelPressed={props.onCancelPressed}
    />
  );
}
