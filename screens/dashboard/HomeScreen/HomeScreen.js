import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import { useDispatch } from "react-redux";
import * as homeActions from "../../../store/actions/home";
import React, { useState, useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import { storeData } from "../../../AsyncStorage/AsyncStorage";
import { getStoreData } from "../../../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import { ImageSlider } from "react-native-image-slider-banner";
import { Ionicons } from "@expo/vector-icons";
import i18n from "../../../I18n/i18n";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import { Menu, Pressable, Box } from "native-base";

export default HomeScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getStoreData().then((value) => {
      if (value == AsyncStorageKey.LANGUAGE_MM) {
        setLanguageValue("my");
      } else if (value == AsyncStorageKey.LANGUAGE_ENG) {
        setLanguageValue("en");
      } else {
        setLanguageValue("chn");
      }
    });
  }, []);

  useEffect(()=>{
    dispatch(homeActions.getPromotions())
  })

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ImageSlider
          data={[
            {
              img:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
            },
            {
              img:
                "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
            },
            {
              img:
                "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
            },
          ]}
          caroselImageStyle={{ height: 180 }}
          autoPlay={true}
          onItemChanged={(item) => console.log()}
          closeIconColor="#fff"
        />
      </View>

      <Text
        style={{
          marginTop: 15,
          alignSelf: "center",
          color: Colors.primary,
          fontWeight: "bold",
        }}
      >
        Points Collected XXXX Points
      </Text>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <TouchableOpacity
          style={styles.image}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/image_one.png")}
          ></Image>
        </TouchableOpacity>
        <View style={{ width: 10 }} />
        <TouchableOpacity style={styles.image}>
          <Image
            style={styles.image}
            source={require("../../../assets/image_two.png")}
          ></Image>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <TouchableOpacity style={styles.image}>
          <Image
            style={styles.image}
            source={require("../../../assets/image_three.png")}
          ></Image>
        </TouchableOpacity>
        <View style={{ width: 10 }} />
        <TouchableOpacity style={styles.image}>
          <Image
            style={styles.image}
            source={require("../../../assets/image_four.png")}
          ></Image>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
HomeScreen.navigationOptions = (props) => {
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
          <Menu.Item onPress={() => props.navigation.navigate("MyAccount",{screenName:"Home"})}>
            My Account
          </Menu.Item>
          <Menu.Item onPress={() => props.navigation.navigate("AboutUs")}>About us</Menu.Item>
          <Menu.Item onPress={() => props.navigation.navigate("TermAndCondition")}>TermsAndConditions</Menu.Item>
          <Menu.Item onPress={() => props.navigation.navigate("Faq")}>FAQ</Menu.Item>
        </Menu>
      </Box>
    ),
  };
};
