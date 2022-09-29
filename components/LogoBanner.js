import { Box } from "native-base";
import { StatusBar } from "react-native";
import Img from "../components/Img";
import Colors from "../constants/Colors";

const LogoBanner = (props) => {
    
    const minHeight = (props.minHeight) ? props.minHeight : 150;
    const statusBarHeight = (props.statusBarHeight == true) ? StatusBar.currentHeight : '';

    return (
        <>
        
        <StatusBar
        backgroundColor={Colors.primary}
        barStyle={"light-content"} 
        />

        <Box bg="primary" minH={minHeight} py={25} justifyContent="center" w={"100%"}>

            {
                (statusBarHeight) ? (
                    <Box style={{height: statusBarHeight}}></Box>
                ): (
                    ''
                )
            }
            
            <Img source={require("../assets/logo.png")}
            width={150}
            intWidth={512}
            intHeight={212}
            mx={"auto"}
            ></Img>
        </Box>
        <Img source={require("../assets/new_wave_acoount.png")} 
        marginTop={"-1"}
        width="100%"
        intWidth={1712}
        intHeight={312}
        resizeMode={"stretch"}
        ></Img>
        </>
    )
}


export default LogoBanner;