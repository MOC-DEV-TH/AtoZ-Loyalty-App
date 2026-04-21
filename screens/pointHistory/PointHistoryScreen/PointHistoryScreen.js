import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import i18n from "../../../I18n/i18n";
import React, { useState, useEffect, useCallback } from "react";
import * as pointHistoryActions from "../../../store/actions/point_history";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import SessionExpireAlert from "../../../components/SessionExpireAlert";

const PointHistoryScreen = (props) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [alert, setShowAlert] = useState(false);

  const loadPointHistoryData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(pointHistoryActions.getPointHistory());
    } catch (error) {
      console.log(error);
    }
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    loadPointHistoryData();
  }, [loadPointHistoryData]);

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

  const onConfirm = () => {
    dispatch(pointHistoryActions.setEmptyResponseCode());
    props.navigation.navigate("AccountDashboard");
    setShowAlert(false);
  };

  const available_point = useSelector(
    (state) => state.pointHistory.available_point,
    shallowEqual
  );

  const pointHistoryData = useSelector(
    (state) => state.pointHistory.pointHistoryData,
    shallowEqual
  );

  const responseCode = useSelector(
    (state) => state.pointHistory.response_code,
    shallowEqual
  );

  useEffect(() => {
    if (responseCode === "005") {
      setShowAlert(true);
    }
  }, [responseCode]);

  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.sectionTitleContainer}>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {item.month}
          </Text>
        </View>

        {item.rows?.map((row, index) => (
          <Text
            key={index}
            style={{ paddingHorizontal: 16, paddingVertical: 12 }}
          >
            {row.desc}
          </Text>
        ))}
      </View>
    );
  };

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
            padding: 20,
            textAlign: "center",
          }}
        >
          {available_point} {i18n.t("pointavailable")}
        </Text>

        {isRefreshing ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            onRefresh={loadPointHistoryData}
            refreshing={isRefreshing}
            style={styles.container}
            data={pointHistoryData}
            renderItem={renderItem}
            keyExtractor={(item) => item.month.toString()}
          />
        )}
      </View>
    </>
  );
};

export default PointHistoryScreen;