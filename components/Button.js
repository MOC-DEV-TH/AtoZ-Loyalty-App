import { Button as Btn, Text, Box, HStack, Link } from "native-base";
import { useState } from "react";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native";
import { translate } from "react-native-translate";

export default function Button(props){

    return (
        <TouchableOpacity onPress={props.onPress}>
           <HStack bg={props.bg} px={props.px} height={47} alignItems={"center"} borderRadius={30}>
            <Box mr={4}>{props.Icon}</Box>
            <Text color={props.color} fontFamily={translate("headingFont")}>{props.children}</Text>
           </HStack>
        </TouchableOpacity>
    )
}