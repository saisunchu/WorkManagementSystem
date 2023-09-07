import { RFValue } from "react-native-responsive-fontsize";
import { black, containor, grey, lightgray, white } from "../../../assets/colors";
const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    containor:
    {
        flex:1,
        backgroundColor: containor,
    },
    HeaderTextHomePage:
    {
        alignSelf:'center',
        fontSize:18,
        fontWeight:'bold',
        marginTop:'12%',
        color: black,
        marginBottom:'8%',
    },
    TodayTask:
    {
        height:40,
        width:'87%',
        // backgroundColor:'pink',
        alignSelf:'center',
        marginTop:'3%',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
    },
    TodayTaskText:
    {
        color: black,
        fontWeight:'bold',
        fontSize:20,
    },
    TaskFlatListView:
    {
        // borderWidth:2,
        width:'87%',
        alignSelf:'center',
        height:'70%',
        marginTop:'4%',
    },
    renderItem:
    {
        width:'100%',
        marginBottom:'3%',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:white,
        borderRadius:12,
        elevation:1,
        borderColor: white,
        //paddingHorizontal:'2%',
        height: 65,
        
    },
    TaskName:
    {
        fontSize:RFValue(13),
        color: black,
        width:'100%'
    },
    Time:
    {
        fontSize: RFValue(9),
        color: grey,
        marginTop: 8,
    },
    TaskStatus:
    {
        // marginLeft:'7%'
        width:'10%',
        alignItems:'center',
    },
    TaskSymbole:
    { 
        // height: 55, 
        // width: '15%', 
        // justifyContent: 'center', 
        // alignItems: 'center', 
        // borderRadius: 12,
        // borderWidth:1,
        marginLeft:'4%'
    },
    NoTaskView:
    {
        // borderWidth:1,
        justifyContent:'center'
    },
    NoTaskImage:
    {
        height:'60%',
        width:'60%', 
        alignSelf:'center',
        marginTop:'5%',
    },
    NoTaskText:
    {
        color: lightgray,
        alignSelf:'center',
        marginTop:'3%',
        fontSize: RFValue(20)
    },
    flatlistdesigntask:{
        height:49,
        width:49,
        backgroundColor:'#bcd9f7',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:12
    },
    flatlistdevelopmenttask:{
        height:49,
        width:49,
        backgroundColor:'#e0aef5',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:12
    },
    flatlistresearchtask:{
        height:49,
        width:49,
        backgroundColor:'#f0c0a5',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:12
    },
    flatlisttestingtask:{
        height:49,
        width:49,
        backgroundColor:'#a4edbf',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:12
    },
    flatlistbdetask:{
        height:49,
        width:49,
        backgroundColor:'#a8a8ed',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:12
    }
})
export default styles;