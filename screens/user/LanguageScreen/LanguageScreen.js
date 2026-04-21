import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import ContainerFluid from "../../../components/ContainerFluid";
import { VStack, HStack } from "native-base";
import { useState, useEffect } from "react";
import { getStoreData, storeData } from "../../../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import Button from "../../../components/Button";
import i18n from "../../../I18n/i18n";

const LanguageScreen = (props) => {
  const [touchEng, setTouchEng] = useState(false);
  const [touchMy, setTouchMy] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const handleBackButtonClick = () => {
    props.navigation.navigate("Setting");
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

  useEffect(() => {
    const loadLanguage = async () => {
      const value = await getStoreData(AsyncStorageKey.LANGUAGE);

      if (value === AsyncStorageKey.LANGUAGE_MM) {
        setTouchMy(true);
        i18n.locale = "my";
      } else {
        setTouchEng(true);
        i18n.locale = "en";
      }
    };

    loadLanguage();
  }, []);

  const getTextStyle = (touched) => ({
    width: "100%",
    height: 48,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    ...(touched
      ? { backgroundColor: Colors.primary }
      : {
          borderWidth: 2,
          borderColor: Colors.primary,
        }),
  });

  const getTextColor = (touched) => ({
    color: touched ? Colors.white : Colors.primary,
    fontWeight: "bold",
    padding: 10,
  });

  const onPressSave = async () => {
    setShowLoading(true);

    const lang = touchEng ? "en" : "my";

    setTimeout(async () => {
      i18n.locale = lang;
      await storeData(AsyncStorageKey.LANGUAGE, lang);

      setShowLoading(false);
      props.navigation.navigate("Home");
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ContainerFluid mt={8} px={18} style={{ flex: 1 }}>
        <VStack space={4}>
          <TouchableOpacity
            onPress={() => {
              setTouchEng(true);
              setTouchMy(false);
            }}
          >
            <View style={getTextStyle(touchEng)}>
              <Text style={getTextColor(touchEng)}>English</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setTouchMy(true);
              setTouchEng(false);
            }}
          >
            <View style={getTextStyle(touchMy)}>
              <Text style={getTextColor(touchMy)}>မြန်မာ</Text>
            </View>
          </TouchableOpacity>

          <HStack justifyContent={"flex-end"} mt={5}>
            <Button onPress={onPressSave} role="button" justifyContent="center">
              {i18n.t("save")}
            </Button>
          </HStack>
        </VStack>

        {showLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size={"large"} color={Colors.primary} />
          </View>
        ) : null}
      </ContainerFluid>
    </SafeAreaView>
  );
};

export default LanguageScreen;