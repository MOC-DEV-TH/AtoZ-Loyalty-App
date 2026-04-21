import { Text as Para, Heading as Title } from "native-base";
import i18n from "../I18n/i18n"; // ✅ correct


export default function Text(props){
    return (
        <Para {...props} fontFamily={i18n.t("nativebaseFont")} color={(props.color) ? props.color : "primaryLight"}>{props.children}</Para>
    )
}

export function Heading(props){
    return (
        <Title {...props} fontFamily={i18n.t("nativebaseFont")} color={(props.color) ? props.color : "primary"} pt={1}>{props.children}</Title>
    )
}