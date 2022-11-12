import AwesomeAlert from "react-native-awesome-alerts";
import Colors from "../constants/Colors";
import styles from "../screens/account/AccountScreen/styles";

export default function NoInternetConnectionAlert(props){
    return (
        <AwesomeAlert
          show={props.showAlert}
          title="Check your connection"
          showConfirmButton={true}
          confirmText="Ok"
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