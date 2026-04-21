import { Box, Text, View } from "native-base";
import ContainerFluid from "../../../components/ContainerFluid";
import EntryBanner from "../../../components/EntryBaner";
import i18n from "../../../I18n/i18n";

const OverlapContentBox = (props) => {
  return (
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
  );
};

const Para = (props) => {
  return <Text mb={3}>{props.children}</Text>;
};

const AboutScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <EntryBanner title={i18n.t("aboutcompany")} />

      <OverlapContentBox>
        <Para>
          Royal A to Z Co., Ltd provides a one stop solution for Home
          Decoration, Electronic appliances, construction, renovation and home
          improvement. A to Z is a place where you can have comprehensive range
          of construction materials and home decoration materials.
        </Para>

        <Para>
          Royal A to Z Holdings Co., Ltd mission is to become a market leader of
          Home Solution and Living Standard in Myanmar. It is a place full of a
          range of goods, standardized both from domestic manufacturers and
          imported from abroad, and most importantly, there is also a collection
          of products that are sufficient to meet the needs of customers who
          come to seek our services.
        </Para>
      </OverlapContentBox>
    </View>
  );
};

export default AboutScreen;