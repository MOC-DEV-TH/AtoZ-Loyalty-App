import AwesomeAlert from "react-native-awesome-alerts";
import Colors from "../constants/Colors";
import styles from "../screens/account/AccountScreen/styles";

export default function SessionExpireAlert(props){
    return (
        <AwesomeAlert
          show={props.showAlert}
          title="SessionExpire!"
          showConfirmButton={true}
          confirmText="Yes"
          closeOnHardwareBackPress = {false}
          confirmButtonColor={Colors.yellow}
          confirmButtonStyle={styles.alertButton}
          confirmButtonTextStyle={styles.alertButtonText}
          titleStyle={styles.alertTitle}
          closeOnTouchOutside={false}
          contentContainerStyle={{width:"100%",backgroundColor:Colors.primary}}
          onConfirmPressed={props.onConfirmPressed}/>
    );
}