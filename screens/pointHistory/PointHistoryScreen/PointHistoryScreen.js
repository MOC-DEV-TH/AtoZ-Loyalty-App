import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  SectionList,
  FlatList,
  ActivityIndicator,
} from "react-native";
import i18n from "../../../I18n/i18n";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect, useCallback } from "react";
import * as pointHistoryActions from "../../../store/actions/point_history";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import { Menu, Pressable, Box } from "native-base";
import { translate } from "react-native-translate";
import SessionExpireAlert from "../../../components/SessionExpireAlert";

export default PointHistoryScreen = (props) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [alert, setShowAlert] = useState(false);

  const loadPointHistoryData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(pointHistoryActions.getPointHistory());
    } catch (error) {}
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    loadPointHistoryData();
  }, [loadPointHistoryData]);

  useEffect(() => {
    console.log("Will Focus");
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadPointHistoryData
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadPointHistoryData]);

  const onConfirm = () => {
    dispatch(pointHistoryActions.setEmptyResponseCode());
    props.navigation.navigate("AccountDashboard");
    setShowAlert(false);
  };

  const responseCode = useSelector(
    (state) => state.pointHistory.response_code,
    shallowEqual
  );

  const showSessionDialog = useCallback(() => {
    setShowAlert(true);
  });

  useEffect(() => {
    if (responseCode == "005") {
      showSessionDialog();
    }
  });

  const pointHistoryData = useSelector(
    (state) => state.pointHistory.pointHistoryData,
    shallowEqual
  );

  const renderItem = ({ item }) => {
    let items = [];
    if (item.rows) {
      items = item.rows.map((row) => {
        return (
          <Text style={{ padding: 12, alignSelf: "center" }}>{row.desc}</Text>
        );
      });
    }
    return (
      <View>
        <View style={styles.sectionTitleContainer}>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 18,
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            {item.month}
          </Text>
        </View>
        {items}
      </View>
    );
  };
  const extractKey = ({ rows }) => rows;
  return (
    <>
      <SessionExpireAlert showAlert={alert} onConfirmPressed={onConfirm} />

      <View style={styles.container}>
        <Text
          style={{
            marginTop: 12,
            marginBottom: 12,
            color: Colors.primary,
            fontSize: 24,
            fontWeight: "bold",
            alignSelf: "center",
          }}
        >
          1000 {translate("pointavailable")}
        </Text>
        {isRefreshing ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            onRefresh={loadPointHistoryData}
            refreshing={isRefreshing}
            style={styles.container}
            data={pointHistoryData}
            renderItem={renderItem}
            keyExtractor={extractKey}
          />
        )}
      </View>
    </>
  );
};

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
      <Box w="90%" alignItems="center">
        <Menu
          w="140"
          trigger={(triggerProps) => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                <Ionicons
                  size={38}
                  style={{ color: Colors.white, marginRight: 15 }}
                  name="menu"
                ></Ionicons>
              </Pressable>
            );
          }}
        >
          <Menu.Item onPress={() => props.navigation.navigate("MyAccount")}>
            {translate("myaccount")}
          </Menu.Item>
          <Menu.Item onPress={() => props.navigation.navigate("AboutUs")}>
            {translate("aboutus")}
          </Menu.Item>
          <Menu.Item
            onPress={() => props.navigation.navigate("TermAndCondition")}
          >
            {translate("termandcondition")}
          </Menu.Item>
          <Menu.Item onPress={() => props.navigation.navigate("Faq")}>
            {translate("faq")}
          </Menu.Item>
        </Menu>
      </Box>
    ),
  };
};
