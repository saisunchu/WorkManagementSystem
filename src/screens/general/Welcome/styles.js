import { StyleSheet } from "react-native";
import { black, grey, white } from "../../../assets/colors";
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
    containor:
    {
        flex:1,
        backgroundColor: white,
    },
    imageBck:
    {
        width:'100%',
        height:'85%',
        padding:0,
        marginTop:'-15.4%',
        justifyContent:'flex-end',
    },

    welcomeTextView:
    {
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        alignSelf:'center',
        marginTop:'-35%',
        // borderWidth:1
    },
    welcomeText:
    {
        fontSize: RFValue(25),
        color: black,
        fontWeight:'bold',
    },
    welcomeTextBody:
    {
        marginTop:'2%',
        fontSize:RFValue(13),
        textAlign:'center',
        color: grey,
        width:'80%',
    },
    ButtonView:
    {
        height:'7%',
        width:'70%',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:'33%',
    },
})
export default styles;