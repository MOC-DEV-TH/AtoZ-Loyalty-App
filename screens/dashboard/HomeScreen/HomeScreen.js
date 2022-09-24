import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as homeActions from "../../../store/actions/home";
import React, { useState, useCallback, useEffect } from "react";
import { storeData } from "../../../AsyncStorage/AsyncStorage";
import { getStoreData } from "../../../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import { ImageSlider } from "react-native-image-slider-banner";
import { Ionicons } from "@expo/vector-icons";
import i18n from "../../../I18n/i18n";
import styles from "./styles";
import { HStack, VStack, Pressable, Menu, Box } from "native-base";
import Colors from "../../../constants/Colors";
import Slideshow from "react-native-image-slider-show";
import Slider from "../../../model/slider";
import Global from "../../../constants/Global";

export default HomeScreen = (props) => {
  const sliderList = [];
  const renderItem = ({ item }) => {
    return (
      <View style={{ width: "48%" }}>
        <VStack style={{ flex: 1 }}>
          <Image
            resizeMode="stretch"
            style={{ height: 120 }}
            source={{ uri: Global.baseImageUrl + item.image_en }}
            alt="ads image"
          />
          <HStack
            style={{
              justifyContent: "space-between",
              height: 30,
              backgroundColor: Colors.yellow,
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <Text style={{ color: Colors.white }}>{item.name}</Text>
            <Text style={{ color: Colors.white }}>6000 ks</Text>
          </HStack>
        </VStack>
      </View>
    );
  };
  useEffect(() => {
    loadPromotionData();
  });

  // useEffect(() => {
  //   getStoreData().then((value) => {
  //     if (value == AsyncStorageKey.LANGUAGE_MM) {
  //       setLanguageValue("my");
  //     } else if (value == AsyncStorageKey.LANGUAGE_ENG) {
  //       setLanguageValue("en");
  //     } else {
  //       setLanguageValue("chn");
  //     }
  //   });
  // });

  const dispatch = useDispatch();
  const loadPromotionData = useCallback(async () => {
    try {
      await dispatch(homeActions.getHomePromotions());
    } catch (error) {
      setError(error.message);
    }
  });
  const promotionData = useSelector(
    (state) => state.homeScreen.home_promotions,
    shallowEqual
  );
  promotionData.map((data) => {});
  const promotionSlider = promotionData.filter(
    (item) => item.ads_type == "Slider"
  );

  const ads_data = promotionData.filter(
    (item) => item.ads_type == "Display Ads"
  );

  for (const item of promotionSlider) {
    sliderList.push(new Slider(Global.baseImageUrl + item.image_en));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Slideshow dataSource={sliderList} />
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
      <FlatList
        data={ads_data}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 20,
        }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
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
          <Menu.Item
            onPress={() =>
              props.navigation.navigate("MyAccount", { screenName: "Home" })
            }
          >
            My Account
          </Menu.Item>
          <Menu.Item onPress={() => props.navigation.navigate("AboutUs")}>
            About us
          </Menu.Item>
          <Menu.Item
            onPress={() => props.navigation.navigate("TermAndCondition")}
          >
            TermsAndConditions
          </Menu.Item>
          <Menu.Item onPress={() => props.navigation.navigate("Faq")}>
            FAQ
          </Menu.Item>
        </Menu>
      </Box>
    ),
  };
};
