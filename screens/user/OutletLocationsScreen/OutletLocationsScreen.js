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
import { View, TouchableOpacity, ActivityIndicator,SafeAreaView } from "react-native";
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
import styles from "./styles";
import { translate } from "react-native-translate";
import { BackHandler } from 'react-native';

export default OutletLocationsScreen = (props) => {
  const dispatch = useDispatch();
  const getLocations = useSelector(
    (state) => state.myAccount.outletLocationsInfo
  );

  const [language, setLanguage] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

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
            <FlatList
            style={{paddingTop:20,paddingBottom:20}}
             data={getLocations} renderItem={renderItem}  showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}/>
          )}
        </ContainerFluid>
      </SafeAreaView>
    </>
  );
};

OutletLocationsScreen.navigationOptions = (props) => {
  return {
    headerTitle: () => (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{fontSize:20,color:Colors.white,padding:10}}>{translate("outletlocation")}</Text>
      </SafeAreaView>
    ),
    headerLeft: () => (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={()=>props.navigation.navigate("Setting")}>
          <Image
            style={styles.headerIcon}
            source={require("../../../assets/left_arrow_circle.png")}
          />
        </TouchableOpacity>
      </View>
    ),
  };
};