import { Image } from "native-base";

export default function Img(props){
    const width = (props.width) ? props.width : "100%";
    const intWidth = (props.intWidth) ? props.intWidth : 200;
    const intHeight = (props.intHeight) ? props.intHeight : 200;
    const resizeMode = (props.resizeMode) ? props.resizeMode : "contain";

    return (
        <Image {...props} resizeMode={resizeMode} style={{
            width: width,
            height: undefined,
            aspectRatio: intWidth / intHeight,
          }}>
            {props.children}
        </Image>
    );
}