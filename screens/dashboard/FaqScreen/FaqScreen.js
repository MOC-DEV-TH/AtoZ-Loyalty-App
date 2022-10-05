import {
  View,
  Box,
  Divider,
  VStack,
  ScrollView,
  Stack,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import ContainerFluid from "../../../components/ContainerFluid";
import EntryBaner from "../../../components/EntryBaner";
import { getStoreData } from "../../../AsyncStorage/AsyncStorage";
import { StyleSheet, TouchableOpacity,Image } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { setLocalization,translate } from 'react-native-translate';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import i18n from "../../../I18n/i18n";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import Text, { Heading } from "../../../components/Typography";
import styles from "./styles";

const CollapseHeaderInner = ({ title }) => {
  return (
    <>
      <Stack
        py={3}
        direction={"row"}
        alignContent="center"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Heading size="sm" maxW={"90%"} fontWeight={600} color="primary">
          {title}
        </Heading>
      </Stack>
    </>
  );
};

const CollapseBodyInner = (props) => {
  return (
    <View>
      <Box mt={1}>
        {props.children}
      </Box>
    </View>
  );
};

const OverlapContentBox = (props) => {
  return (
    <>
      <Box
        bg={"white"}
        roundedTopLeft="3xl"
        roundedTopRight="3xl"
        py="25"
        style={{ flex: 1 }}
        marginTop={-30}
      >
        <Box px={18}>{props.children}</Box>
      </Box>
    </>
  );
};

const Para = (props) => {
  return <Text mb={3} color="primary">{props.children}</Text>;
};

export default FAQScreen = (props) => {
  return (
    <View style={{ flex: 1 }} >
      <ScrollView>
        <ContainerFluid py={8}>
          <Box>
            <Heading size={"md"} mb={2} color="primary">
                {translate("signupAndaccount")}
            </Heading>
            <VStack space={2}>
              <Collapse  disabled={true}>
                <CollapseHeader>
                  <CollapseHeaderInner title={translate("howdosignup")} />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>

              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner title={translate("whatareadv")} />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>

              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner title={translate("needocreatenewone")} />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>

              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner title={translate("whereisreward")} />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>

              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner title={translate("willrecievepoints")} />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>

              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner title={translate("cancombinemail")} />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>

              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("anycost")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>
            </VStack>
          </Box>
          {/* end of Block */}

          <Box
            mt={30}
          >
            <Heading size={"md"} mb={2} color="primary">
              {translate("eariningandredeeming")}
            </Heading>
            <VStack space={2}>
              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner title={translate("howdoredeempoint")} />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>

              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner title={translate("howdoredeempoint")} />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>

              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner title={translate("howdoconvert")} />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>

              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("wherecanuse")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>
            </VStack>
          </Box>
          {/* end of Block */}

          <Box
            mt={30}
          >
            <Heading size={"md"} mb={2} color="primary">
              {translate("programLimit")}
            </Heading>
            <VStack space={2}>
              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("howmanypointcanearn")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>
            </VStack>
          </Box>
          {/* end of Block */}

          <Box
            mt={30}
          >
            <Heading size={"md"} mb={2} color="primary">
              {translate("returns")}
            </Heading>
            <VStack space={2}>
              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("canretrunorder")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>
            </VStack>
          </Box>
          {/* end of Block */}



          <Box
            mt={30}
          >
            <Heading size={"md"} mb={2} color="primary">
              {translate("rewardExpection")}
            </Heading>
            <VStack space={2}>
              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("dependonpointexp")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>
            </VStack>
          </Box>
          {/* end of Block */}


          <Box
            mt={30}
          >
            <Heading size={"md"} mb={2} color="primary">
              {translate("doPointExpired")}
            </Heading>
            <VStack space={2}>
              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("vipProgramQts")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>
            </VStack>
          </Box>
          {/* end of Block */}



          <Box
            mt={30}
          >
            <Heading size={"md"} mb={2} color="primary">
              {translate("doPointExpired")}
            </Heading>
            <VStack space={2}>
              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("vipProgramQts")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>
            </VStack>
          </Box>
          {/* end of Block */}




          <Box
            mt={30}
          >
            <Heading size={"md"} mb={2} color="primary">
              {translate("whatisvip")}
            </Heading>
            <VStack space={2}>
              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("howknowreward")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>

              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("howknownewtier")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>

            </VStack>
          </Box>
          {/* end of Block */}



          <Box
            mt={30}
          >
            <Heading size={"md"} mb={2} color="primary">
              {translate("tierExp")}
            </Heading>
            <VStack space={2}>
              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("tierrule")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>
            </VStack>
          </Box>
          {/* end of Block */}



          <Box
            mt={30}
          >
            <Heading size={"md"} mb={2} color="primary">
              {translate("troubleshooting")}
            </Heading>
            <VStack space={2}>
              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("whynotearnpoint")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>

              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("getcredit")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>


              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("whatwrong")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>


              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("whatneedtogetpoint")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>

            </VStack>
          </Box>
          {/* end of Block */}


          <Box
            mt={30}
          >
            <Heading size={"md"} mb={2} color="primary">
              {translate("birthdayreward")}
            </Heading>
            <VStack space={2}>

              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("howgetbdreward")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>

              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("bdrewardnotrecieve")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>


            </VStack>
          </Box>
          {/* end of Block */}


          <Box
            mt={30}
          >
            <Heading size={"md"} mb={2} color="primary">
              {translate("checkout")}
            </Heading>
            <VStack space={2}>

              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("applyfreeshipping")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>

              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("howdoredeemreward")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>

              <Collapse disabled={true} isExpanded={true}>
                <CollapseHeader>
                  <CollapseHeaderInner
                    title={translate("howdoredeemrewardpoint")}
                  />
                </CollapseHeader>
                <CollapseBody>
                  <CollapseBodyInner>
                    <Para>
                      Consequatur dolores ratione quaerat quisquam similique.
                    </Para>
                  </CollapseBodyInner>
                </CollapseBody>
              </Collapse>


            </VStack>
          </Box>
          {/* end of Block */}

        </ContainerFluid>
      </ScrollView>
    </View>
  );
};

FAQScreen.navigationOptions = (props) => {
  return {
    headerTitle: () => (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{fontSize:22,color:Colors.white}}>FAQs</Text>
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
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
          <Image
            style={styles.headerIcon}
            source={require("../../../assets/left_arrow_circle.png")}
          />
        </TouchableOpacity>
      </View>
    ),
  };
};