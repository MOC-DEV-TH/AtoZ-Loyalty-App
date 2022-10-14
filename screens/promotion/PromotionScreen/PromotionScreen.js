import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import i18n from "../../../I18n/i18n";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import { HStack, VStack, Menu, Pressable, Box } from "native-base";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as promotionActions from "../../../store/actions/promotions";
import { useEffect, useCallback, useState } from "react";
import Global from "../../../constants/Global";
import { translate } from "react-native-translate";
import { getStoreData } from "../../../AsyncStorage/AsyncStorage";
import AsyncStorageKey from "../../../constants/AsyncStorageKey";
import SessionExpireAlert from "../../../components/SessionExpireAlert";
import SeeMore from 'react-native-see-more-inline';
import ReadMore from '@fawazahmed/react-native-read-more';
import Text from "../../../components/Typography";
import ContainerFluid from "../../../components/ContainerFluid";

export default PromotionScreen = (props) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [language,setLanguage] = useState("");
  const [alert, setShowAlert] = useState(false);

  useEffect(() => {
    console.log("Will Focus");
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadPromotionData,
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadPromotionData,checkLanguage]);

  const loadPromotionData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(promotionActions.getPromotions());
    } catch (error) {}
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing]);

  useEffect(() => {
    loadPromotionData();
  }, [loadPromotionData,checkLanguage]);

  //check language
  const checkLanguage = useCallback(async () => {
    getStoreData(AsyncStorageKey.LANGUAGE).then((value) => {
      if (value == AsyncStorageKey.LANGUAGE_MM) {
        setLanguage(value)
      } else if (value == AsyncStorageKey.LANGUAGE_ENG) {
        setLanguage(value)
      } else {
        setLanguage("en")
      }
    });
  }, []);

  useEffect(() => {
    checkLanguage()
  }, []);

  const onConfirm = () => {
    dispatch(promotionActions.setEmptyResponseCode());
    props.navigation.navigate("AccountDashboard");
    setShowAlert(false)
  }

  const responseCode = useSelector(
    (state) => state.promotion.response_code,
    shallowEqual
  );

  const showSessionDialog = useCallback(()=>{
    setShowAlert(true)
  })

  useEffect(()=>{
    if(responseCode=="005"){
      showSessionDialog()
    }
  },)

  const promotionData = useSelector(
    (state) => state.promotion.promotions,
    shallowEqual
  );

  const renderItem = ({ item }) => {
    return (
      <HStack style={styles.flatList}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{ uri: Global.baseImageUrl + item.image_en }}
          alt="promotion image"
        />
        <VStack style={styles.vContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <SeeMore numberOfLines={4} style={styles.description}>
            {item.description}
          </SeeMore>
        </VStack>
      </HStack>
    );
  };
  const renderItemMM = ({ item }) => {
    console.log("DescriptionMM"+item.descriptionmm)
    return (
      <HStack style={styles.flatList}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{ uri: Global.baseImageUrl + item.image_mm }}
          alt="promotion image"
        />
        <VStack style={styles.vContainer}>
          <Text style={styles.title}>{item.namemm}</Text>
          <SeeMore numberOfLines={4} style={styles.description}>
           {item.descriptionmm}
          </SeeMore>
        </VStack>
      </HStack>
    );
  };

  const renderListEmptyComponent = ({ item }) => {
    <Text>There is no items</Text>;
  };

  return (
    <ContainerFluid standardTop={true}>
      <View style={styles.button}>
        <Text style={styles.text}>{translate("hotdeal")}</Text>
      </View>
      <SessionExpireAlert showAlert={alert} onConfirmPressed={onConfirm}/>
      {language=="my" 
      ? isRefreshing ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          onRefresh={loadPromotionData}
          refreshing={isRefreshing}
          data={promotionData}
          renderItem={renderItemMM}
          ListEmptyComponent={renderListEmptyComponent}
          keyExtractor={(item) => item.id}
        />
      ) :
      isRefreshing ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          onRefresh={loadPromotionData}
          refreshing={isRefreshing}
          data={promotionData}
          renderItem={renderItem}
          ListEmptyComponent={renderListEmptyComponent}
          keyExtractor={(item) => item.id}
        />
      )
      }
      
    </ContainerFluid>
  );
};

PromotionScreen.navigationOptions = (props) => {
  return {
    headerTitle: "",
    headerLeft: () => (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={()=>{props.navigation.navigate('Home', { screen: 'DashboardNavigator' })}}>
          <Image
            style={styles.headerIcon}
            source={require("../../../assets/logo.png")}
          />
        </TouchableOpacity>
      </View>
    ),

    // headerRight: () => (
    //   <TouchableOpacity onPress={()=>props.navigation.navigate("Notification")}>
    //       <Image
    //         style={{height:20,width:20,marginRight:18}}
    //         source={require("../../../assets/notification_icon.png")}
    //       />
    //     </TouchableOpacity>
    // ),
  };
};
