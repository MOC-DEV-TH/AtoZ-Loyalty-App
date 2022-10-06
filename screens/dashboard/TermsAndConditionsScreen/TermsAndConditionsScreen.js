import { View, Box, ScrollView, VStack, Link } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import ContainerFluid from "../../../components/ContainerFluid";
import EntryBaner from "../../../components/EntryBaner";
import { StyleSheet, TouchableOpacity,Image } from "react-native";
import { setLocalization,translate } from 'react-native-translate';
import i18n from "../../../I18n/i18n";
import Colors from "../../../constants/Colors";
import styles from "./styles";
import Text, { Heading } from "../../../components/Typography";

const SectionHeading = ({title, subtitle}) => {
    return (
        <Box mb={5}>
              <Heading size={"lg"} color="#efb701"  mb={1}>{title}</Heading>
              <Heading size={"md"} color="primary" >{subtitle}</Heading>
        </Box>
    )
}

const SubSection = (props) => {
    return (
        <>
        <Heading size={"sm"}  mb={2}>{props.title}</Heading>
        <Box>
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
        <ContainerFluid py={8}>
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
                        <Link href="https://nativebase.io" _text={{color:"#1c19fd", textDecoration:"none", fontSize: "md"}} isExternal>{translate("terms_article5_contact_email1")}</Link>
                        <Link  _text={{color:"#1c19fd", textDecoration:"none", fontSize: "md"}}>{translate("terms_article5_contact_email2")}</Link>
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


        </ContainerFluid>
      </ScrollView>
    </View>
  );
};

TermsAndCondition.navigationOptions = (props) => {
    return {
      headerTitle: () => (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{fontSize:22,color:Colors.white}}>Terms & Conditions</Text>
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
          <TouchableOpacity onPress={()=>props.navigation.navigate("SignUp")}>
            <Image
              style={styles.headerIcon}
              source={require("../../../assets/left_arrow_circle.png")}
            />
          </TouchableOpacity>
        </View>
      ),
    };
  };