import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
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

export default PromotionScreen = (props) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadPromotionData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(promotionActions.getPromotions());
    } catch (error) {}
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing]);

  useEffect(() => {
    loadPromotionData();
  }, [loadPromotionData]);

  const promotionData = useSelector(
    (state) => state.promotion.promotions,
    shallowEqual
  );

  const renderItem = ({ item }) => {
    return (
      <HStack style={styles.flatList}>
        {/* <Image resizeMode='contain' style={styles.image} source={require('../../../assets/a_to_z_logo.png')} alt='image'/> */}
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{ uri: Global.baseImageUrl + item.image_en }}
          alt="promotion image"
        />
        <VStack style={styles.vContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>
            From time to time, the Company may advertise or offer exclusive
            offers to select Members to redeem points for items other than a
            discount reward, or receive other benefits or discounts
          </Text>
        </VStack>
      </HStack>
    );
  };

  const renderListEmptyComponent = ({ item }) => {
    <Text>There is no items</Text>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Text style={styles.text}>Hot Deals</Text>
      </View>
      {isRefreshing ? (
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
      )}
    </View>
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
        <TouchableOpacity>
          <Image
            style={styles.headerIcon}
            source={require("../../../assets/app_logo_blue.png")}
          />
        </TouchableOpacity>
      </View>
    ),

    headerRight: () => (
      <Box w="90%" alignItems="center">
        <Menu
          w="140"
          trigger={(triggerProps) => {
            return (
              <Pressable
                accessibilityLabel="More options menu"
                {...triggerProps}
              >
                <Ionicons
                  size={38}
                  style={{ color: Colors.white }}
                  name="menu"
                ></Ionicons>
              </Pressable>
            );
          }}
        >
          <Menu.Item
            onPress={() =>
              props.navigation.navigate("MyAccount")
            }
          >
            My Account
          </Menu.Item>
          <Menu.Item onPress={() => props.navigation.navigate("AboutUs")}>
            About us
          </Menu.Item>
          <Menu.Item
            onPress={() => props.navigation.navigate("TermAndCondition")}
          >
            Terms And Conditions
          </Menu.Item>
          <Menu.Item onPress={() => props.navigation.navigate("Faq")}>
            FAQ
          </Menu.Item>
        </Menu>
      </Box>
    ),
  };
};
