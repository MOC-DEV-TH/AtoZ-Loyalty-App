import { Text as Para, Heading as Title } from "native-base";
import { translate } from "react-native-translate";


export default function Text(props){
    return (
        <Para {...props} fontFamily={translate("nativebaseFont")} color={(props.color) ? props.color : "primaryLight"}>{props.children}</Para>
    )
}

export function Heading(props){
    return (
        <Title {...props} fontFamily={translate("nativebaseFont")} color={(props.color) ? props.color : "primary"} pt={1}>{props.children}</Title>
    )
}