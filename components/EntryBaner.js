import { Heading, Box} from "native-base"
import ContainerFluid from "./ContainerFluid"

export default EntryBanner = ({title}) => {
    return (
        <>
        <Box bg={"primary"} alignItems="center" justifyContent="center" minH={200} pt={15} pb={45} w={"100%"}>
            <ContainerFluid>
                <Heading size={"lg"} color={"white"} textAlign="center">{title}</Heading>
            </ContainerFluid>
        </Box>
        </>
    )   
}