import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import { storeData } from "../../../AsyncStorage/AsyncStorage";
import { getStoreData } from "../../../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import { ImageSlider } from "react-native-image-slider-banner";
import i18n from "../../../I18n/i18n";
import styles from "./styles";

export default HomeScreen = (props) => {
  const { handleSubmit, control } = useForm();
  const [langOpen, setLanguageOpen] = useState(false);
  const [langValue, setLanguageValue] = useState("en");
  const [language, setLanguage] = useState([
    { label: "Eng", value: "en" },
    { label: "Myanmar", value: "my" },
    { label: "Chinese", value: "chn" },
  ]);

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
  const onLanguageOpen = useCallback(() => {}, []);
  const onLanguageClose = useCallback(() => {
    i18n.locale = langValue;
  }, []);

  return (
    <View style={styles.container}>
      <Controller
        name=""
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.dropDownContainer}>
            <DropDownPicker
              textStyle={{ fontSize: 10 }}
              defaultValue={langValue}
              open={langOpen}
              value={langValue} //genderValue
              items={language}
              setOpen={setLanguageOpen}
              setValue={setLanguageValue}
              setItems={setLanguage}
              onOpen={onLanguageOpen}
              onChangeValue={(value) => {
                storeData(value);
                i18n.locale = value;
              }}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
        )}
      />
      <StatusBar style="auto" />
      <View  style={{ position: "absolute", top: 70 }}>
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
          onItemChanged={(item) => console.log("item", item)}
          closeIconColor="#fff"
        />
      </View>

      <Text style={{ alignSelf: "center" }}>{i18n.t("welcome")}</Text>
      <Text style={{ alignSelf: "center" }}>Current locale: {i18n.locale}</Text>
    </View>
  );
};
HomeScreen.navigationOptions = (props) => {
  return {
    headerTitle: "",
    headerTintColor: "black",
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "white",
      height: 0,
    },

    headerLeft: () => (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></View>
    ),
  };
};
