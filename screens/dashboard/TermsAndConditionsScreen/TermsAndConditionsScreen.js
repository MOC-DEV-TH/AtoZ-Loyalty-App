import { View, Box, ScrollView, VStack, Link } from "native-base";
import ContainerFluid from "../../../components/ContainerFluid";
import i18n from "../../../I18n/i18n";
import Text, { Heading } from "../../../components/Typography";

const SectionHeading = ({ title, subtitle }) => {
  return (
    <Box mb={5}>
      <Heading size="lg" color="#efb701" mb={1}>
        {title}
      </Heading>
      <Heading size="md" color="primary">
        {subtitle}
      </Heading>
    </Box>
  );
};

const SubSection = (props) => {
  return (
    <>
      <Heading size="sm" mb={2}>
        {props.title}
      </Heading>
      <Box>{props.children}</Box>
    </>
  );
};

const Para = (props) => {
  return <Text mb={3}>{props.children}</Text>;
};

const TermsAndCondition = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <ContainerFluid py={8}>
          <Box>
            <Heading size="md" mb={2}>
              {i18n.t("termsandconditions")}
            </Heading>
            <Heading size="md">
              {i18n.t("termsandconditions_rewards_program")}
            </Heading>
          </Box>

          <VStack space={8} mt={8}>
            {/* ARTICLE 1 */}
            <Box>
              <SectionHeading
                title={i18n.t("terms_article1")}
                subtitle={i18n.t("terms_article1_heading")}
              />

              <VStack space={6}>
                <SubSection title={i18n.t("terms_article1_overview")}>
                  <Para>{i18n.t("terms_article1_overview_desc_para1")}</Para>
                  <Para>{i18n.t("terms_article1_overview_desc_para2")}</Para>
                  <Para>{i18n.t("terms_article1_overview_desc_para3")}</Para>
                </SubSection>

                <SubSection
                  title={i18n.t("terms_article1_terms_and_conditions")}
                >
                  <Para>
                    {i18n.t("terms_article1_terms_and_conditions_para1")}
                  </Para>
                </SubSection>

                <SubSection title={i18n.t("terms_article1_acceptance")}>
                  <Para>{i18n.t("terms_article1_acceptance_para1")}</Para>
                </SubSection>
              </VStack>
            </Box>

            {/* ARTICLE 2 */}
            <Box>
              <SectionHeading
                title={i18n.t("terms_article2")}
                subtitle={i18n.t("terms_article2_heading")}
              />

              <VStack space={6}>
                <SubSection
                  title={i18n.t("terms_article2_member_enrollment")}
                >
                  <Para>
                    {i18n.t("terms_article2_member_enrollment_para1")}
                  </Para>
                </SubSection>

                <SubSection title={i18n.t("terms_article2_pw_security")}>
                  <Para>
                    {i18n.t("terms_article2_pw_security_para1")}
                  </Para>
                </SubSection>

                <SubSection
                  title={i18n.t("terms_article2_suspension_rights")}
                >
                  <Para>
                    {i18n.t("terms_article2_suspension_rights_para1")}
                  </Para>
                  <Para>
                    {i18n.t("terms_article2_suspension_rights_para2")}
                  </Para>
                  <Para>
                    {i18n.t("terms_article2_suspension_rights_para3")}
                  </Para>
                </SubSection>
              </VStack>
            </Box>

            {/* ARTICLE 3 */}
            <Box>
              <SectionHeading
                title={i18n.t("terms_article3")}
                subtitle={i18n.t("terms_article3_heading")}
              />

              <VStack space={6}>
                <SubSection
                  title={i18n.t("terms_article3_collection_redemption")}
                >
                  <Para>
                    {i18n.t(
                      "terms_article3_collection_redemption_para1"
                    )}
                  </Para>
                </SubSection>
              </VStack>
            </Box>

            {/* ARTICLE 5 CONTACT */}
            <Box>
              <SubSection title={i18n.t("terms_article5_contact")}>
                <Para>{i18n.t("terms_article5_contact_para1")}</Para>

                <Link
                  href="https://nativebase.io"
                  _text={{
                    color: "#1c19fd",
                    textDecoration: "none",
                    fontSize: "md",
                  }}
                  isExternal
                >
                  {i18n.t("terms_article5_contact_email1")}
                </Link>

                <Link
                  _text={{
                    color: "#1c19fd",
                    textDecoration: "none",
                    fontSize: "md",
                  }}
                >
                  {i18n.t("terms_article5_contact_email2")}
                </Link>
              </SubSection>
            </Box>
          </VStack>
        </ContainerFluid>
      </ScrollView>
    </View>
  );
};

export default TermsAndCondition;