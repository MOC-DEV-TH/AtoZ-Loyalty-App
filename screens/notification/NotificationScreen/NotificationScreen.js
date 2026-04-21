import {
  View,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Image,
} from "react-native";
import i18n from "../../../I18n/i18n";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import { VStack, Heading } from "native-base";
import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Text from "../../../components/Typography";
import ContainerFluid from "../../../components/ContainerFluid";
import * as notificationActions from "../../../store/actions/notification";

const NotificationScreen = (props) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleBackButtonClick = () => {
    props.navigation.navigate("Home");
    return true;
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonClick
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const notificationData = useSelector(
    (state) => state.notification.notification_data,
    shallowEqual
  );

  const loadNotificationData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(notificationActions.getAllNotifications());
    } catch (error) {
      console.log(error);
    }
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    loadNotificationData();
  }, [loadNotificationData]);

  const renderItem = ({ item }) => {
    return (
      <VStack
        style={{
          marginTop: 10,
          backgroundColor: "#f9f9f9",
          borderRadius: 8,
          padding: 10,
        }}
      >
        <Heading color={Colors.primary} fontSize={18}>
          {item.title}
        </Heading>

        <Text style={styles.description}>{item.message}</Text>
      </VStack>
    );
  };

  return (
    <ContainerFluid>
      <View style={styles.button}>
        <Text style={styles.text}>{i18n.t("inbox")}</Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 60, marginBottom: 20 }}
        onRefresh={loadNotificationData}
        refreshing={isRefreshing}
        data={notificationData}
        renderItem={renderItem}
        keyExtractor={(item) => item.nid.toString()}
      />
    </ContainerFluid>
  );
};

export default NotificationScreen;