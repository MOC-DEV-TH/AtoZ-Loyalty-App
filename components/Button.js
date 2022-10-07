import { Button as Btn, Text, Box, HStack, Link } from "native-base";
import { useState } from "react";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native";
import { translate } from "react-native-translate";

export default function Button(props){

    const contentAlign = (props.Icon) ? 'flex-start' : 'center';
    const btnFontSize = (props.role == "button") ? 'lg' : props.fontSize;

    return (
        <TouchableOpacity onPress={props.onPress} disabled={(props.isDisabled) ? true : false}>
           <HStack bg={(props.bg) ? props.bg : "yellow"} px={props.px} height={44} alignItems={"center"} borderRadius={30} justifyContent={(props.justifyContent) ? props.justifyContent : contentAlign}
           mt={(props.mt) ? props.mt : 0} mb={(props.mb) ? props.mb : 0} my={(props.my) ? props.my : 0} 
           width={(props.width) ? props.width : "100%"}
           opacity={(props.isDisabled) ? .5 : 1}
           >
            {
                (props.Icon) ? (
                    <Box mr={4}>{props.Icon}</Box>
                ) : (<></>)
            }
            <Text color={(props.color) ? props.color : "primary"} fontFamily={translate("headingFont")} fontSize={(btnFontSize) ? btnFontSize : "md"}>{props.children}</Text>
           </HStack>
        </TouchableOpacity>
    )
}