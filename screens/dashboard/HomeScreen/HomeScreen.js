import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
  ActivityIndicator,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as homeActions from "../../../store/actions/home";
import React, { useState, useCallback, useEffect } from "react";
import * as notificationActions from "../../../store/actions/notification";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import {
  HStack,
  VStack,
  Pressable,
  Menu,
  Box,
  ScrollView,
  Badge,
  Center,
} from "native-base";
import Colors from "../../../constants/Colors";
import { translate } from "react-native-translate";
import SessionExpireAlert from "../../../components/SessionExpireAlert";
import Text from "../../../components/Typography";
import Carousel from "react-native-banner-carousel";
import getEnvVars from "../../../environment";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import { getStoreData, storeData } from "../../../AsyncStorage/AsyncStorage";

export default HomeScreen = (props) => {
  const { imageApiUrl } = getEnvVars();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("");
  let [alert, setShowAlert] = useState(false);
  let [notiCount, setNotiCount] = useState("0");
  const BannerWidth = Dimensions.get("window").width;
  const BannerHeight = 240;
  const sliderList = [];

  const checkLanguage = useCallback(async () => {
    getStoreData(AsyncStorageKey.LANGUAGE).then((value) => {
      if (value == AsyncStorageKey.LANGUAGE_MM) {
        setLanguage(value);
      } else if (value == AsyncStorageKey.LANGUAGE_ENG) {
        setLanguage(value);
      } else {
        setLanguage("en");
      }
    });
  }, []);

  const getNotificationCount = useCallback(async () => {
    getStoreData(AsyncStorageKey.NOTI_COUNT).then((notificationValue) => {
      console.log("New Notification Length", notificationValue);
      getStoreData(AsyncStorageKey.LAST_NOTI_COUNT).then(
        (lastNotificationValue) => {
          if (lastNotificationValue != null) {
            console.log("Last Notification Length", lastNotificationValue);
            if (parseInt(notificationValue) >= parseInt(lastNotificationValue)) {
              setNotiCount(
                parseInt(notificationValue) - parseInt(lastNotificationValue)
              );
              storeData(
                AsyncStorageKey.NOTI_COUNT,
                (
                  parseInt(notificationValue) - parseInt(lastNotificationValue)
                ).toString()
              );
              console.log(
                "Notification Length",
                (
                  parseInt(notificationValue) - parseInt(lastNotificationValue)
                ).toString()
              );
            } else {
              console.log("Default Notification Length", notificationValue);
              setNotiCount(notificationValue);
              storeData(
                AsyncStorageKey.NOTI_COUNT,
                notificationValue.toString()
              );
            }
          } else {
            console.log("New Notification Length", notificationValue);
            setNotiCount(notificationValue);
          }
        }
      );
    });
  }, []);

  useEffect(() => {
    checkLanguage();
  });

  const notificationCount = useSelector(
    (state) => state.notification.notificationCount
  );

  useEffect(() => {
    if (notificationCount == 0) {
      getNotificationCount();
      console.log("Notification Count", notificationCount);
    } else if (notificationCount == null) {
      setNotiCount(0);
      storeData(AsyncStorageKey.NOTI_COUNT, "0");
    } else {
      console.log("Dispatch Notification Count", notificationCount);
      setNotiCount(notificationCount);
      storeData(AsyncStorageKey.NOTI_COUNT, notificationCount);
    }
  }, [notificationCount]);

  useEffect(() => {
    console.log("Reload");
    loadPromotionData();
  }, [loadPromotionData, checkLanguage]);

  useEffect(() => {
    console.log("Will Focus");
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadPromotionData
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadPromotionData]);

  const loadPromotionData = useCallback(async () => {
    setIsLoading(true);
    try {
     await dispatch(homeActions.getHomePromotions());
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [setIsLoading, dispatch]);

  const promotionData = useSelector(
    (state) => state.homeScreen.home_promotions,
    shallowEqual
  );
  const availablePoints = useSelector(
    (state) => state.homeScreen.available_point,
    shallowEqual
  );

  const onConfirm = () => {
    dispatch(homeActions.setEmptyResponseCode());
    props.navigation.navigate("AccountDashboard");
    setShowAlert(false);
  };

  const responseCode = useSelector(
    (state) => state.homeScreen.response_code,
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

  const onPressAvailablePoint = () => {
    props.navigation.push("PointHistory");
  };

  const promotionSlider = promotionData.filter(
    (item) => item.ads_type == "Slider"
  );

  const ads_data = promotionData.filter(
    (item) => item.ads_type == "Display Ads"
  );

  if (language == "my") {
    for (const item of promotionSlider) {
      sliderList.push({ img: imageApiUrl + item.image_mm });
    }
  } else {
    for (const item of promotionSlider) {
      sliderList.push({ img: imageApiUrl + item.image_en });
    }
  }

  const renderPage = (image, index) => {
    return (
      <Animated.Image
        key={index}
        style={{ width: BannerWidth, height: BannerHeight }}
        source={{ uri: image.img }}
      />
    );
  };
  const renderItem = ({ item }) => {
    return (
      <View style={{ width: "48%", marginTop: 15 }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Promotion", {
              screen: "PromotionNavigator",
            });
          }}
        >
          <VStack style={{ flex: 1 }}>
            <Image
              resizeMode="stretch"
              style={{ height: 120 }}
              source={{ uri: imageApiUrl + item.image_en }}
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
              <Text style={{ color: Colors.primary }}>{item.name}</Text>
              <Text style={{ color: Colors.white, fontWeight: "bold" }}></Text>
            </HStack>
          </VStack>
        </TouchableOpacity>
      </View>
    );
  };
  const renderItemMM = ({ item }) => {
    console.log("MyanmarImage");
    return (
      <View style={{ width: "48%", marginTop: 15 }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Promotion", {
              screen: "PromotionNavigator",
            });
          }}
        >
          <VStack style={{ flex: 1 }}>
            <Image
              resizeMode="stretch"
              style={{ height: 120 }}
              source={{ uri: imageApiUrl + item.image_mm }}
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
              <Text style={{ color: Colors.primary }}>{item.namemm}</Text>
              <Text style={{ color: Colors.white, fontWeight: "bold" }}></Text>
            </HStack>
          </VStack>
        </TouchableOpacity>
      </View>
    );
  };

  {
    /* {sliderList.length > 0
       ? <ImageSlider
          data={sliderList}
          autoPlay={true}
          onItemChanged={(item) => console.log("item", item)}
          closeIconColor="#fff"
          preview={false}
          timer={4000}
          activeIndicatorStyle={{width:10,height:10,backgroundColor:Colors.yellow}}
          indicatorContainerStyle={{marginBottom:-20}}
          caroselImageStyle={{ resizeMode: 'cover', height: 240 }}
        />
        : undefined
      } */
  }

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor:
            Platform.OS === "android" ? Colors.primary : Colors.primary,
          height: Platform.OS === "android" ? 80 : 120,
        }}
      >
        <View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Home", {
                screen: "DashboardNavigator",
              });
            }}
          >
            <Image
              style={styles.headerIcon}
              source={require("../../../assets/logo.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => {
              storeData(AsyncStorageKey.NOTI_COUNT, "0").then(() => {
                props.navigation.navigate("Notification");
              });
            }}
          >
            <Image
              style={{ height: 20, width: 20, marginRight: 18 }}
              source={require("../../../assets/notification_icon.png")}
            />
            <View
              style={{
                height: 18,
                width: 18,
                borderRadius: 1000,
                position: "absolute",
                top: -7,
                right: 12,
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  alignSelf: "center",
                  fontSize: 8,
                  alignItems: "center",
                  textAlign: "center",
                  position: "absolute",
                  top: -2,
                }}
              >
                {notiCount}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {isLoading ? <ActivityIndicator style={{flex:1}} size={"large"} /> :  <ScrollView>
        <View>
          {sliderList.length > 0 ? (
            <Carousel
              autoplay={true}
              autoplayTimeout={4000}
              loop={true}
              index={0}
              pageSize={BannerWidth}
              pageIndicatorStyle={{
                backgroundColor: Colors.white,
                height: 8,
                width: 8,
              }}
              activePageIndicatorStyle={{ backgroundColor: Colors.yellow }}
              pageIndicatorContainerStyle={{ marginBottom: 10 }}
              pageIndicatorOffset={18}
            >
              {sliderList.map((image, index) => renderPage(image, index))}
            </Carousel>
          ) : undefined}
        </View>
        <SessionExpireAlert showAlert={alert} onConfirmPressed={onConfirm} />
        <View
          style={{
            backgroundColor: Colors.primary,
            fontWeight: "bold",
            padding: 10,
            paddingBottom: 20,
          }}
        >
          <VStack>
            <HStack justifyContent={"space-between"} alignItems="center" mb={2}>
              <Text
                style={{
                  color: Colors.white,
                  fontWeight: "bold",
                  fontSize: 18,
                  padding: 10,
                }}
              >
                {translate("availablePoint")}
              </Text>
              <TouchableOpacity onPress={() => onPressAvailablePoint()}>
                <Image
                  style={{ height: 20, width: 20 }}
                  resizeMode="contain"
                  source={require("../../../assets/right_arrow_circle.png")}
                />
              </TouchableOpacity>
            </HStack>
            <Box
              alignSelf="center"
              alignItems="center"
              bg="primary.500"
              p={3}
              borderColor="white"
              borderWidth="3"
              borderRadius={12}
              width="100%"
              _text={{
                fontSize: "lg",
                fontWeight: "bold",
                color: "warmGray.50",
                letterSpacing: "lg",
                fontSize: 22,
              }}
            >
              {availablePoints + " " + translate("point")}
            </Box>
          </VStack>
        </View>
        {language == "my" ? (
          <FlatList
            data={ads_data}
            numColumns={2}
            renderItem={renderItemMM}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 15,
            }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        ) : (
          <FlatList
            data={ads_data}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 15,
            }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        )}
      </ScrollView> }
    
    </View>
  );
};
HomeScreen.navigationOptions = (props) => {
  return {
    headerTitle: "",
    headerStyle: {
      height: 0,
    },

    // <Box w="90%" alignItems="center">
    //   <Menu
    //     w="140"
    //     trigger={(triggerProps) => {
    //       return (
    //         <Pressable
    //           accessibilityLabel="More options menu"
    //           {...triggerProps}
    //         >
    //           <Ionicons
    //             size={38}
    //             style={{ color: Colors.white, marginRight: 15 }}
    //             name="menu"
    //           ></Ionicons>
    //         </Pressable>
    //       );
    //     }}
    //   >
    //     <Menu.Item
    //       onPress={() =>
    //         props.navigation.navigate("MyAccount", { screenName: "Home" })
    //       }
    //     >
    //       {translate("myaccount")}
    //     </Menu.Item>
    //     <Menu.Item onPress={() => props.navigation.navigate("AboutUs")}>
    //       {translate("aboutus")}
    //     </Menu.Item>
    //     <Menu.Item
    //       onPress={() => props.navigation.navigate("TermAndCondition")}
    //     >
    //       {translate("termandcondition")}
    //     </Menu.Item>
    //     <Menu.Item onPress={() => props.navigation.navigate("Faq")}>
    //       {translate("faq")}
    //     </Menu.Item>
    //   </Menu>
    // </Box>
  };
};
