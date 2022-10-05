import {
    Heading,
    View,
    Box,
    Text,
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
  import styles from "./styles";


  const CollapseHeaderInner = ({ title, hasDivider }) => {
    return (
      <>
        <Stack
          py={3}
          direction={"row"}
          alignContent="center"
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Heading size="sm" maxW={"90%"} fontWeight={600}>
            {title}
          </Heading>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#ddd" />
        </Stack>
  
        {hasDivider == false ? "" : <Divider bg="#e2edfb"></Divider>}
      </>
    );
  };
  
  const CollapseBodyInner = (props) => {
    return (
      <View>
        <Box py={3} px={4} backgroundColor={"#e2edfb"} borderRadius={4} mt={1}>
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
    return <Text mb={3}>{props.children}</Text>;
  };
  
  export default FAQScreen = (props) => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <EntryBanner 
          title="FAQs for Loyalty"></EntryBanner>
  
          <OverlapContentBox>
            <Box borderWidth={1} p={5} borderRadius={10} borderColor={"#e2edfb"}>
              <Heading size={"md"} mb={4} color="primary">
                  {translate("signupAndaccount")}
              </Heading>
              <VStack space={2}>
                <Collapse>
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
  
                <Collapse>
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
  
                <Collapse>
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
  
                <Collapse>
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
  
                <Collapse>
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
  
                <Collapse>
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
  
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={translate("anycost")}
                      hasDivider={false}
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
              borderWidth={1}
              p={5}
              borderRadius={10}
              borderColor={"#e2edfb"}
            >
              <Heading size={"md"} mb={4} color="primary">
                {translate("eariningandredeeming")}
              </Heading>
              <VStack space={2}>
                <Collapse>
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
  
                <Collapse>
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
  
                <Collapse>
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
  
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={translate("wherecanuse")}
                      hasDivider={false}
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
              borderWidth={1}
              p={5}
              borderRadius={10}
              borderColor={"#e2edfb"}
            >
              <Heading size={"md"} mb={4} color="primary">
                {translate("programLimit")}
              </Heading>
              <VStack space={2}>
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={translate("howmanypointcanearn")}
                      hasDivider={false}
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
              borderWidth={1}
              p={5}
              borderRadius={10}
              borderColor={"#e2edfb"}
            >
              <Heading size={"md"} mb={4} color="primary">
                {translate("returns")}
              </Heading>
              <VStack space={2}>
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={translate("canretrunorder")}
                      hasDivider={false}
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
              borderWidth={1}
              p={5}
              borderRadius={10}
              borderColor={"#e2edfb"}
            >
              <Heading size={"md"} mb={4} color="primary">
                {translate("rewardExpection")}
              </Heading>
              <VStack space={2}>
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={translate("dependonpointexp")}
                      hasDivider={false}
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
              borderWidth={1}
              p={5}
              borderRadius={10}
              borderColor={"#e2edfb"}
            >
              <Heading size={"md"} mb={4} color="primary">
                {translate("doPointExpired")}
              </Heading>
              <VStack space={2}>
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={translate("vipProgramQts")}
                      hasDivider={false}
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
              borderWidth={1}
              p={5}
              borderRadius={10}
              borderColor={"#e2edfb"}
            >
              <Heading size={"md"} mb={4} color="primary">
                {translate("doPointExpired")}
              </Heading>
              <VStack space={2}>
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={translate("vipProgramQts")}
                      hasDivider={false}
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
              borderWidth={1}
              p={5}
              borderRadius={10}
              borderColor={"#e2edfb"}
            >
              <Heading size={"md"} mb={4} color="primary">
                {translate("whatisvip")}
              </Heading>
              <VStack space={2}>
                <Collapse>
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
  
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={translate("howknownewtier")}
                      hasDivider={false}
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
              borderWidth={1}
              p={5}
              borderRadius={10}
              borderColor={"#e2edfb"}
            >
              <Heading size={"md"} mb={4} color="primary">
                {translate("tierExp")}
              </Heading>
              <VStack space={2}>
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={translate("tierrule")}
                      hasDivider={false}
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
              borderWidth={1}
              p={5}
              borderRadius={10}
              borderColor={"#e2edfb"}
            >
              <Heading size={"md"} mb={4} color="primary">
                {translate("troubleshooting")}
              </Heading>
              <VStack space={2}>
                <Collapse>
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
  
                <Collapse>
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
  
  
                <Collapse>
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
  
  
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={translate("whatneedtogetpoint")}
                      hasDivider={false}
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
              borderWidth={1}
              p={5}
              borderRadius={10}
              borderColor={"#e2edfb"}
            >
              <Heading size={"md"} mb={4} color="primary">
                {translate("birthdayreward")}
              </Heading>
              <VStack space={2}>
  
                <Collapse>
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
  
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={translate("bdrewardnotrecieve")}
                      hasDivider={false}
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
              borderWidth={1}
              p={5}
              borderRadius={10}
              borderColor={"#e2edfb"}
            >
              <Heading size={"md"} mb={4} color="primary">
                {translate("checkout")}
              </Heading>
              <VStack space={2}>
  
                <Collapse>
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
  
                <Collapse>
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
  
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={translate("howdoredeemrewardpoint")}
                      hasDivider={false}
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
  
          </OverlapContentBox>
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