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
  import { StyleSheet, TouchableOpacity,Image } from "react-native";
  import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList,
  } from "accordion-collapse-react-native";
  import i18n from "../../../I18n/i18n";
  import { MaterialIcons } from "@expo/vector-icons";
  
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
                  {i18n.t("signupAndaccount")}
              </Heading>
              <VStack space={2}>
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner title={i18n.t("howdosignup")} />
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
                    <CollapseHeaderInner title={i18n.t("whatareadv")} />
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
                    <CollapseHeaderInner title={i18n.t("needocreatenewone")} />
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
                    <CollapseHeaderInner title={i18n.t("whereisreward")} />
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
                    <CollapseHeaderInner title={i18n.t("willrecievepoints")} />
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
                    <CollapseHeaderInner title={i18n.t("cancombinemail")} />
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
                      title={i18n.t("anycost")}
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
                {i18n.t("eariningandredeeming")}
              </Heading>
              <VStack space={2}>
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner title={i18n.t("howdoredeempoint")} />
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
                    <CollapseHeaderInner title={i18n.t("howdoredeempoint")} />
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
                    <CollapseHeaderInner title={i18n.t("howdoconvert")} />
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
                      title={i18n.t("wherecanuse")}
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
                {i18n.t("programLimit")}
              </Heading>
              <VStack space={2}>
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={i18n.t("howmanypointcanearn")}
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
                {i18n.t("returns")}
              </Heading>
              <VStack space={2}>
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={i18n.t("canretrunorder")}
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
                {i18n.t("rewardExpection")}
              </Heading>
              <VStack space={2}>
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={i18n.t("dependonpointexp")}
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
                {i18n.t("doPointExpired")}
              </Heading>
              <VStack space={2}>
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={i18n.t("vipProgramQts")}
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
                {i18n.t("doPointExpired")}
              </Heading>
              <VStack space={2}>
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={i18n.t("vipProgramQts")}
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
                {i18n.t("whatisvip")}
              </Heading>
              <VStack space={2}>
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={i18n.t("howknowreward")}
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
                      title={i18n.t("howknownewtier")}
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
                {i18n.t("tierExp")}
              </Heading>
              <VStack space={2}>
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={i18n.t("tierrule")}
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
                {i18n.t("troubleshooting")}
              </Heading>
              <VStack space={2}>
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={i18n.t("whynotearnpoint")}
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
                      title={i18n.t("getcredit")}
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
                      title={i18n.t("whatwrong")}
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
                      title={i18n.t("whatneedtogetpoint")}
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
                {i18n.t("birthdayreward")}
              </Heading>
              <VStack space={2}>
  
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={i18n.t("howgetbdreward")}
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
                      title={i18n.t("bdrewardnotrecieve")}
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
                {i18n.t("checkout")}
              </Heading>
              <VStack space={2}>
  
                <Collapse>
                  <CollapseHeader>
                    <CollapseHeaderInner
                      title={i18n.t("applyfreeshipping")}
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
                      title={i18n.t("howdoredeemreward")}
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
                      title={i18n.t("howdoredeemrewardpoint")}
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
      headerTitle: "",
      headerTintColor: "black",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "white",
        height: 0,
      },
  
      headerLeft: () => (
        <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
          <Image
            style={{ height: 15, width: 20, marginLeft: 10 }}
            source={require("../../../assets/back_arrow.png")}
          />
        </TouchableOpacity>
      ),
    };
  };