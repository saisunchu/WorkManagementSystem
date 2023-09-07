import { StyleSheet } from "react-native";
import { ButtonPrimary, white } from "../../assets/colors";
const styles = StyleSheet.create({
    Button:
    {
        borderRadius:13,
        backgroundColor: ButtonPrimary,
        width:'100%',
        height:'100%',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
    },
    ButtonText:
    {
        color:white,
        fontSize:17
    }
})
export default styles;