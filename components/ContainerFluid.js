import { Box } from "native-base";
import { StyleSheet } from "react-native";

export default function ContainerFluid(props){
    return (
        <Box style={styles.containerBox} {...props} pt={(props.standardTop == true) ? 25 : props.pt }>
            {props.children}
        </Box>
    );
}

const styles = StyleSheet.create({
    containerBox:{
        paddingLeft: 18,
        paddingRight: 18,
    }
});