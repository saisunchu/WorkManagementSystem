import { StyleSheet } from "react-native"
import { black, containor, grey, white } from "../../../../assets/colors"; 
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
    containor:
    {
        flex:1,
        backgroundColor: containor,
        // borderWidth:1,
    },
    TodayTask:
    {
        height:40,
        width:'87%',
        // backgroundColor:'pink',
        alignSelf:'center',
        marginTop:'7%',
        // justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'center',
        marginTop:'12%',
    },
    TodayTaskText:
    {
        color: black,
        fontWeight:'bold',
        fontSize:20,
        alignSelf:'center',
        // width:'100%',
        // borderWidth:1
        // paddingTop:'12%',
    },
    TaskFlatListView:
    {
        // borderWidth:2,
        width:'87%',
        alignSelf:'center',
        // height:'50%',
        flex:1,
        marginTop:'4%',
        // marginLeft:'7%'
    },
    renderItem:
    {
        width:'100%',
        marginBottom:'3%',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:white,
        borderRadius:12,
        borderWidth:1,
        borderColor: white,
        paddingHorizontal:'2%',
        padding:'2%',
        elevation:1,
    },
    TaskSymbole:
    { 
        // height: 55, 
        // width: '15%', 
        // justifyContent: 'center', 
        // alignItems: 'center', 
        // borderRadius: 12,
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