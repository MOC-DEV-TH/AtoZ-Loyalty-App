import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as homeActions from "../../../store/actions/home";
import React, { useState, useCallback, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
// import i18n from "../../../I18n/i18n";
import styles from "./styles";
import { HStack, VStack, Pressable, Menu, Box, ScrollView } from "native-base";
import Colors from "../../../constants/Colors";
import Slider from "../../../model/slider";
import Global from "../../../constants/Global";
import { translate } from "react-native-translate";
import SessionExpireAlert from "../../../components/SessionExpireAlert";
import Text from "../../../components/Typography";
import { ImageSlider } from "react-native-image-slider-banner"; 


export default HomeScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  let [alert, setShowAlert] = useState(false);
  const renderItem = ({ item }) => {
    return (
      <View style={{ width: "48%", marginTop: 15 }}>
        <TouchableOpacity onPress={()=>{props.navigation.navigate('Promotion', { screen: 'PromotionNavigator' })}}>
          <VStack style={{ flex: 1 }}>
            <Image
              resizeMode="stretch"
              style={{ height: 120 }}
              source={{ uri: Global.baseImageUrl + item.image_en }}
              alt="ads image"
            />
            <HStack
              style={{
                justifyContent: "space-between",
                height: 30,
                backgroundColor: Colors.yellow,
                alignItems: "center",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <Text style={{ color: Colors.primary }}>{item.name}</Text>
              <Text style={{ color: Colors.white, fontWeight: "bold" }}></Text>
            </HStack>
          </VStack>
        </TouchableOpacity>
      </View>
    );
  };
  const sliderList = [];

  useEffect(() => {
    console.log("Reload");
    loadPromotionData();
  }, [loadPromotionData]);

  useEffect(() => {
    console.log("Will Focus");
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadPromotionData
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadPromotionData]);

  const loadPromotionData = useCallback(async () => {
    setIsLoading(true);
    try { dispatch(homeActions.getHomePromotions());
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [setIsLoading, dispatch]);

  const promotionData = useSelector(
    (state) => state.homeScreen.home_promotions,
    shallowEqual
  );
  const availablePoints = useSelector(
    (state) => state.homeScreen.available_point,
    shallowEqual
  );

  const onConfirm = () => {
    dispatch(homeActions.setEmptyResponseCode());
    props.navigation.navigate("AccountDashboard");
    setShowAlert(false);
  };

  const responseCode = useSelector(
    (state) => state.homeScreen.response_code,
    shallowEqual
  );

  const showSessionDialog = useCallback(() => {
    setShowAlert(true);
  });

  useEffect(() => {
    if (responseCode == "005") {
      showSessionDialog();
    }
  });

  const onPressAvailablePoint = () => {
    props.navigation.push("PointHistory")
  }

  const promotionSlider = promotionData.filter(
    (item) => item.ads_type == "Slider"
  );

  const ads_data = promotionData.filter(
    (item) => item.ads_type == "Display Ads"
  );

    for (const item of promotionSlider) {
      sliderList.push({img: Global.baseImageUrl + item.image_en});
    }

    console.log("Slider Length",sliderList.length)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View>
      {sliderList.length > 0
       ? <ImageSlider
          data={sliderList}
          autoPlay={true}
          onItemChanged={(item) => console.log("item", item)}
          closeIconColor="#fff"
          preview={false}
          timer={4000}
          activeIndicatorStyle={{width:10,height:10,backgroundColor:Colors.yellow}}
          indicatorContainerStyle={{marginBottom:-20}}
          caroselImageStyle={{ resizeMode: 'cover', height: 240 }}
        />
        : undefined
      }
      </View>
      <SessionExpireAlert showAlert={alert} onConfirmPressed={onConfirm} />
      <View
        style={{
          backgroundColor: Colors.primary,
          fontWeight: "bold",
          padding: 10,
          paddingBottom:20
        }}
      >
      <VStack>
      <HStack justifyContent={"space-between"} alignItems="center" mb={2}>
          <Text
            style={{ color: Colors.white, fontWeight: "bold", fontSize: 18,padding:10 }}
          >
            {translate("availablePoint")}

          </Text>
         <TouchableOpacity onPress={()=>onPressAvailablePoint()}>
         <Image
            style={{ height: 20, width: 20 }}
            resizeMode="contain"
            source={require("../../../assets/right_arrow_circle.png")}
          />
         </TouchableOpacity>
        </HStack>
        <Box
          alignSelf="center"
          alignItems="center"
          bg="primary.500"
          p={3}
          borderColor="white"
          borderWidth="3"
          borderRadius={12}
          width="100%"
          _text={{
            fontSize: "lg",
            fontWeight: "bold",
            color: "warmGray.50",
            letterSpacing: "lg",
            fontSize:22
          }}
        >
          {availablePoints+" " + translate("point")} 
        </Box>
      </VStack>
      </View>
      
      <FlatList
        data={ads_data}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom :15
        }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
      </ScrollView>
      
      
    </SafeAreaView>
  );
};
HomeScreen.navigationOptions = (props) => {
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

    headerRight: () => (
      <TouchableOpacity onPress={()=>props.navigation.navigate("Notification")}>
          <Image
            style={{height:20,width:20,marginRight:18}}
            source={require("../../../assets/notification_icon.png")}
          />
        </TouchableOpacity>
      // <Box w="90%" alignItems="center">
      //   <Menu
      //     w="140"
      //     trigger={(triggerProps) => {
      //       return (
      //         <Pressable
      //           accessibilityLabel="More options menu"
      //           {...triggerProps}
      //         >
      //           <Ionicons
      //             size={38}
      //             style={{ color: Colors.white, marginRight: 15 }}
      //             name="menu"
      //           ></Ionicons>
      //         </Pressable>
      //       );
      //     }}
      //   >
      //     <Menu.Item
      //       onPress={() =>
      //         props.navigation.navigate("MyAccount", { screenName: "Home" })
      //       }
      //     >
      //       {translate("myaccount")}
      //     </Menu.Item>
      //     <Menu.Item onPress={() => props.navigation.navigate("AboutUs")}>
      //       {translate("aboutus")}
      //     </Menu.Item>
      //     <Menu.Item
      //       onPress={() => props.navigation.navigate("TermAndCondition")}
      //     >
      //       {translate("termandcondition")}
      //     </Menu.Item>
      //     <Menu.Item onPress={() => props.navigation.navigate("Faq")}>
      //       {translate("faq")}
      //     </Menu.Item>
      //   </Menu>
      // </Box>
    ),
  };
};