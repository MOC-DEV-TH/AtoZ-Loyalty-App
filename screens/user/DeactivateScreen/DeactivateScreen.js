import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import styles from "./styles";
import Colors from "../../../constants/Colors";
import ContainerFluid from "../../../components/ContainerFluid";
import { VStack, HStack, Box } from "native-base";
import { useState, useEffect } from "react";
import Button from "../../../components/Button";
import { useDispatch } from "react-redux";
import * as myAccountActions from "../../../store/actions/myAccount";
import i18n from "../../../I18n/i18n";

const DeactivateScreen = (props) => {
  const [showLoading, setShowLoading] = useState(false);
  const dispatch = useDispatch();

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

  const onPressOk = async () => {
    setShowLoading(true);
    await dispatch(myAccountActions.deactivateAccount(props));
    setShowLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ContainerFluid mt={8} px={18} style={{ flex: 1 }}>
        <VStack space={4}>
          <Box
            borderRadius={10}
            borderWidth={1}
            borderColor={Colors.primary}
            padding={6}
          >
            <VStack>
              <Text style={{ marginBottom: 10 }}>
                {i18n.t("deactivate_body_text")}
              </Text>
            </VStack>
          </Box>

          <HStack justifyContent={"flex-end"} mt={5}>
            <Button onPress={onPressOk} role="button" justifyContent="center">
              {i18n.t("ok")}
            </Button>
          </HStack>
        </VStack>

        {showLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size={"large"} color={Colors.primary} />
          </View>
        ) : null}
      </ContainerFluid>
    </SafeAreaView>
  );
};

export default DeactivateScreen;