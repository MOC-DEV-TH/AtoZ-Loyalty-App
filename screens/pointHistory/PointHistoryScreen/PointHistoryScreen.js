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
} from "react-native";
import i18n from "../../../I18n/i18n";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect, useCallback } from "react";
import * as pointHistoryActions from "../../../store/actions/point_history";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import { Menu, Pressable, Box } from "native-base";

export default function PointHistoryScreen() {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadPointHistoryData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      dispatch(pointHistoryActions.getPointHistory());
    } catch (error) {}
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing]);

  useEffect(() => {
    loadPointHistoryData();
  }, [loadPointHistoryData]);

  const extractKey = ({ rows }) => rows;
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

  return (
    <SafeAreaView style={styles.container}>
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
        1000 Points Available
      </Text>
      <FlatList
        onRefresh={loadPointHistoryData}
        refreshing={isRefreshing}
        style={styles.container}
        data={pointHistoryData}
        renderItem={renderItem}
        keyExtractor={extractKey}
      />
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
                  style={{ color: Colors.white }}
                  name="menu"
                ></Ionicons>
              </Pressable>
            );
          }}
        >
          <Menu.Item
            onPress={() =>
              props.navigation.navigate("MyAccount", { name: "PointHistory" })
            }
          >
            My Account
          </Menu.Item>
          <Menu.Item>About us</Menu.Item>
        </Menu>
      </Box>
    ),
  };
};
