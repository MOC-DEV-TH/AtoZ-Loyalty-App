import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList
} from "react-native";
import i18n from "../../../I18n/i18n";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import { Menu, Pressable, Box, Center,HStack, VStack } from "native-base";
import { useEffect, useCallback, useState } from "react";
import { translate } from "react-native-translate";
import * as SQLite from "expo-sqlite";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Text from "../../../components/Typography";
import ContainerFluid from "../../../components/ContainerFluid";
import * as notificationActions from "../../../store/actions/notification";


//open database
//const db = SQLite.openDatabase("db.aToz");

export default NotificationScreen = (props) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

//  useEffect(()=>{
//   db.transaction(tx => {
//     tx.executeSql('SELECT * FROM notifications', null,
//       (txObj, { rows: { _array } }) => {setNotificationData(_array)},
//       (txObj, error) => console.log('Error ', error)
//       ) 
//   })
//  })

const notificationData = useSelector(
  (state) => state.notification.notification_data,
  shallowEqual
);

const loadNotificationData = useCallback(async () => {
  setIsRefreshing(true);
  try {
    await dispatch(notificationActions.getAllNotifications());
  } catch (error) {}
  setIsRefreshing(false);
}, [dispatch]);

useEffect(() => {
  loadNotificationData();
}, [loadNotificationData]);

 const renderItem = ({ item }) => {
  return (
    <VStack style={{marginTop:10}}>
        <Text style={{fontSize:17,fontWeight:"bold",color:Colors.primary}}>{item.title}</Text>
        <Text style={{color:Colors.primary}}>
        {item.message}
        </Text>
    </VStack>
  );
};

  return (
    <ContainerFluid>
      <View style={styles.button}>
        <Text style={styles.text}>{translate("inbox")}</Text>
      </View>
      <FlatList
          showsVerticalScrollIndicator={false}
          style={{marginTop:60}}
          onRefresh={loadNotificationData}
          refreshing={isRefreshing}
          data={notificationData}
          renderItem={renderItem}
          keyExtractor={(item) => item.nid}
        />
    </ContainerFluid>
  );
};

NotificationScreen.navigationOptions = (props) => {
  return {
    headerTitle: () => (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{fontSize:22,color:Colors.white,padding:10}}>{translate("notification")}</Text>
      </View>
    ),
    headerLeft: () => (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
          <Image
            style={styles.headerIcon}
            source={require("../../../assets/left_arrow_circle.png")}
          />
        </TouchableOpacity>
      </View>
    ),
  };
};