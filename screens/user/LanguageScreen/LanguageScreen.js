import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import ContainerFluid from "../../../components/ContainerFluid";
import { VStack, HStack } from "native-base";
import { setLocalization, translate } from "react-native-translate";
import { useState, useEffect, useCallback } from "react";
import { getStoreData } from "../../../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import { storeData } from "../../../AsyncStorage/AsyncStorage";
import my from "../../../locales/my";
import en from "../../../locales/en";
import Button from "../../../components/Button";
import { BackHandler } from 'react-native';

export default LanguageScreen = (props) => {
  const [touchEng, setTouchEng] = useState(false);
  const [touchMy, setTouchMy] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  function handleBackButtonClick() {
    props.navigation.navigate("Setting")
    return true;
  }
  
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  useEffect(() => {
    getStoreData(AsyncStorageKey.LANGUAGE).then((value) => {
      if (value == AsyncStorageKey.LANGUAGE_MM) {
        setTouchMy(true);
      } else if (value == AsyncStorageKey.LANGUAGE_ENG) {
        setTouchEng(true);
      } else {
        setTouchEng(true);
      }
    });
  }, []);

  const getTextStyle = (touched) => {
    if (touched) {
      return {
        width: "100%",
        height: 48,
        backgroundColor: Colors.primary,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
      };
    } else {
      return {
        width: "100%",
        height: 48,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
      };
    }
  };
  const getTextColor = (touched) => {
    if (touched) {
      return {
        color: Colors.white,
        fontWeight: "bold",
        padding:10
      };
    } else {
      return {
        color: Colors.primary,
        fontWeight: "bold",
        padding:10
      };
    }
  };
  const onPressSave = () => {
    setShowLoading(true);
    if (touchEng) {
      setTimeout(() => {
        setShowLoading(false);
        setLocalization(en);
        storeData(AsyncStorageKey.LANGUAGE, "en").then(() => {
          props.navigation.navigate("Home");
        });
      }, 2000);
    } else  {
      setTimeout(() => {
        setShowLoading(false);
        setLocalization(my);
        storeData(AsyncStorageKey.LANGUAGE, "my").then(() => {
          props.navigation.navigate("Home");
        });
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ContainerFluid mt={8} px={18} style={{flex:1}}>
        <VStack space={4}>
          <TouchableOpacity
            onPress={() => {
              setTouchEng(true), setTouchMy(false);
            }}
          >
            <View style={getTextStyle(touchEng)}>
              <Text style={getTextColor(touchEng)}>English</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setTouchMy(true), setTouchEng(false);
            }}
          >
            <View style={getTextStyle(touchMy)}>
              <Text style={getTextColor(touchMy)}>မြန်မာ</Text>
            </View>
          </TouchableOpacity>

          <HStack justifyContent={"flex-end"} mt={5}>

            <Button onPress={() => onPressSave()} role="button" justifyContent="center">{translate("save")}</Button>

          </HStack>
        </VStack>
        {showLoading ? <View style={styles.loading}><ActivityIndicator size={"large"} color={Colors.primary}/></View>  : undefined}
      </ContainerFluid>
    </SafeAreaView>
  );
};

LanguageScreen.navigationOptions = (props) => {
  return {
    headerTintColor: "black",
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: Colors.primary,
      height: 100,
    },
    headerTitle: () => (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 22, color: Colors.white,padding:10 }}>{translate("language")}</Text>
      </View>
    ),
    headerLeft: () => (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.navigate("Setting")}>
          <Image
            style={styles.headerIcon}
            source={require("../../../assets/left_arrow_circle.png")}
          />
        </TouchableOpacity>
      </View>
    ),
  };
};