import { Box } from "native-base";

export default function ContainerFluid(props){
    return (
        <Box px={30} {...props}>
            {props.children}
        </Box>
    );
}