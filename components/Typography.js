import { Text as Para } from "native-base";
import { translate } from "react-native-translate";


export default function Text(props){
    return (
        <Para {...props} fontFamily={translate("nativebaseFont")} color="primaryLight">{props.children}</Para>
    )
}