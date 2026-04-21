import {
  View,
  Box,
  VStack,
  ScrollView,
  Stack,
} from "native-base";
import ContainerFluid from "../../../components/ContainerFluid";
import React from "react";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import i18n from "../../../I18n/i18n";
import Text, { Heading } from "../../../components/Typography";
import styles from "./styles";

const CollapseHeaderInner = ({ title }) => {
  return (
    <Stack
      py={3}
      direction={"row"}
      alignItems={"center"}
      justifyContent="space-between"
    >
      <Heading size="sm" maxW={"90%"} fontWeight={600} color="primary">
        {title}
      </Heading>
    </Stack>
  );
};

const CollapseBodyInner = (props) => {
  return (
    <View>
      <Box mt={1}>{props.children}</Box>
    </View>
  );
};

const Para = (props) => {
  return (
    <Text mb={3} color="primary">
      {props.children}
    </Text>
  );
};

const FAQScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <ContainerFluid py={8}>
          {/* SIGNUP */}
          <Box>
            <Heading size="md" mb={2} color="primary">
              {i18n.t("signupAndaccount")}
            </Heading>

            <VStack space={2}>
              <Collapse disabled isExpanded>
                <CollapseHeader>
                  <CollapseHeaderInner title={i18n.t("howdosignup")} />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>Sample answer...</Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>

              <Collapse disabled isExpanded>
                <CollapseHeader>
                  <CollapseHeaderInner title={i18n.t("whatareadv")} />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>Sample answer...</Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>
            </VStack>
          </Box>

          {/* EARNING */}
          <Box mt={30}>
            <Heading size="md" mb={2} color="primary">
              {i18n.t("eariningandredeeming")}
            </Heading>

            <VStack space={2}>
              <Collapse disabled isExpanded>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={i18n.t("howdoredeempoint")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>Sample answer...</Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>
            </VStack>
          </Box>

          {/* LIMIT */}
          <Box mt={30}>
            <Heading size="md" mb={2} color="primary">
              {i18n.t("programLimit")}
            </Heading>

            <VStack space={2}>
              <Collapse disabled isExpanded>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={i18n.t("howmanypointcanearn")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>Sample answer...</Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>
            </VStack>
          </Box>
        </ContainerFluid>
      </ScrollView>
    </View>
  );
};

export default FAQScreen;