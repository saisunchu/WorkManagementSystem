import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, BackHandler, Pressable, Image } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { BarChart } from "react-native-gifted-charts";
import { BarChart1 } from "react-native-gifted-charts";
import AntIcon from "react-native-vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import { white,transparent, black, LinearGradientPrimary, containor, grey, lightgray, LinearGradientSecondary } from "../../assets/colors";
import { getTasks } from "../../FirebaseAction";
import { BDEImage2, Development2, SearchImage2, Testing2, UIDesign2, UIDesignImage } from "../../assets/assets";
import { RFValue } from "react-native-responsive-fontsize";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

let FirebaseTaskArray;
let StackDataDemo=[];
let StackDataDemo2=[];
let values = [];
let TotalTasks = 0;
let LatestFeatures = [];
let TaskColor, TimeColor;

const Statistics = ({ navigation }) => {

    const [maxValue, setmaxValue] = useState(70)
    const [val1, setval1] = useState(30)
    const [val2, setval2] = useState(70)
    const [val3, setval3] = useState(40)
    const [val4, setval4] = useState(30)
    const [val5, setval5] = useState(60)
    const [val6, setval6] = useState(50)
    const [val7, setval7] = useState(20)
    const [change, setchange] = useState('week')
    const [changegraph, setchangegraph] = useState(0)

    const [dropdown, setdropdown] = useState(null)

    const [total_tasks,setTotal_tasks]=useState(0);
    const [refresh, setRefresh] = useState(true);
    const [stackdata1, setStackdata1] = useState([]);
    const [stackdata2, setStackdata2] = useState([]);

    // const StackData = [
    //     {
    //         stacks: [
    //         { value: maxValue - val1, color: 'purple', borderRadius:10,marginBottom:-20, zIndex:-1 },
    //         { value: val1, color: 'green',borderRadius:10, zIndex:1 },], label: 'M', topLabelComponent: () => <Text style={{ marginTop: -5 }}>{val1}</Text>
    //     },
    //     {
    //         stacks: [{ value: val2, color: '#0082E1', borderRadius: 10 },
    //         { value: maxValue - val2, color: '#ecf4fd', borderTopLeftRadius: 10, borderTopRightRadius: 10 }], label: 'T', topLabelComponent: () => <Text style={{ marginTop: -5 }}>{val2}</Text>
    //     },
    //     {
    //         stacks: [{ value: val3, color: '#0082E1', borderRadius: 10 },
    //         { value: maxValue - val3, color: '#ecf4fd', borderTopLeftRadius: 10, borderTopRightRadius: 10 }], label: 'W', topLabelComponent: () => <Text style={{ marginTop: -5 }}>{val3}</Text>
    //     },
    //     {
    //         stacks: [{ value: val4, color: '#0082E1', borderRadius: 10 },
    //         { value: maxValue - val4, color: '#ecf4fd', borderTopLeftRadius: 10, borderTopRightRadius: 10 }], label: 'T', topLabelComponent: () => <Text style={{ marginTop: -5 }}>{val4}</Text>
    //     },
    //     {
    //         stacks: [{ value: val5, color: '#0082E1', borderRadius: 10 },
    //         { value: maxValue - val5, color: '#ecf4fd', borderTopLeftRadius: 10, borderTopRightRadius: 10 }], label: 'F', topLabelComponent: () => <Text style={{ marginTop: -5 }}>{val5}</Text>
    //     },
    //     {
    //         stacks: [{ value: val6, color: '#0082E1', borderRadius: 10 },
    //         { value: maxValue - val6, color: '#ecf4fd', borderTopLeftRadius: 10, borderTopRightRadius: 10 }], label: 'S', topLabelComponent: () => <Text style={{ marginTop: -5 }}>{val6}</Text>
    //     },
    //     {
    //         stacks: [{ value: val7, color: '#0082E1', borderRadius: 10 },
    //         { value: maxValue - val7, color: '#ecf4fd', borderTopLeftRadius: 10, borderTopRightRadius: 10 }], label: 'S', topLabelComponent: () => <Text style={{ marginTop: -5 }}>{val7}</Text>
    //     }
    // ]



    // const StackData1 = [
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>40</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>30</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd' , borderRadius:10}], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>60</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>20</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd' , borderRadius:10}], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>25</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>10</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>40</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>30</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd' , borderRadius:10}], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>60</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>20</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd' , borderRadius:10}], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>25</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>10</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>40</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>30</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd' , borderRadius:10}], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>60</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>20</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd' , borderRadius:10}], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>25</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>10</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>40</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>30</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd' , borderRadius:10}], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>60</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>20</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd' , borderRadius:10}], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>25</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>10</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>40</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>30</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd' , borderRadius:10}], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>60</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>20</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd' , borderRadius:10}], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>25</Text>
    //     },
    //     {
    //         stacks: [{ value: 60, color: '#ecf4fd', borderRadius:10 }], label: 'J', topLabelComponent: () => <Text style={{ marginTop: -5 }}>10</Text>
    //     },
    // ]
    // const StackData2 = [
    //     {
    //         stacks: [{ value: 40, color: 'green', borderRadius:10 }], label: 'J', 
    //     },
    //     {
    //         stacks: [{ value: 30, color: 'green', borderRadius:10 }], label: 'J', 
    //     },
    //     {
    //         stacks: [{ value: 60, color: 'green', borderRadius:10 }], label: 'J',
    //     },
    //     {
    //         stacks: [{ value: 20, color: 'green', borderRadius:10 }], label: 'J', 
    //     },
    //     {
    //         stacks: [{ value: 25, color: 'green', borderRadius:10 }], label: 'J', 
    //     },
    //     {
    //         stacks: [{ value: 10, color: 'green', borderRadius:10 }], label: 'J',
    //     },
    // ]


    const data = [
        { label: 'Week', value: '1' },
        { label: 'Month', value: '2' },
        { label: 'Year', value: '3' }
    ]

    const back = () => {

        navigation.goBack()
        ShowBottomTab()
    }

    const ShowBottomTab = () => {
        console.log('========ShowBottomTab');
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                backgroundColor: white,
                height: Platform.OS === 'ios' ? '11%' : '10%',
                justifyContent: 'center',
                paddingBottom: Platform.OS === 'ios' ? 15 : 0,
                borderTopColor: transparent,
                elevation: 0,
                shadowOpacity: 0,
            }
        });
    };

    const handleBackPress = () => {
        // Handle the back button press here
        console.log('=======handleBackPress');
        ShowBottomTab();
        navigation.goBack();
        return true; // Return true to prevent default behavior (exit app)
    };

    const HideBottomTab = () => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: "none"
            }
        });
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: undefined
        });
    };

    function objectToArray(obj) {
        const result = [];
        // console.log('Arraaayyyy result =====', result );
        Object.values(obj).forEach(function(subObj) {
          result.push(subObj);
        });
        console.log('Arraaayyyy result =====', result );
        return result;
      }

    useEffect(()=>{
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
        );
        HideBottomTab();

        const fetchTasks = async () =>
        {
            console.log('Inside FetchTasks=-=-------');
            const DataTasks = await getTasks();
            // console.log('------------------------------------------------------DataTasks:',DataTasks);
            LatestFeatures = objectToArray(DataTasks);
            console.log('------------------------------------------------------FirebaseTaskArray:',LatestFeatures);
            // Dispatch(taskDetails(FirebaseTaskArray))
        }
        fetchTasks();

        const date = new Date();
        setSelectedIndex(date.getMonth())
        handleMenuItemClick(date.getMonth())
        console.log('====================================');
        console.log(date.getMonth());
        console.log('====================================');

        return () => backHandler.remove();
    },[])
    
    const styles = StyleSheet.create({
        heading: {

            alignSelf: 'center',
            paddingLeft: '24%',
            fontWeight: 'bold',
            color: 'black',
            fontSize: 19,

        },
        text1: {
            fontSize: 25,
            color: black,
            marginLeft: '7%',
            marginTop: 40
        },
        text2: {
            marginLeft: '7%',
            marginTop: 9,
            color : grey
        },
        months: {
            marginLeft: 26,
            color: 'black'
        },
        text3: {
            color: 'black',

            marginLeft: '7%',
            fontSize: 20
        },
        graphview: {
            marginTop: 20,
            // marginTop:'-5%',
            height: 260,
            alignItems: 'flex-end',
            width: '100%',
            alignSelf: 'center',
            // borderWidth:1,
            // marginBottom:'10%',
        },
        latestactivitiestext: {
            color: 'black',
            marginTop: 10,
            marginLeft: 30,
            fontSize: 22
        },
        scrollview: {
            width: '78%',
            marginLeft: '7%',
            marginTop: 30
        },


        selectedMenuItem: {
            borderBottomWidth: 2,
            borderBottomColor: '#0082E1',

        },
        menuItemText: {
            fontSize: 16,
            fontWeight: 'bold',

        },
        selectedText: {
            color: '#0082E1'
        },
        text: {
            color: 'black',

        },
        dropdownstyle: {
            width: '25%',
            height: 30,
            marginLeft: '34%',
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: '#ecf4fd',
            borderColor: '#ecf4fd',
            zIndex: 100
        },
        flatlistview: {
            height: 40, alignItems: 'center', width: '82%', marginTop: 50, marginLeft: '7%'
        },
        statisticsview: {
            flexDirection: 'row', alignItems: 'center', zIndex: 100, marginTop: 20
        },
        LatestFeatures:
        {
            // height:'52%',
            // borderWidth:2,
            width:'87%',
            alignSelf:'center',
            height:400,
            marginTop:'4%',
            marginBottom:'5%',
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
        paddingHorizontal:'2%',
        height: 60,
        
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
    },
    })


    const MENU_ITEMS = [
        { key: '1', text: 'January' },
        { key: '2', text: 'February' },
        { key: '3', text: 'March' },
        { key: '4', text: 'April' },
        { key: '5', text: 'May' },
        { key: '6', text: 'June' },
        { key: '7', text: 'July' },
        { key: '8', text: 'August' },
        { key: '9', text: 'September' },
        { key: '10', text: 'October' },
        { key: '11', text: 'November' },
        { key: '12', text: 'December' }
    ];

    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleMenuItemClick = async (index) => {
        setSelectedIndex(index);
        console.log(index)
        
        const fetchTasks = async () =>
        {
            console.log('Inside FetchTasks=-=-------');
            const DataTasks = await getTasks();
            // console.log('------------------------------------------------------DataTasks:',DataTasks);
            FirebaseTaskArray = objectToArray(DataTasks);
            console.log('------------------------------------------------------FirebaseTaskArray:',FirebaseTaskArray);
            // Dispatch(taskDetails(FirebaseTaskArray))
        }
        await fetchTasks();
        if (index == 0) 
        {
            StackDataDemo = [];
            StackDataDemo2 = [];
            let TempArray = FirebaseTaskArray.filter((task,index)=>task.date.substring(5, 7)==='01');
            console.log('FirebaseTaskArray==========',TempArray);
            TempArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            console.log('Sorted Temp Array==========',TempArray);
            
            for(let i=0;i<31;i++)
            {
                values[i]= TempArray.filter((task, index)=>parseInt(task.date.substring(8, 10))===i+1).length;
                StackDataDemo.push({stacks:[{value: values[i], color: LinearGradientPrimary, borderRadius:10 }]}) 
                
            }
            console.log('Values of Month : ',values);
            console.log('StackDataDemo : ',StackDataDemo);

            const MaxValue = Math.max(...values)
            let RoundedMax = Math.ceil(MaxValue / 10) * 10;
            console.log('RoundedMax========',RoundedMax);

            if(RoundedMax<=100)
                RoundedMax = 100
            else if(RoundedMax<=1000)
                RoundedMax = 1000
            else 
                RoundedMax = 10000


            for(let i=0;i<31;i++)
            {
                StackDataDemo2.push({stacks:[{value: RoundedMax, color: '#ecf4fd', borderRadius:10 }], label:i+1, topLabelComponent: () => <Text style={{ marginTop: -5, color: grey }}>{values[i]}</Text> }) 
                TotalTasks = TotalTasks + values[i];
            }


            setTotal_tasks(TotalTasks)
            setStackdata1(StackDataDemo);
            setStackdata2(StackDataDemo2);
            StackDataDemo = [];
            StackDataDemo2 = [];
            TotalTasks=0;
            setRefresh(!refresh)

            // StackDataDemo.push({stacks:[{value:}]}) 

        }
        else if (index == 1) 
        {
            StackDataDemo = [];
            StackDataDemo2 = [];
            let TempArray = FirebaseTaskArray.filter((task,index)=>task.date.substring(5, 7)==='02');
            console.log('FirebaseTaskArray==========',TempArray);
            TempArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            console.log('Sorted Temp Array==========',TempArray);
            
            for(let i=0;i<28;i++)
            {
                values[i]= TempArray.filter((task, index)=>parseInt(task.date.substring(8, 10))===i+1).length;
                StackDataDemo.push({stacks:[{value: values[i], color: LinearGradientPrimary, borderRadius:10 }]}) 
                
            }
            console.log('Values of Month : ',values);
            console.log('StackDataDemo : ',StackDataDemo);

            const MaxValue = Math.max(...values)
            let RoundedMax = Math.ceil(MaxValue / 10) * 10;
            console.log('RoundedMax========',RoundedMax);

            if(RoundedMax<=100)
                RoundedMax = 100
            else if(RoundedMax<=1000)
                RoundedMax = 1000
            else 
                RoundedMax = 10000


            for(let i=0;i<28;i++)
            {
                StackDataDemo2.push({stacks:[{value: RoundedMax, color: '#ecf4fd', borderRadius:10 }], label:i+1 , topLabelComponent: () => <Text style={{ marginTop: -5 }}>{values[i]}</Text> }) 
                TotalTasks = TotalTasks + values[i];
            }

            setStackdata1(StackDataDemo);
            setStackdata2(StackDataDemo2);
            StackDataDemo = [];
            StackDataDemo2 = [];
            setTotal_tasks(TotalTasks)
            TotalTasks=0;
            setRefresh(!refresh)
        }
        else if (index == 2) 
        {
            StackDataDemo = [];
            StackDataDemo2 = [];
            let TempArray = FirebaseTaskArray.filter((task,index)=>task.date.substring(5, 7)==='03');
            console.log('FirebaseTaskArray==========',TempArray);
            TempArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            console.log('Sorted Temp Array==========',TempArray);
            
            for(let i=0;i<31;i++)
            {
                values[i]= TempArray.filter((task, index)=>parseInt(task.date.substring(8, 10))===i+1).length;
                StackDataDemo.push({stacks:[{value: values[i], color: LinearGradientPrimary, borderRadius:10 }]}) 
                
            }
            console.log('Values of Month : ',values);
            console.log('StackDataDemo : ',StackDataDemo);

            const MaxValue = Math.max(...values)
            let RoundedMax = Math.ceil(MaxValue / 10) * 10;
            console.log('RoundedMax========',RoundedMax);

            if(RoundedMax<=100)
                RoundedMax = 100
            else if(RoundedMax<=1000)
                RoundedMax = 1000
            else 
                RoundedMax = 10000


            for(let i=0;i<31;i++)
            {
                StackDataDemo2.push({stacks:[{value: RoundedMax, color: '#ecf4fd', borderRadius:10 }], label:i+1, topLabelComponent: () => <Text style={{ marginTop: -5 }}>{values[i]}</Text> }) 
                TotalTasks = TotalTasks + values[i];
            }

            setStackdata1(StackDataDemo);
            setStackdata2(StackDataDemo2);
            StackDataDemo = [];
            StackDataDemo2 = [];
            setTotal_tasks(TotalTasks)
            TotalTasks=0;
            setRefresh(!refresh)

        }
        else if (index == 3) 
        {
            StackDataDemo = [];
            StackDataDemo2 = [];
            let TempArray = FirebaseTaskArray.filter((task,index)=>task.date.substring(5, 7)==='04');
            console.log('FirebaseTaskArray==========',TempArray);
            TempArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            console.log('Sorted Temp Array==========',TempArray);
            
            for(let i=0;i<30;i++)
            {
                values[i]= TempArray.filter((task, index)=>parseInt(task.date.substring(8, 10))===i+1).length;
                StackDataDemo.push({stacks:[{value: values[i], color: LinearGradientPrimary, borderRadius:10 }]}) 
                
            }
            console.log('Values of Month : ',values);
            console.log('StackDataDemo : ',StackDataDemo);

            const MaxValue = Math.max(...values)
            let RoundedMax = Math.ceil(MaxValue / 10) * 10;
            console.log('RoundedMax========',RoundedMax);

            if(RoundedMax<=100)
                RoundedMax = 100
            else if(RoundedMax<=1000)
                RoundedMax = 1000
            else 
                RoundedMax = 10000


            for(let i=0;i<30;i++)
            {
                StackDataDemo2.push({stacks:[{value: RoundedMax, color: '#ecf4fd', borderRadius:10 }], label:i+1, topLabelComponent: () => <Text style={{ marginTop: -5 }}>{values[i]}</Text> }) 
                TotalTasks = TotalTasks + values[i];
            }

            setStackdata1(StackDataDemo);
            setStackdata2(StackDataDemo2);
            StackDataDemo = [];
            StackDataDemo2 = [];
            setTotal_tasks(TotalTasks)
            TotalTasks=0;
            setRefresh(!refresh)
        }
        else if (index == 4)
        {
            StackDataDemo = [];
            StackDataDemo2 = [];
            let TempArray = FirebaseTaskArray.filter((task,index)=>task.date.substring(5, 7)==='05');
            console.log('FirebaseTaskArray==========',TempArray);
            TempArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            console.log('Sorted Temp Array==========',TempArray);
            
            for(let i=0;i<31;i++)
            {
                values[i]= TempArray.filter((task, index)=>parseInt(task.date.substring(8, 10))===i+1).length;
                StackDataDemo.push({stacks:[{value: values[i], color: LinearGradientPrimary, borderRadius:10 }]}) 
                
            }
            console.log('Values of Month : ',values);
            console.log('StackDataDemo : ',StackDataDemo);

            const MaxValue = Math.max(...values)
            let RoundedMax = Math.ceil(MaxValue / 10) * 10;
            console.log('RoundedMax========',RoundedMax);

            if(RoundedMax<=100)
                RoundedMax = 100
            else if(RoundedMax<=1000)
                RoundedMax = 1000
            else 
                RoundedMax = 10000


            for(let i=0;i<31;i++)
            {
                StackDataDemo2.push({stacks:[{value: RoundedMax, color: '#ecf4fd', borderRadius:10 }], label:i+1, topLabelComponent: () => <Text style={{ marginTop: -5 }}>{values[i]}</Text> }) 
                TotalTasks = TotalTasks + values[i];
            }

            setStackdata1(StackDataDemo);
            setStackdata2(StackDataDemo2);
            StackDataDemo = [];
            StackDataDemo2 = [];
            setTotal_tasks(TotalTasks)
            TotalTasks=0;
            setRefresh(!refresh)
        }
        else if (index == 5) 
        {
            StackDataDemo = [];
            StackDataDemo2 = [];
            let TempArray = FirebaseTaskArray.filter((task,index)=>task.date.substring(5, 7)==='06');
            console.log('FirebaseTaskArray==========',TempArray);
            TempArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            console.log('Sorted Temp Array==========',TempArray);
            
            for(let i=0;i<30;i++)
            {
                values[i]= TempArray.filter((task, index)=>parseInt(task.date.substring(8, 10))===i+1).length;
                StackDataDemo.push({stacks:[{value: values[i], color: LinearGradientPrimary, borderRadius:10 }]}) 
                
            }
            console.log('Values of Month : ',values);
            console.log('StackDataDemo : ',StackDataDemo);

            const MaxValue = Math.max(...values)
            let RoundedMax = Math.ceil(MaxValue / 10) * 10;
            console.log('RoundedMax========',RoundedMax);

            if(RoundedMax<=100)
                RoundedMax = 100
            else if(RoundedMax<=1000)
                RoundedMax = 1000
            else 
                RoundedMax = 10000


            for(let i=0;i<30;i++)
            {
                StackDataDemo2.push({stacks:[{value: RoundedMax, color: '#ecf4fd', borderRadius:10 }], label:i+1, topLabelComponent: () => <Text style={{ marginTop: -5 }}>{values[i]}</Text> }) 
                TotalTasks = TotalTasks + values[i];
            }

            setStackdata1(StackDataDemo);
            setStackdata2(StackDataDemo2);
            StackDataDemo = [];
            StackDataDemo2 = [];
            setTotal_tasks(TotalTasks)
            TotalTasks=0;
            setRefresh(!refresh)
        }
        else if (index == 6) 
        {
            StackDataDemo = [];
            StackDataDemo2 = [];
            let TempArray = FirebaseTaskArray.filter((task,index)=>task.date.substring(5, 7)==='07');
            console.log('FirebaseTaskArray==========',TempArray);
            TempArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            console.log('Sorted Temp Array==========',TempArray);
            
            for(let i=0;i<31;i++)
            {
                values[i]= TempArray.filter((task, index)=>parseInt(task.date.substring(8, 10))===i+1).length;
                StackDataDemo.push({stacks:[{value: values[i], color: LinearGradientPrimary, borderRadius:10 }]}) 
                
            }
            console.log('Values of Month : ',values);
            console.log('StackDataDemo : ',StackDataDemo);

            const MaxValue = Math.max(...values)
            let RoundedMax = Math.ceil(MaxValue / 10) * 10;
            console.log('RoundedMax========',RoundedMax);

            if(RoundedMax<=100)
                RoundedMax = 100
            else if(RoundedMax<=1000)
                RoundedMax = 1000
            else 
                RoundedMax = 10000


            for(let i=0;i<31;i++)
            {
                StackDataDemo2.push({stacks:[{value: RoundedMax, color: '#ecf4fd', borderRadius:10 }], label:i+1, topLabelComponent: () => <Text style={{ marginTop: -5 }}>{values[i]}</Text> }) 
                TotalTasks = TotalTasks + values[i];
            }

            setStackdata1(StackDataDemo);
            setStackdata2(StackDataDemo2);
            StackDataDemo = [];
            StackDataDemo2 = [];
            setTotal_tasks(TotalTasks)
            TotalTasks=0;
            setRefresh(!refresh)
        }
        else if (index == 7) 
        {
            StackDataDemo = [];
            StackDataDemo2 = [];
            let TempArray = FirebaseTaskArray.filter((task,index)=>task.date.substring(5, 7)==='08');
            console.log('FirebaseTaskArray==========',TempArray);
            TempArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            console.log('Sorted Temp Array==========',TempArray);
            
            for(let i=0;i<31;i++)
            {
                values[i]= TempArray.filter((task, index)=>parseInt(task.date.substring(8, 10))===i+1).length;
                StackDataDemo.push({stacks:[{value: values[i], color: LinearGradientPrimary, borderRadius:10 }]}) 
                
            }
            console.log('Values of Month : ',values);
            console.log('StackDataDemo : ',StackDataDemo);

            const MaxValue = Math.max(...values)
            let RoundedMax = Math.ceil(MaxValue / 10) * 10;
            console.log('RoundedMax========',RoundedMax);

            if(RoundedMax<=100)
                RoundedMax = 100
            else if(RoundedMax<=1000)
                RoundedMax = 1000
            else 
                RoundedMax = 10000


            for(let i=0;i<31;i++)
            {
                StackDataDemo2.push({stacks:[{value: RoundedMax, color: '#ecf4fd', borderRadius:10 }], label:i+1, topLabelComponent: () => <Text style={{ marginTop: -5 }}>{values[i]}</Text> }) 
                TotalTasks = TotalTasks + values[i];
            }

            setStackdata1(StackDataDemo);
            setStackdata2(StackDataDemo2);
            StackDataDemo = [];
            StackDataDemo2 = [];
            setTotal_tasks(TotalTasks)
            TotalTasks=0;
            setRefresh(!refresh)
        }
        else if (index == 8) 
        {
            StackDataDemo = [];
            StackDataDemo2 = [];
            let TempArray = FirebaseTaskArray.filter((task,index)=>task.date.substring(5, 7)==='09');
            console.log('FirebaseTaskArray==========',TempArray);
            TempArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            console.log('Sorted Temp Array==========',TempArray);
            
            for(let i=0;i<30;i++)
            {
                values[i]= TempArray.filter((task, index)=>parseInt(task.date.substring(8, 10))===i+1).length;
                StackDataDemo.push({stacks:[{value: values[i], color: LinearGradientPrimary, borderRadius:10 }]}) 
                
            }
            console.log('Values of Month : ',values);
            console.log('StackDataDemo : ',StackDataDemo);

            const MaxValue = Math.max(...values)
            let RoundedMax = Math.ceil(MaxValue / 10) * 10;
            console.log('RoundedMax========',RoundedMax);

            if(RoundedMax<=100)
                RoundedMax = 100
            else if(RoundedMax<=1000)
                RoundedMax = 1000
            else 
                RoundedMax = 10000


            for(let i=0;i<30;i++)
            {
                StackDataDemo2.push({stacks:[{value: RoundedMax, color: '#ecf4fd', borderRadius:10 }], label:i+1, topLabelComponent: () => <Text style={{ marginTop: -5 }}>{values[i]}</Text> }) 
                TotalTasks = TotalTasks + values[i];
            }

            setStackdata1(StackDataDemo);
            setStackdata2(StackDataDemo2);
            StackDataDemo = [];
            StackDataDemo2 = [];
            setTotal_tasks(TotalTasks)
            TotalTasks=0;
            setRefresh(!refresh)
        }
        else if (index == 9)
        {
            StackDataDemo = [];
            StackDataDemo2 = [];
            let TempArray = FirebaseTaskArray.filter((task,index)=>task.date.substring(5, 7)==='10');
            console.log('FirebaseTaskArray==========',TempArray);
            TempArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            console.log('Sorted Temp Array==========',TempArray);
            
            for(let i=0;i<31;i++)
            {
                values[i]= TempArray.filter((task, index)=>parseInt(task.date.substring(8, 10))===i+1).length;
                StackDataDemo.push({stacks:[{value: values[i], color: LinearGradientPrimary, borderRadius:10 }]}) 
                
            }
            console.log('Values of Month : ',values);
            console.log('StackDataDemo : ',StackDataDemo);

            const MaxValue = Math.max(...values)
            let RoundedMax = Math.ceil(MaxValue / 10) * 10;
            console.log('RoundedMax========',RoundedMax);

            if(RoundedMax<=100)
                RoundedMax = 100
            else if(RoundedMax<=1000)
                RoundedMax = 1000
            else 
                RoundedMax = 10000


            for(let i=0;i<31;i++)
            {
                StackDataDemo2.push({stacks:[{value: RoundedMax, color: '#ecf4fd', borderRadius:10 }], label:i+1, topLabelComponent: () => <Text style={{ marginTop: -5 }}>{values[i]}</Text> }) 
                TotalTasks = TotalTasks + values[i];
            }

            setStackdata1(StackDataDemo);
            setStackdata2(StackDataDemo2);
            StackDataDemo = [];
            StackDataDemo2 = [];
            setTotal_tasks(TotalTasks)
            TotalTasks=0;
            setRefresh(!refresh)

        }
        else if (index == 10) 
        {
            StackDataDemo = [];
            StackDataDemo2 = [];
            let TempArray = FirebaseTaskArray.filter((task,index)=>task.date.substring(5, 7)==='11');
            console.log('FirebaseTaskArray==========',TempArray);
            TempArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            console.log('Sorted Temp Array==========',TempArray);
            
            for(let i=0;i<30;i++)
            {
                values[i]= TempArray.filter((task, index)=>parseInt(task.date.substring(8, 10))===i+1).length;
                StackDataDemo.push({stacks:[{value: values[i], color: LinearGradientPrimary, borderRadius:10 }]}) 
                
            }
            console.log('Values of Month : ',values);
            console.log('StackDataDemo : ',StackDataDemo);

            const MaxValue = Math.max(...values)
            let RoundedMax = Math.ceil(MaxValue / 10) * 10;
            console.log('RoundedMax========',RoundedMax);

            if(RoundedMax<=100)
                RoundedMax = 100
            else if(RoundedMax<=1000)
                RoundedMax = 1000
            else 
                RoundedMax = 10000


            for(let i=0;i<30;i++)
            {
                StackDataDemo2.push({stacks:[{value: RoundedMax, color: '#ecf4fd', borderRadius:10 }], label:i+1, topLabelComponent: () => <Text style={{ marginTop: -5 }}>{values[i]}</Text> }) 
                TotalTasks = TotalTasks + values[i];
            }

            setStackdata1(StackDataDemo);
            setStackdata2(StackDataDemo2);
            StackDataDemo = [];
            StackDataDemo2 = [];
            setTotal_tasks(TotalTasks)
            TotalTasks=0;
            setRefresh(!refresh)
        }
        else 
        {
            StackDataDemo = [];
            StackDataDemo2 = [];
            let TempArray = FirebaseTaskArray.filter((task,index)=>task.date.substring(5, 7)==='12');
            console.log('FirebaseTaskArray==========',TempArray);
            TempArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            console.log('Sorted Temp Array==========',TempArray);
            
            for(let i=0;i<31;i++)
            {
                values[i]= TempArray.filter((task, index)=>parseInt(task.date.substring(8, 10))===i+1).length;
                StackDataDemo.push({stacks:[{value: values[i], color: LinearGradientPrimary, borderRadius:10 }]}) 
                
            }
            console.log('Values of Month : ',values);
            console.log('StackDataDemo : ',StackDataDemo);

            const MaxValue = Math.max(...values)
            let RoundedMax = Math.ceil(MaxValue / 10) * 10;
            console.log('RoundedMax========',RoundedMax);

            if(RoundedMax<=100)
                RoundedMax = 100
            else if(RoundedMax<=1000)
                RoundedMax = 1000
            else 
                RoundedMax = 10000


            for(let i=0;i<31;i++)
            {
                StackDataDemo2.push({stacks:[{value: RoundedMax, color: '#ecf4fd', borderRadius:10 }], label:i+1, topLabelComponent: () => <Text style={{ marginTop: -5 }}>{values[i]}</Text> }) 
                TotalTasks = TotalTasks + values[i];
            }

            setStackdata1(StackDataDemo);
            setStackdata2(StackDataDemo2);
            StackDataDemo = [];
            StackDataDemo2 = [];
            setTotal_tasks(TotalTasks)
            TotalTasks=0;
            setRefresh(!refresh)
        }
    };

    const renderItem = ({ item, index }) => {
        const menuItemStyle = [styles.menuItem];
        const menuTextSyle = [styles.text]
        if (index === selectedIndex) {
            menuItemStyle.push(styles.selectedMenuItem);
            menuTextSyle.push(styles.selectedText)

        }
        return (

            <View style={{ marginRight: 25 }}>
                <TouchableOpacity
                    style={menuItemStyle}
                    onPress={() => handleMenuItemClick(index)}
                >
                    <Text style={menuTextSyle}>{item.text}</Text>
                </TouchableOpacity>
            </View>

        );
    }

    const renderLatestFeatures = ({index, item}) =>
    {
        item.category === 'Design' ? TaskColor='#deebfa' :
        item.category === 'Development' ? TaskColor='#eedcf5' :
        item.category === 'Research' ? TaskColor='#f5e2d7' :
        item.category === 'Testing' ? TaskColor='#d5f7e2' :
        item.category === 'BDE' ? TaskColor='#cecef2' : (null)
        return(  
            <Pressable style={[styles.renderItem,{backgroundColor: TaskColor}]} >
                 <View style={styles.TaskSymbole} >
                        {
                            item.category === 'Design' ? 
                              (TimeColor = '#57b3cf',TaskColor='#deebfa',
                              <View style={[styles.flatlistdesigntask]}>
                                  <Image source={UIDesign2} style={{height:40 , width:40}} />
                                  {/* <Text>Text</Text> */}
                              </View>) : (null)
    
                        }
                        {
                            item.category === 'Development' ? (TimeColor = '#D56AFF',<View style={styles.flatlistdevelopmenttask}><Image source={Development2} style={{ height: 40, width: 40 }} /></View>) : (null)
                        }
                        {
                            item.category === 'Research' ? (TimeColor = '#f7965e',<View style={styles.flatlistresearchtask}><Image source={SearchImage2} style={{ height: 40, width: 40 }} /></View>) : (null)
                        }
                        {
                            item.category === 'Testing' ? (TimeColor = '#0c9441',<View style={styles.flatlisttestingtask}><Image source={Testing2} style={{ height: 40, width: 40 }} /></View>) : (null)
                        }
                        {
                            item.category === 'BDE' ? (TimeColor = '#4646eb',<View style={styles.flatlistbdetask}><Image source={BDEImage2} style={{ height: 40, width: 40 }} resizeMode='cover' /></View>) : (null)
                        }
                    </View>
                <View style={{marginLeft:'4%', width:'50%', height:50}} >
                    <Text style={styles.TaskName} >{item.taskname}</Text>
                    <Text style={[styles.Time,{color:TimeColor}]} >{item.time1} - {item.time2}</Text>
                </View>
                <View style={styles.TaskStatus} >
                    {
                        item.status==='Done' ? <AntIcon name='checkcircle' color={LinearGradientSecondary} size={19}  /> :
                        item.status==='InReview' ? <MaterialIcon name='preview' color={LinearGradientSecondary} size={23} /> :
                        item.status==='Overdue' ? <MaterialIcon name='watch-later' color={LinearGradientSecondary} size={23} /> :
                        <></>
                    }
                </View>
                <View style={{width:'20%', alignItems:'center' }}>
                    <AntIcon name='right' color={grey} size={20} />
                </View>
            </Pressable>
        );
    }

    return (
      <ScrollView contentContainerStyle={{flexGrow:1, borderWidth:1 }} scrollEnabled >
        <View style={{ backgroundColor: containor, flex: 1, }}>

            <View style={{ flexDirection: 'row', marginTop: '12%', alignItems: 'center' }}>
                <AntIcon name="left" size={20} style={{ marginLeft: '10%' }} onPress={back} />
                <Text style={styles.heading}>Statistics</Text>
            </View>
            <Text style={styles.text1}>{total_tasks} Tasks</Text>
            <Text style={styles.text2}>Assigned to you this Month</Text>



            <View style={styles.flatlistview}>

                <FlatList
                    //scrollEnabled={true}
                    data={MENU_ITEMS}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    
                //pagingEnabled={false}
                //disableVirtualization={true}

                />

            </View>

            <View style={styles.statisticsview}>
                <Text style={styles.text3}>Statistics</Text>
            </View>
            
                <View style={styles.graphview}>
                <ScrollView horizontal contentContainerStyle={{ flexGrow:1,marginLeft:'-13%'}} showsHorizontalScrollIndicator={false} >
                    <View>
                        <BarChart
                            //data={data}
                            stackData={stackdata2}
                            xAxisThickness={0}
                            yAxisThickness={0}
                            hideYAxisText={true}
                            //barBorderRadius={10}
                            disableScroll={true}
                            barWidth={19}
                            spacing={32}
                            hideRules={true}
                            
                        />
                    </View>
                    <View style={{position:'absolute'}} >
                        <BarChart
                            //data={data}
                            stackData={stackdata1}
                            xAxisThickness={0}
                            yAxisThickness={0}
                            hideYAxisText={true}
                            //barBorderRadius={10}
                            disableScroll={true}
                            barWidth={19}
                            spacing={32}
                            hideRules={true}
                            
                        />
                    </View>
                    </ScrollView>
                </View>

            <Text style={styles.latestactivitiestext}>Latest Activities</Text>
            <View style={styles.LatestFeatures} >
                <FlatList
                    data={ LatestFeatures.filter((task,index) => task.status==='Done' ) }
                    renderItem={({index, item}) => renderLatestFeatures({index, item})}
                    keyExtractor={item => item.id}
                    extraData={LatestFeatures.filter((task,index) => task.status==='Done' )}
                    scrollEnabled={false}
                />
            </View>
        </View>
      </ScrollView>  
    )
}
export default Statistics;
