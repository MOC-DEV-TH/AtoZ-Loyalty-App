import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity,Image,SafeAreaView } from 'react-native';
import i18n from '../../../I18n/i18n';
import { Ionicons } from "@expo/vector-icons";
import styles from './styles';
import Colors from '../../../constants/Colors';


export default function PointHistoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{i18n.t('welcome')}</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
PointHistoryScreen.navigationOptions = (props) => {
  return {
    headerTitle: "",
    headerLeft: () => (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <Image
            style={styles.headerIcon}
            source={require("../../../assets/app_logo_blue.png")}
          />
        </TouchableOpacity>
      </View>
    ),

    headerRight: () => (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       <TouchableOpacity>
        <Ionicons size={38} style={{color:Colors.white}} name="menu"></Ionicons>
        </TouchableOpacity>
      </View>
    ),



  };
};