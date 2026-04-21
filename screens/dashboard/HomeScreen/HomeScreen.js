import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as homeActions from "../../../store/actions/home";
import React, { useState, useCallback, useEffect } from "react";
import styles from "./styles";
import { HStack, VStack, Box, ScrollView } from "native-base";
import Colors from "../../../constants/Colors";
import i18n from "../../../I18n/i18n"; // ✅ NEW
import SessionExpireAlert from "../../../components/SessionExpireAlert";
import Text from "../../../components/Typography";
import Carousel from "react-native-banner-carousel";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import { getStoreData, storeData } from "../../../AsyncStorage/AsyncStorage";
import Global from "../../../constants/Global";

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("");
  let [alert, setShowAlert] = useState(false);
  let [notiCount, setNotiCount] = useState("0");

  const BannerWidth = Dimensions.get("window").width;
  const BannerHeight = 240;
  const sliderList = [];

  const checkLanguage = useCallback(async () => {
    const value = await getStoreData(AsyncStorageKey.LANGUAGE);

    if (value === AsyncStorageKey.LANGUAGE_MM) {
      setLanguage("my");
      i18n.locale = "my";
    } else {
      setLanguage("en");
      i18n.locale = "en";
    }
  }, []);

  const getNotificationCount = useCallback(async () => {
    const notificationValue = await getStoreData(AsyncStorageKey.NOTI_COUNT);
    const lastNotificationValue = await getStoreData(
      AsyncStorageKey.LAST_NOTI_COUNT
    );

    if (lastNotificationValue != null) {
      if (parseInt(notificationValue) >= parseInt(lastNotificationValue)) {
        const count =
          parseInt(notificationValue) - parseInt(lastNotificationValue);
        setNotiCount(count);
        storeData(AsyncStorageKey.NOTI_COUNT, count.toString());
      } else {
        setNotiCount(notificationValue);
        storeData(AsyncStorageKey.NOTI_COUNT, notificationValue.toString());
      }
    } else {
      setNotiCount(notificationValue);
    }
  }, []);

  useEffect(() => {
    checkLanguage();
  }, [checkLanguage]);

  const notificationCount = useSelector(
    (state) => state.notification.notificationCount
  );

  useEffect(() => {
    if (notificationCount == 0) {
      getNotificationCount();
    } else if (notificationCount == null) {
      setNotiCount(0);
      storeData(AsyncStorageKey.NOTI_COUNT, "0");
    } else {
      setNotiCount(notificationCount);
      storeData(AsyncStorageKey.NOTI_COUNT, notificationCount);
    }
  }, [notificationCount]);

  const loadPromotionData = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(homeActions.getHomePromotions());
    } catch (error) {}
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadPromotionData();
  }, [loadPromotionData]);

  const promotionData = useSelector(
    (state) => state.homeScreen.home_promotions,
    shallowEqual
  );

  const availablePoints = useSelector(
    (state) => state.homeScreen.available_point,
    shallowEqual
  );

  const responseCode = useSelector(
    (state) => state.homeScreen.response_code,
    shallowEqual
  );

  useEffect(() => {
    if (responseCode === "005") {
      setShowAlert(true);
    }
  }, [responseCode]);

  const onConfirm = () => {
    dispatch(homeActions.setEmptyResponseCode());
    props.navigation.navigate("AccountDashboard");
    setShowAlert(false);
  };

  const onPressAvailablePoint = () => {
    props.navigation.push("PointHistory");
  };

  const promotionSlider = promotionData.filter(
    (item) => item.ads_type === "Slider"
  );

  const ads_data = promotionData.filter(
    (item) => item.ads_type === "Display Ads"
  );

  if (language === "my") {
    promotionSlider.forEach((item) =>
      sliderList.push({ img: Global.baseImageUrl + item.image_mm })
    );
  } else {
    promotionSlider.forEach((item) =>
      sliderList.push({ img: Global.baseImageUrl + item.image_en })
    );
  }

  const renderPage = (image, index) => (
    <Animated.Image
      key={index}
      style={{ width: BannerWidth, height: BannerHeight }}
      source={{ uri: image.img }}
    />
  );

  const renderItem = ({ item }) => (
    <View style={{ width: "48%", marginTop: 15 }}>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("Promotion", {
            screen: "PromotionNavigator",
          })
        }
      >
        <VStack>
          <Image
            resizeMode="stretch"
            style={{ height: 120 }}
            source={{
              uri:
                Global.baseImageUrl +
                (language === "my" ? item.image_mm : item.image_en),
            }}
          />
          <HStack style={styles.adsFooter}>
            <Text style={styles.adsText}>
              {language === "my" ? item.namemm : item.name}
            </Text>
          </HStack>
        </VStack>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity>
          <Image
            style={styles.headerIcon}
            source={require("../../../assets/logo.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            storeData(AsyncStorageKey.NOTI_COUNT, "0");
            props.navigation.navigate("Notification");
          }}
        >
          <Image
            style={styles.notificationIcon}
            source={require("../../../assets/notification_icon.png")}
          />

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notiCount}</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      {isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} />
      ) : (
        <ScrollView>
          {sliderList.length > 0 && (
            <Carousel autoplay autoplayTimeout={4000} pageSize={BannerWidth}>
              {sliderList.map(renderPage)}
            </Carousel>
          )}

          <SessionExpireAlert
            showAlert={alert}
            onConfirmPressed={onConfirm}
          />

          <View style={styles.pointContainer}>
            <HStack justifyContent="space-between">
              <Text style={styles.pointTitle}>
                {i18n.t("availablePoint")}
              </Text>

              <TouchableOpacity onPress={onPressAvailablePoint}>
                <Image
                  style={styles.arrowIcon}
                  source={require("../../../assets/right_arrow_circle.png")}
                />
              </TouchableOpacity>
            </HStack>

            <Box style={styles.pointBox}>
              {availablePoints + " " + i18n.t("point")}
            </Box>
          </View>

          <FlatList
            data={ads_data}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;