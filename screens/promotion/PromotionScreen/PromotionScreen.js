import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Image, View, TouchableOpacity,FlatList } from "react-native";
import i18n from "../../../I18n/i18n";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import PROMOTIONS from '../../../data/dummy-promotiondata';
import {HStack,VStack, Menu, Pressable, Box} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function PromotionScreen() {
  const renderItem = ({ item }) => {
    return (
      <HStack style={styles.flatList}>
        {/* <Image resizeMode='contain' style={styles.image} source={require('../../../assets/a_to_z_logo.png')} alt='image'/> */}
        <Image resizeMode="contain" style = {styles.image} source={{uri:"https://thumbs.dreamstime.com/z/metal-diamond-plate-silver-color-20346285.jpg"} } alt="promotion image"/>
        <VStack style={styles.vContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </VStack>
      </HStack>
    );
  };

  const renderListEmptyComponent = ({item}) => {
    <Text>There is no items</Text>
  }

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.button}>
        <Text style={styles.text}>Hot Deals</Text>
      </View>
        <FlatList
            data={PROMOTIONS} 
            renderItem={renderItem}
            ListEmptyComponent={renderListEmptyComponent}
            keyExtractor={item => item.gpid}
        />
      </SafeAreaView>
  );
}

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
          <Menu.Item onPress={()=>props.navigation.navigate("MyAccount")}>My Account</Menu.Item>
          <Menu.Item>About us</Menu.Item>
        </Menu>
      </Box>
    ),
  };
};