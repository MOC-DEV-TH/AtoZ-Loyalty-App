import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import { storeData } from "../../../AsyncStorage/AsyncStorage";
import { getStoreData } from "../../../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import styles from "./styles";

export default HomeScreen = (props) => {
  const { handleSubmit, control } = useForm();

  const [langOpen, setLanguageOpen] = useState(false);
  const [langValue, setLanguageValue] = useState("eng");
  const [language, setLanguage] = useState([
    { label: "Eng", value: "eng" },
    { label: "Myanmar", value: "mm" },
    { label: "Chinese", value: "chn" },
  ]);

  useEffect(() => {
    getStoreData().then((value) => {
      if (value == AsyncStorageKey.LANGUAGE_MM) {
        setLanguageValue("mm");
      } else if (value == AsyncStorageKey.LANGUAGE_ENG) {
        setLanguageValue("eng");
      } else {
        setLanguageValue("chn");
      }
    });
  }, []);

  const onLanguageOpen = useCallback(() => {
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
              }}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
        )}
      />
      <StatusBar style="auto" />
      <Text style={{ alignSelf: "center" }}>Home Screen</Text>
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
      height: 50,
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
