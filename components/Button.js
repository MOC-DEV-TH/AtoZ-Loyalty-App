import { Button as Btn, Text, Box, HStack, Link } from "native-base";
import { useState } from "react";
import { Linking, TouchableOpacity } from "react-native";
import i18n from "../I18n/i18n"; // ✅ correct

export default function Button(props){

    const contentAlign = (props.Icon) ? 'flex-start' : 'center';
    const btnFontSize = (props.role == "button") ? 'lg' : props.fontSize;

    return (
        <TouchableOpacity onPress={props.onPress} disabled={props.isDisabled}>
           <HStack
              bg={props.bg ? props.bg : "yellow"}
              px={props.px}
              height={44}
              alignItems={"center"}
              borderRadius={30}
              justifyContent={props.justifyContent ? props.justifyContent : contentAlign}
              mt={props.mt || 0}
              mb={props.mb || 0}
              my={props.my || 0}
              width={props.width || "100%"}
              opacity={props.isDisabled ? 0.5 : 1}
           >
            {props.Icon && <Box mr={4}>{props.Icon}</Box>}

            <Text
              color={props.color ? props.color : "primary"}
              fontFamily={i18n.t("headingFont")}   // ✅ fixed
              fontSize={btnFontSize ? btnFontSize : "md"}
            >
              {props.children}
            </Text>
           </HStack>
        </TouchableOpacity>
    )
}