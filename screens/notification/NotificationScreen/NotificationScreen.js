import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles';


export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <Text>NotificationScreen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

NotificationScreen.navigationOptions = (props) => {
    return {
      headerTitle: "",
      headerTintColor: "black",
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: "white",
        height:0
      },
  
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
      ),
    };
  };