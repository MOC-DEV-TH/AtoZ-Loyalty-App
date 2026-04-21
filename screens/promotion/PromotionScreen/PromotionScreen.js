import React, { useEffect, useCallback, useState, memo } from "react";
import {
  Image,
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import i18n from "../../../I18n/i18n";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import { HStack, VStack, Heading } from "native-base";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as promotionActions from "../../../store/actions/promotions";
import Global from "../../../constants/Global";
import { getStoreData } from "../../../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import SessionExpireAlert from "../../../components/SessionExpireAlert";
import Text from "../../../components/Typography";

const ReadMoreText = memo(({ text, numberOfLines = 4, textStyle, linkStyle }) => {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  const handleTextLayout = useCallback(
    (e) => {
      if (e?.nativeEvent?.lines?.length > numberOfLines) {
        setShowToggle(true);
      }
    },
    [numberOfLines]
  );

  if (!text) {
    return null;
  }

  return (
    <View>
      <Text
        style={textStyle}
        numberOfLines={expanded ? undefined : numberOfLines}
        onTextLayout={handleTextLayout}
      >
        {text}
      </Text>

      {showToggle ? (
        <Pressable onPress={() => setExpanded((prev) => !prev)}>
          <Text style={[{ fontWeight: "800", marginTop: 4 }, linkStyle]}>
            {expanded ? (i18n.t("seeless") || "See less") : (i18n.t("seemore") || "See more")}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
});

const PromotionScreen = (props) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [language, setLanguage] = useState("en");
  const [alert, setShowAlert] = useState(false);

  const responseCode = useSelector(
    (state) => state.promotion.response_code,
    shallowEqual
  );

  const promotionData = useSelector(
    (state) => state.promotion.promotions,
    shallowEqual
  );

  const loadPromotionData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(promotionActions.getPromotions());
    } catch (error) {
      console.log("loadPromotionData error:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [dispatch]);

  const checkLanguage = useCallback(async () => {
    try {
      const value = await getStoreData(AsyncStorageKey.LANGUAGE);

      if (value === AsyncStorageKey.LANGUAGE_MM) {
        setLanguage("my");
        i18n.locale = "my";
      } else {
        setLanguage("en");
        i18n.locale = "en";
      }
    } catch (error) {
      console.log("checkLanguage error:", error);
      setLanguage("en");
      i18n.locale = "en";
    }
  }, []);

  useEffect(() => {
    checkLanguage();
    loadPromotionData();
  }, [checkLanguage, loadPromotionData]);

  useEffect(() => {
    if (responseCode === "005") {
      setShowAlert(true);
    }
  }, [responseCode]);

  const onConfirm = useCallback(() => {
    dispatch(promotionActions.setEmptyResponseCode());
    setShowAlert(false);
    props.navigation.navigate("AccountDashboard");
  }, [dispatch, props.navigation]);

  const renderItem = useCallback(
    ({ item }) => {
      const isMM = language === "my";
      const imagePath = isMM ? item.image_mm : item.image_en;
      const title = isMM ? item.namemm : item.name;
      const description = isMM ? item.descriptionmm : item.description;

      return (
        <HStack style={styles.flatList}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{
              uri: Global.baseImageUrl + imagePath,
            }}
          />

          <VStack style={styles.vContainer}>
            <Heading lineHeight={25} color={Colors.primary} fontSize={18}>
              {title}
            </Heading>

            <ReadMoreText
              text={description}
              numberOfLines={4}
              textStyle={styles.description}
              linkStyle={{ fontWeight: "800" }}
            />
          </VStack>
        </HStack>
      );
    },
    [language]
  );

  const renderEmpty = useCallback(() => {
    return (
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        {i18n.t("noitem") || "No items"}
      </Text>
    );
  }, []);

  return (
    <View style={{ flex: 1, paddingLeft: 12 }}>
      <View style={styles.button}>
        <Text style={styles.text}>{i18n.t("hotdeal")}</Text>
      </View>

      <SessionExpireAlert showAlert={alert} onConfirmPressed={onConfirm} />

      {isRefreshing ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={Array.isArray(promotionData) ? promotionData : []}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item?.id ? item.id.toString() : index.toString()
          }
          onRefresh={loadPromotionData}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmpty}
        />
      )}
    </View>
  );
};

export default PromotionScreen;