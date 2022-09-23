import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  SectionList,
} from "react-native";
import i18n from "../../../I18n/i18n";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import * as pointHistoryActions from "../../../store/actions/point_history";
import { useDispatch } from "react-redux";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import { Menu, Pressable, Box } from "native-base";

export default function PointHistoryScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pointHistoryActions.getPointHistory());
  }, []);

  const DATA_POINT = [
    {
      title: "Sep",
      data: [
        {
          desc: "-500 points Redeemed at 1st Outlet - 22-Sep-22",
          created_date: "2022-09-22 14:12:02",
        },
        {
          desc: "1000 points Collected at 1st Outlet - 22-Sep-22",
          created_date: "2022-09-22 14:11:27",
        },
        {
          desc: "-500 points Redeemed at 1st Outlet - 22-Sep-22",
          created_date: "2022-09-22 14:01:24",
        },
        {
          desc: "1000 points Collected at 1st Outlet - 22-Sep-22",
          created_date: "2022-09-22 13:57:46",
        },
      ],
    },
    {
      title: "Oct",
      data: [
        {
          desc: "-500 points Redeemed at 1st Outlet - 22-Sep-22",
          created_date: "2022-09-22 14:12:02",
        },
        {
          desc: "1000 points Collected at 1st Outlet - 22-Sep-22",
          created_date: "2022-09-22 14:11:27",
        },
        {
          desc: "-500 points Redeemed at 1st Outlet - 22-Sep-22",
          created_date: "2022-09-22 14:01:24",
        },
        {
          desc: "1000 points Collected at 1st Outlet - 22-Sep-22",
          created_date: "2022-09-22 13:57:46",
        },
      ],
    },
  ];
  const DATA = [
    {
      title: "Main dishes",
      data: ["Pizza", "Burger", "Risotto"],
    },
    {
      title: "Sides",
      data: ["French Fries", "Onion Rings", "Fried Shrimps"],
    },
    {
      title: "Drinks",
      data: ["Water", "Coke", "Beer"],
    },
    {
      title: "Desserts",
      data: ["Cheese Cake", "Ice Cream"],
    },
  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          marginTop: 12,
          marginBottom:12,
          color: Colors.primary,
          fontSize: 24,
          fontWeight: "bold",
          alignSelf:"center"
        }}
      >
        1000 Points Available
      </Text>
      <SectionList
        renderItem={({ item, index, section }) => (
          <Text style={{padding:10}} key={index}>{item.desc}</Text>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionTitleContainer}><Text style={styles.title}>{title}</Text></View>
        )}
        sections={DATA_POINT}
        keyExtractor={(item, index) => item + index}
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
          <Menu.Item onPress={() => props.navigation.navigate("MyAccount",{name:"PointHistory"})}>
            My Account
          </Menu.Item>
          <Menu.Item>About us</Menu.Item>
        </Menu>
      </Box>
    ),
  };
};
