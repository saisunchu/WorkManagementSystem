import { StyleSheet } from "react-native";
import { black, containor, grey, lightgray, transparent, white } from "../../../assets/colors";
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
    containor:
    {
        flex:1,
        // justifyContent:'center', 
        // alignItems:'center', 
        backgroundColor:containor,
    },
    HeaderHomePageView:
    {
        // borderWidth:1,
        // backgroundColor:'pink',
        // flexDirection:'row',
        // justifyContent:'center'
    },
    HeaderTextHomePage:
    {
        alignSelf:'center',
        fontSize:18,
        fontWeight:'bold',
        marginTop:'12%',
        color: black,
    },
    FilterIcon:
    {
        alignSelf:'flex-end',
        position:'absolute',
        marginTop:'12%',
        marginRight:'8%',
        height:20,
        width:70,
        alignItems:'center',
    },
    ProgressSummary:
    {
        height:'25%',
        width:'87%',
        backgroundColor:'pink',
        alignSelf:'center',
        marginTop:'7%',
        borderRadius:25,
    },
    LinearGradient:
    {
        // height:'100%',
        // width:'100%',
        borderRadius:25,
       
    },
    ProgressHeaderText:
    {
        color: white,
        fontSize:17,
    },
    ProgressText:
    {
        color: white,
        marginTop:'2.5%',
        fontSize:13,
    },
    MembersView:
    {
        marginTop:'7%',
        height:45,
        width:80,
        // backgroundColor:'pink',
        zIndex:5,
        alignItems:'flex-end',
        flexDirection:'row-reverse',
        // overflow: 'hidden',
    },
    ProgressPlusIcon:
    {
        height:'100%',
        width:45,
        backgroundColor: white,
        borderRadius:25,
        elevation:2,
        shadowColor: '#000',
        shadowOffset: 
        {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems:'center',
        justifyContent:'center',
        zIndex:4,
    },
    MemberIcon:
    {
        height:'100%',
        width:45,
        backgroundColor: 'blue',
        borderRadius:25,
        elevation:2,
        shadowColor: '#000',
        shadowOffset: 
        {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems:'center',
        justifyContent:'center',
        borderColor: white,
        borderWidth:1,
        overflow:'hidden',
    },
    ProgressBar:
    {
        justifyContent:'flex-end',
        marginBottom:'2%',
        alignItems:'flex-end',
        marginLeft:'20%',
    },
    ProgressBarText:
    {
        color: white,
        fontSize:12,
        marginBottom:'4%',
        alignSelf:'flex-start',
        marginLeft:'1%',
    },
    ProgressBarPercentage:
    {
        color: white,
        fontSize:12,
        marginBottom:'4%',
        alignSelf:'flex-end',
        marginLeft:'1%',
    },
    TodayTask:
    {
        height:40,
        width:'87%',
        // backgroundColor:'pink',
        alignSelf:'center',
        marginTop:'7%',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
    },
    TodayTaskText:
    {
        color: black,
        fontWeight:'bold',
        fontSize:RFValue(20),
    },
    TaskFlatListView:
    {
        // borderWidth:2,
        width:'87%',
        alignSelf:'center',
        height:'52%',
        
        //backgroundColor:'#F6F6F6',
        paddingTop:'5%'
        
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
    renderItem:
    {
        width:'100%',
        height:65,
        marginBottom:'3%',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:white,
        borderRadius:12,
        borderWidth:1,
        borderColor: white,
        //paddingHorizontal:'2%',
        //padding:'2%',
        elevation:1,
    },
    TaskSymbole:
    { 
        // height: 55, 
        // width: '15%', 
        // justifyContent: 'center', 
        // alignItems: 'center', 
        // borderRadius: 12,
        
        marginLeft:'4%'
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
        marginTop: '4%',
    },
    TaskStatus:
    {
        // marginLeft:'7%'
        width:'10%',
        alignItems:'center',
        
    },
    FilterScreenContainor:
    {
        backgroundColor:transparent, 
        height:'100%', 
        width:'100%',
        position:'absolute',
    },
    FilterScreen:
    {
        position:'absolute',
        alignSelf:'flex-end',
        height:'30%',
        width:'70%',
        backgroundColor: white,
        // borderWidth:1,
        zIndex:100,
        marginTop:'13%',
        // marginLeft:'15%',
        borderBottomLeftRadius:15,
        elevation:3,
        shadowColor: '#000',
        shadowOffset: 
        {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding:'5%',
        justifyContent:'space-evenly',
    },
    FilterScreenField:
    {
        height:50,
        width:'100%',
        // backgroundColor:'pink',
        justifyContent:'center',
        alignItems:'center',
        elevation:3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        borderWidth:0.24,
        
    },
    FilterScreenFieldText:
    {
        fontSize:18,
        // color: 'grey',
        // color: black,
        color: grey,
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
    },
    flatlisticonstyle:{
        height:40,
        width:40
    }
})
export default styles;