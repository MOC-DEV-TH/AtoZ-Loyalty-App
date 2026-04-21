import {
  FlatList,
  HStack,
  Box,
  Heading,
} from "native-base";
import { View, ActivityIndicator, BackHandler } from "react-native";
import ContainerFluid from "../../../components/ContainerFluid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import * as myAccountActions from "../../../store/actions/myAccount";
import { getStoreData } from "../../../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import { MaterialIcons } from "@expo/vector-icons";
import Text from "../../../components/Typography";
import Colors from "../../../constants/Colors";
import styles from "./styles";
import i18n from "../../../I18n/i18n";

const OutletLocationsScreen = (props) => {
  const dispatch = useDispatch();

  const getLocations = useSelector(
    (state) => state.myAccount.outletLocationsInfo
  );

  const [language, setLanguage] = useState("en");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleBackButtonClick = () => {
    props.navigation.navigate("Setting");
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  useEffect(() => {
    const loadLanguage = async () => {
      const value = await getStoreData(AsyncStorageKey.LANGUAGE);

      if (value === AsyncStorageKey.LANGUAGE_MM) {
        setLanguage("my");
        i18n.locale = "my";
      } else {
        setLanguage("en");
        i18n.locale = "en";
      }
    };

    loadLanguage();
  }, []);

  const loadLocationData = useCallback(async () => {
    if (!language) return;

    setIsRefreshing(true);
    try {
      await dispatch(myAccountActions.getOutletLocationsInfo(language));
    } catch (error) {
      console.log(error);
    }
    setIsRefreshing(false);
  }, [dispatch, language]);

  useEffect(() => {
    loadLocationData();
  }, [loadLocationData]);

  const renderItem = ({ item }) => {
    return (
      <HStack mb={10} pr={10}>
        <MaterialIcons name="location-pin" size={20} color={Colors.primary} />
        <Box pl={2}>
          <Heading lineHeight={30} color={Colors.primary} fontSize={18}>
            {item.location}
          </Heading>

          <Text style={styles.description}>{item.address}</Text>
          <Text style={styles.description}>
            Phone Number : {item.phnumber}
          </Text>
        </Box>
      </HStack>
    );
  };

  return (
    <ContainerFluid>
      {isRefreshing ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ paddingTop: 20, paddingBottom: 20 }}
            data={getLocations}
            renderItem={renderItem}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : index.toString()
            }
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </ContainerFluid>
  );
};

export default OutletLocationsScreen;