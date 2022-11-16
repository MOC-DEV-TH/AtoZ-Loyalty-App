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
  import { VStack, HStack, Box } from "native-base";
  import { setLocalization, translate } from "react-native-translate";
  import { useState, useEffect, useCallback } from "react";
  import { getStoreData } from "../../../AsyncStorage/AsyncStorage";
  import AsyncStorageKey from "../../../constants/AsyncStorageKey";
  import { storeData } from "../../../AsyncStorage/AsyncStorage";
  import my from "../../../locales/my";
  import en from "../../../locales/en";
  import Button from "../../../components/Button";
  import { BackHandler } from 'react-native';
  import { useDispatch, useSelector, shallowEqual } from "react-redux";
  import * as myAccountActions from "../../../store/actions/myAccount";
import { async } from "parse/lib/browser/Storage";
  
  export default DeactivateScreen = (props) => {
    const [touchEng, setTouchEng] = useState(false);
    const [touchMy, setTouchMy] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const dispatch = useDispatch();
  
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
  
    const onPressOk =async () => {
      setShowLoading(true);
         await dispatch(myAccountActions.deactivateAccount(props))
          setShowLoading(false)

    };
  
    return (
      <SafeAreaView style={styles.container}>
        <ContainerFluid mt={8} px={18} style={{flex:1}}>
          <VStack space={4}>
            <Box borderRadius={10} borderWidth={1} borderColor={Colors.primary} padding={6}>
             <VStack>
             <Text style={{marginBottom:10}}>
                If you deactivate your loyalty account,
                 </Text>
                 <Text>
                * Permanent loss of points accumulated.
                 </Text>
                 <Text style={{marginTop:5}}>
                * Need to create a new account again if you want to collect points in the future.
                 </Text>
             </VStack>
            </Box>
            <HStack justifyContent={"flex-end"} mt={5}>
              <Button onPress={() => onPressOk()} role="button" justifyContent="center">{translate("ok")}</Button>
  
            </HStack>
          </VStack>
          {showLoading ? <View style={styles.loading}><ActivityIndicator size={"large"} color={Colors.primary}/></View>  : undefined}
        </ContainerFluid>
      </SafeAreaView>
    );
  };
  
  DeactivateScreen.navigationOptions = (props) => {
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
          <Text style={{ fontSize: 22, color: Colors.white,padding:10 }}>{translate("deactivateAccount")}</Text>
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