import { Heading, View, Box, Text, ScrollView, VStack, Link } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import ContainerFluid from "../../../components/ContainerFluid";
import EntryBaner from "../../../components/EntryBaner";
import { StyleSheet, TouchableOpacity,Image } from "react-native";
import { setLocalization,translate } from 'react-native-translate';
import i18n from "../../../I18n/i18n";
import Colors from "../../../constants/Colors";

const OverlapContentBox = (props) => {
  return (
    <>
      <Box
        bg={"white"}
        roundedTopLeft="3xl"
        roundedTopRight="3xl"
        py="30"
        style={{ flex: 1 }}
        marginTop={-30}
      >
        <ContainerFluid>{props.children}</ContainerFluid>
      </Box>
    </>
  );
};

const SectionHeading = ({title, subtitle}) => {
    return (
        <Box mb={5}>
              <Heading size={"lg"} color="#efb701" italic mb={1}>{title}</Heading>
              <Heading size={"md"} color="primary" italic>{subtitle}</Heading>
        </Box>
    )
}

const SubSection = (props) => {
    return (
        <>
        <Heading size={"sm"}  mb={4}>{props.title}</Heading>
        <Box bg={"blue.100"} p={5} borderRadius={8}>
            {props.children}
        </Box>
        </>
    )
}

const Para = (props) => {
  return <Text mb={3}>{props.children}</Text>;
};

export default TermsAndCondition = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <EntryBanner title={translate("loyaltytermsandconditions")}></EntryBanner>
        <OverlapContentBox>
          <Box>
            <Heading size={"md"} mb={2}>{translate("termsandconditions")}</Heading>
            <Heading size={"md"}>{translate("termsandconditions_rewards_program")}</Heading>
          </Box>

          <VStack space={8} mt={8}>
            <Box>
                <SectionHeading title={translate("terms_article1")} subtitle={translate("terms_article1_heading")} />
                <VStack space={6}>
                    <SubSection title={translate("terms_article1_overview")}>
                        <Para>{translate("terms_article1_overview_desc_para1")}</Para>
                        <Para>{translate("terms_article1_overview_desc_para2")}</Para>
                        <Para>{translate("terms_article1_overview_desc_para3")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article1_terms_and_conditions")}>
                        <Para>{translate("terms_article1_terms_and_conditions_para1")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article1_acceptance")}>
                        <Para>{translate("terms_article1_acceptance_para1")}</Para>
                    </SubSection>
                </VStack>
            </Box>


            <Box>
                <SectionHeading title={translate("terms_article2")} subtitle={translate("terms_article2_heading")} />
                <VStack space={6}>
                    <SubSection title={translate("terms_article2_member_enrollment")}>
                        <Para>{translate("terms_article2_member_enrollment_para1")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article2_pw_security")}>
                        <Para>{translate("terms_article2_pw_security_para1")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article2_suspension_rights")}>
                        <Para>{translate("terms_article2_suspension_rights_para1")}</Para>
                        <Para>{translate("terms_article2_suspension_rights_para2")}</Para>
                        <Para>{translate("terms_article2_suspension_rights_para3")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article2_change_info")}>
                        <Para>{translate("terms_article2_change_info_para1")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article2_inactive_acc")}>
                        <Para>{translate("terms_article2_inactive_acc_para1")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article2_acc_closure")}>
                        <Para>{translate("terms_article2_acc_closure_para1")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article2_security")}>
                        <Para>{translate("terms_article2_security_para1")}</Para>
                    </SubSection>
                </VStack>
            </Box>


            <Box>
                <SectionHeading title={translate("terms_article3")} subtitle={translate("terms_article3_heading")} />
                <VStack space={6}>
                    <SubSection title={translate("terms_article3_collection_redemption")}>
                        <Para>{translate("terms_article3_collection_redemption_para1")}</Para>
                        <Para>{translate("terms_article3_collection_redemption_para2")}</Para>
                        <Para>{translate("terms_article3_collection_redemption_para3")}</Para>
                        <Para>{translate("terms_article3_collection_redemption_para4")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article3_value")}>
                        <Para>{translate("terms_article3_value_para1")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article3_trans")}>
                        <Para>{translate("terms_article3_trans_para1")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article3_return_exchange_policy")}>
                        <Para>{translate("terms_article3_return_exchange_policy_para1")}</Para>
                        <Para>{translate("terms_article3_return_exchange_policy_para2")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article3_promo")}>
                        <Para>{translate("terms_article3_promo_para1")}</Para>
                    </SubSection>
                </VStack>
            </Box>


            <Box>
                <SectionHeading title={translate("terms_article4")} subtitle={translate("terms_article4_heading")} />
                <VStack space={6}>
                    <SubSection title={translate("terms_article4_confidential_info")}>
                        <Para>{translate("terms_article4_confidential_info_para1")}</Para>
                        <Para>{translate("terms_article4_confidential_info_para2")}</Para>
                        <Para>{translate("terms_article4_confidential_info_para3")}</Para>
                        <Para>{translate("terms_article4_confidential_info_para4")}</Para>
                        <Para>{translate("terms_article4_confidential_info_para5")}</Para>
                        <Para>{translate("terms_article4_confidential_info_para6")}</Para>
                        <Para>{translate("terms_article4_confidential_info_para7")}</Para>
                        <Para>{translate("terms_article4_confidential_info_para8")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article4_unsubscribe")}>
                        <Para>{translate("terms_article4_unsubscribe_para1")}</Para>
                    </SubSection>
                </VStack>
            </Box>


            <Box>
                <SectionHeading title={translate("terms_article5")} subtitle={translate("terms_article5_heading")} />
                <VStack space={6}>
                    <SubSection title={translate("terms_article5_acceptance")}>
                        <Para>{translate("terms_article5_acceptance_para1")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article5_other_terms")}>
                        <Para>{translate("terms_article5_other_terms_para1")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article5_abuse")}>
                        <Para>{translate("terms_article5_abuse_para1")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article5_waiver")}>
                        <Para>{translate("terms_article5_waiver_para1")}</Para>
                        <Para>{translate("terms_article5_waiver_para2")}</Para>
                        <Para>{translate("terms_article5_waiver_para3")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article5_contact")}>
                        <Para>{translate("terms_article5_contact_para1")}</Para>
                        <Link href="https://nativebase.io" isExternal>{translate("terms_article5_contact_email1")}</Link>
                        <Link>{translate("terms_article5_contact_email2")}</Link>
                    </SubSection>
                    <SubSection title={translate("terms_article5_juri_gov_law")}>
                        <Para>{translate("terms_article5_juri_gov_law_para1")}</Para>
                    </SubSection>
                    <SubSection title={translate("terms_article5_juri_dispute_resolution")}>
                        <Para>{translate("terms_article5_juri_dispute_resolution_para1")}</Para>
                    </SubSection>
                </VStack>
            </Box>

          </VStack>


        </OverlapContentBox>
      </ScrollView>
    </View>
  );
};

TermsAndCondition.navigationOptions = (props) => {
  return {
    headerTitle: "",
    headerTintColor: "black",
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: Colors.primary
    },

    headerLeft: () => (
      <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
        <Text style={{marginLeft:20,color:Colors.white}}>Back To Home</Text>
      </TouchableOpacity>
    ),
  };
};