import { SafeAreaView } from "react-native-safe-area-context";
import {
  AspectRatio,
  Image,
  Button,
  FlatList,
  Skeleton,
  HStack,
  VStack,
  Box,
} from "native-base";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import ContainerFluid from "../../../components/ContainerFluid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as myAccountActions from "../../../store/actions/myAccount";
import { useState } from "react";
import { getStoreData } from "../../../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import { useCallback } from "react";
import { MaterialIcons } from '@expo/vector-icons'; 
import Text, { Heading } from "../../../components/Typography";
import Colors from "../../../constants/Colors";


export default OutletLocationsScreen = (props) => {
  const dispatch = useDispatch();
  const getLocations = useSelector(
    (state) => state.myAccount.outletLocationsInfo
  );

  const [language, setLanguage] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getStoreData(AsyncStorageKey.LANGUAGE).then((value) => {
      if (value == AsyncStorageKey.LANGUAGE_MM) {
        setLanguage(value);
      } else if (value == AsyncStorageKey.LANGUAGE_ENG) {
        setLanguage(value);
      } else {
        setLanguage("en");
      }
    });
  });

  const loadLocationData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(myAccountActions.getOutletLocationsInfo(language));
    } catch (error) {}
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing, language]);

  useEffect(() => {
    loadLocationData();
    console.log("lan", getLocations);
  }, [loadLocationData]);

  const renderItem = ({ item }) => {
    return (
      <>
        <HStack mb={10} pr={10}>
          <MaterialIcons name="location-pin" size={20} color={Colors.primary} />
          <Box pl={2}>
            <Heading size={"sm"} color="primary" mb={1}>{item.location}</Heading>
            <Text>{item.address}</Text>
            <Text>Phone Number : {item.phnumber}</Text>
          </Box>
        </HStack>
      </>
    );
  };

  return (
    <>
      <SafeAreaView>
        <ContainerFluid>
          {isRefreshing ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList data={getLocations} renderItem={renderItem}  showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}/>
          )}
        </ContainerFluid>
      </SafeAreaView>
    </>
  );
};

OutletLocationsScreen.navigationOptions = (props) => {
  return {
    headerTitle: "",
    headerTintColor: "black",
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "white",
    },

    headerLeft: () => (
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Image
          style={{ height: 15, width: 20, marginLeft: 10 }}
          source={require("../../../assets/back_arrow.png")}
        />
      </TouchableOpacity>
    ),
  };
};
