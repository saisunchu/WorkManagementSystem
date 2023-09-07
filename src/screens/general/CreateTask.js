import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, BackHandler, TouchableOpacity, Image, ScrollView, Pressable, Alert } from 'react-native';
import DatePicker from 'react-native-neat-date-picker'
import { Calendar_Icon } from "../../assets/assets";
import DatePicker1 from 'react-native-date-picker';
import DatePicker2 from 'react-native-date-picker';
import AntIcon from "react-native-vector-icons/AntDesign";
import AntIcon1 from "react-native-vector-icons/AntDesign";
import MyButton from "../../shared/Button/MyButton";
import { black, grey, red, transparent, white } from "../../assets/colors";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { notificationStore, taskDetails, taskID } from "../../actions/Actions";
import { addTasks, getTasks } from "../../FirebaseAction";
import { RFValue } from "react-native-responsive-fontsize";
import messaging from '@react-native-firebase/messaging';
import axios from "axios";
import { addNotifications, getNotifications } from "../../FirebaseAction/Notifications";


let TaskData = [

]
let FirebaseTaskArray = []

Text.defaultProps = {
    style: { color: grey },
};


const CreateTask = () => {
    const [id, setId] = useState(0);
    const [taskname, setTaskname] = useState('');
    const [category, setCategory] = useState('Design');
    const [description, setDescription] = useState('');
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const navigation = useNavigation();
    const Dispatch = useDispatch();
    const StateData = useSelector((state) => state.Reducers)

    const [but1color, setbut1color] = useState('#0082E1')
    const [text1, settext1] = useState('white')
    const [but2color, setbut2color] = useState('#ecf4fd')
    const [text2, settext2] = useState('black')
    const [but3color, setbut3color] = useState('#ecf4fd')
    const [text3, settext3] = useState('black')
    const [but4color, setbut4color] = useState('#ecf4fd')
    const [text4, settext4] = useState('black')
    const [but5color, setbut5color] = useState('#ecf4fd')
    const [text5, settext5] = useState('black')


     messaging().getToken().then((token) => {
        console.log('FCM token:', token);
        global.Token = token;
        
    });
    console.log('FCM Global token Type:', typeof(global.Token) );
    

    const changebutton2 = () => {
        setbut2color('#0082E1')
        settext2('white')
        setbut1color('#ecf4fd')
        settext1('black')
        setbut3color('#ecf4fd')
        settext3('black')
        setbut4color('#ecf4fd')
        settext4('black')
        setbut5color('#ecf4fd')
        settext5('black')
        setCategory('Development')
    }
    const changebutton3 = () => {
        setbut3color('#0082E1')
        settext3('white')
        setbut1color('#ecf4fd')
        settext1('black')
        setbut2color('#ecf4fd')
        settext2('black')
        setbut4color('#ecf4fd')
        settext4('black')
        setbut5color('#ecf4fd')
        settext5('black')
        setCategory('Research')
    }
    const changebutton1 = () => {
        setbut1color('#0082E1')
        settext1('white')
        setbut2color('#ecf4fd')
        settext2('black')
        setbut3color('#ecf4fd')
        settext3('black')
        setbut4color('#ecf4fd')
        settext4('black')
        setbut5color('#ecf4fd')
        settext5('black')
        setCategory('Design')
    }
    const changebutton4 = () => {
        setbut4color('#0082E1')
        settext4('white')
        setbut2color('#ecf4fd')
        settext2('black')
        setbut3color('#ecf4fd')
        settext3('black')
        setbut1color('#ecf4fd')
        settext1('black')
        setbut5color('#ecf4fd')
        settext5('black')
        setCategory('Testing')
    }
    const changebutton5 = () => {
        setbut5color('#0082E1')
        settext5('white')
        setbut2color('#ecf4fd')
        settext2('black')
        setbut3color('#ecf4fd')
        settext3('black')
        setbut1color('#ecf4fd')
        settext1('black')
        setbut4color('#ecf4fd')
        settext4('black')
        setCategory('BDE')
    }

    // const today = new Date();
    // const options2 = { day: 'numeric', month: 'short',};
    // const options3 = { weekday:'long'};
    // const formattedDate = today.toLocaleDateString('en-US', options2)+', '+today.toLocaleDateString('en-US',options3);
    // console.log(formattedDate);

    const today = new Date();
 
    const todayDateString = today.toLocaleDateString('zh-CN', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-');
    console.log(todayDateString)
    const options2 = { day: 'numeric', month: 'long', };
    // const formattedDate = today.toLocaleDateString('en-US', options2) + ', ' + today.toLocaleDateString('en-US', { weekday: 'long' });
    const Datestring2 = today.toLocaleDateString('en-AU', { weekday: 'long' });
    const index = Datestring2.indexOf(",");
    const formattedDate = today.toLocaleDateString('en-AU', options2) + ', ' + Datestring2.substring(0, index);

    console.log(formattedDate);


    const [showDatePickerSingle, setShowDatePickerSingle] = useState(false)
    const [date, setDate] = useState(formattedDate);
    const [dateshare, setDateshare] = useState(todayDateString);
    const openDatePickerSingle = () => setShowDatePickerSingle(true)
    const onCancelSingle = () => {

        setShowDatePickerSingle(false)
    }
    const onConfirmSingle = (output) => {

        setShowDatePickerSingle(false)

        // console.log('====================================');
        // console.log(new Date());
        // console.log(output);
        // console.log('====================================');

        const options2 = { day: 'numeric', month: 'long', };
        const Datestring2 = output.date.toLocaleDateString('en-AU', { weekday: 'long' });
        const index = Datestring2.indexOf(",");
        const formattedDate = output.date.toLocaleDateString('en-AU', options2) + ', ' + Datestring2.substring(0, index);

        console.log(formattedDate)
        setDateshare(output.dateString)
        setDate(formattedDate)
    }
    const [time1, setTime1] = useState(new Date())
    const [open1, setOpen1] = useState(false)

    const [time2, setTime2] = useState(new Date())
    const [open2, setOpen2] = useState(false)

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

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
        );
        HideBottomTab();
        return () => backHandler.remove();
    }, []);

    function objectToArray(obj) {
        const result = [];
        // console.log('Arraaayyyy result =====', result );
        Object.values(obj).forEach(function (subObj) {
            result.push(subObj);
        });
        console.log('Arraaayyyy result =====', result);
        return result;
    }

    const fetchTasks = async () => {
        const DataTasks = await getTasks();
        console.log('------------------------------------------------------DataTasks:', DataTasks);
        FirebaseTaskArray = objectToArray(DataTasks);
        console.log('------------------------------------------------------FirebaseTaskArray:', FirebaseTaskArray);
        Dispatch(taskDetails(FirebaseTaskArray))
        // console.log('=====StateData.TaskDetailsArr : ',StateData.TaskDetailsArr);
        // filteredData = StateData.TaskDetailsArr;
        // console.log('=====filteredData : ',filteredData);
    }

    const TaskComplete = async () => {
        if(taskname==''){
            alert('TaskName cannot be null')
        }
        else{
        await fetchTasks();
        console.log('Inside TaskComplete======');
        let startTime = time1.toLocaleTimeString([], options)
        let endTime = time2.toLocaleTimeString([], options)
        const stateID = FirebaseTaskArray.length;
        console.log('=============stateID:', stateID);
        // setId(stateID)
        // console.log('=======StateData.id:',StateData.id);
        // console.log('StateData.TaskDetailsArr--------',StateData.TaskDetailsArr);
        console.log('FirebaseTaskArray--------', FirebaseTaskArray);
        // TaskData = StateData.TaskDetailsArr;
        TaskData = FirebaseTaskArray;
        TaskData.push({ id: stateID, taskname: taskname, category: category, date: dateshare, time1: startTime, time2: endTime, description: description, comments: [], status: '' })
        // setId(id+1)
        console.log('=================TaskData===================');
        console.log(TaskData);
        console.log('====================================');
        Dispatch(taskDetails(TaskData));
        // Dispatch(taskID(id))

        // const object = StateData.TaskDetailsArr.reduce((acc, curr) => {
        //     acc[curr.id] = curr;
        //     return acc;
        // }, {});
        const object = TaskData.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});
        addTasks('TaskDetails', object)

        

        const data = {
            to: global.Token ,
            notification: {
              title: taskname,
              body: 'New Task Created'
            }
          };
        

        PushNot(data)

        navigation.navigate('Home')

    }

    const PushNot = async (data) =>
    {
      console.log('Inside PushNot- data :',data);
      axios.post('https://fcm.googleapis.com/fcm/send', data, {
        headers: {
          Authorization: 'key=AAAAS16eIb4:APA91bGHAheMFW-2GTC9O5f355U2aTplgYRzEwftJjJZRHnr-7S-nJ24TSO1xeb3ai7C_TN2GjRHaNno2AGAcQJeOSYi3Qh8cO0pG1Va1rhpie6wqE7Eb_zDiWE0BA_GrXt7IUGYzv_U',
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log('Notification sent:', response.data);
      }).catch(error => {
        console.error('Notification error:', error);
      });
    
      const fetchNotifications = async () =>
      {
          const Notifications = await getNotifications(); 
          // console.log('------------------------------------------------------DataTasks:',DataTasks);
          const FirebaseTaskArray = objectToArray(Notifications);
          // console.log('------------------------------------------------------FirebaseTaskArray:',FirebaseTaskArray);
          global.notifications = FirebaseTaskArray;
          console.log('=====global.notifications CreateTask : ',global.notifications);
          
        //   Dispatch(notificationStore(global.notifications))
          
      }
      await fetchNotifications();


      global.notifications.push({ id: global.notifications.length, title: data.notification.title, body: data.notification.body, userPhoto: global.UserPhoto })
      console.log('====================================');
      console.log('global.Notifications - ', global.notifications);
      console.log('====================================');

      const object = global.notifications.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});

      console.log('Notifications Object=====',object);
      addNotifications('Notifications', object)
      
    //   Dispatch(notificationStore(global.notifications))



    //   const object = global.notifications.reduce((acc, curr) => {
    //     acc[curr.id] = curr;
    //     return acc;
    //   }, {});

    //   console.log('Notifications Object=====',object);
    //   addNotifications('Notifications', object)


    }

    const handleBackPress = () => {
        // Handle the back button press here
        console.log('=======handleBackPress');
        ShowBottomTab();
        navigation.goBack();
        return true; // Return true to prevent default behavior (exit app)
    };
    const Back = () => {
        console.log('inside back')
        navigation.goBack()
    }

    return (

        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: white, paddingBottom: '7%' }}>

            <View style={{ flexDirection: 'row', marginTop: '12%', alignItems: 'center', width: '100%' }}>
           
                    <AntIcon1 name="left" size={25}  color={grey} onPress={Back} style={{marginLeft:'10%'}} />
               
               
                    <Text style={styles.text}>Create New Task</Text>
               

            </View>

            <Text style={styles.text2}>Task Name</Text>
            <TextInput placeholderTextColor={grey} placeholder="Enter Task Name" style={[styles.textinput, { color: grey }]} onChangeText={(input) => setTaskname(input)} maxLength={20} />
            <Text style={styles.text2}>Category</Text>
            <View style={styles.butview}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <TouchableOpacity style={{ height: 40, width: 90, backgroundColor: but1color, alignItems: 'center', justifyContent: 'center', borderRadius: 9 }} onPress={changebutton1} >
                        <Text style={{ color: text1 }}>Design</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 40, width: 130, marginLeft: 15, backgroundColor: but2color, alignItems: 'center', justifyContent: 'center', borderRadius: 9 }} onPress={changebutton2} >
                        <Text style={{ color: text2 }}>Development</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 40, width: 100, marginLeft: 15, backgroundColor: but3color, alignItems: 'center', justifyContent: 'center', borderRadius: 9 }} onPress={changebutton3} >
                        <Text style={{ color: text3 }}>Research</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 40, width: 100, marginLeft: 15, backgroundColor: but4color, alignItems: 'center', justifyContent: 'center', borderRadius: 9 }} onPress={changebutton4} >
                        <Text style={{ color: text4 }}>Testing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 40, width: 100, marginLeft: 15, backgroundColor: but5color, alignItems: 'center', justifyContent: 'center', borderRadius: 9 }} onPress={changebutton5} >
                        <Text style={{ color: text5 }}>BDE</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <Text style={[styles.text2, { width: '40%' }]}>Date & Time</Text>
            <DatePicker
                isVisible={showDatePickerSingle}
                mode={'single'}
                onCancel={onCancelSingle}
                onConfirm={onConfirmSingle}
            // dateStringFormat=
            />
            <View style={styles.calview}>
                <Text style={styles.caltext}>{date}</Text>

                <TouchableOpacity onPress={openDatePickerSingle} style={[styles.calicon,]} >
                    <View style={styles.calendaricon}>
                    <Image source={Calendar_Icon} style={{ height: 27, width: 27 }} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.text2}>Start time</Text>
                <Text style={styles.endtime}>End time</Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <View style={styles.starttimeview}>
                    <Text style={{ marginLeft: 5, color: grey, width: '55%' }}> {`${time1.toLocaleTimeString([], options).toUpperCase()}`}</Text>
                    <View style={{ width: '50%', alignItems: 'flex-end', paddingRight: '29%' }} >
                        <AntIcon name='down' size={20} style={{ color: "#0082E1" }} onPress={() => setOpen1(true)} />
                    </View>
                </View>
                <View style={styles.starttimeview}>
                    <Text style={{ marginLeft: 5, color: grey, width: '55%' }} > {`${time2.toLocaleTimeString([], options).toUpperCase()}`}</Text>
                    <View style={{ width: '50%', alignItems: 'flex-end', paddingRight: '29%' }} >
                        <AntIcon name='down' size={20} style={{ color: "#0082E1" }} onPress={() => setOpen2(true)} />
                    </View>
                </View>
            </View>
            <DatePicker1
                modal
                mode="time"
                open={open1}
                date={time1}

                onConfirm={(date) => {
                    setOpen1(false)
                    setTime1(date)
                }}
                onCancel={() => {
                    setOpen1(false)
                }}
            />
            <DatePicker2
                modal
                mode="time"
                open={open2}
                date={time2}

                onConfirm={(date) => {
                    setOpen2(false)
                    setTime2(date)

                }}
                onCancel={() => {
                    setOpen2(false)
                }}
            />
            <Text style={styles.text2}>Description</Text>
            <TextInput style={styles.textinput2} placeholderTextColor={grey} placeholder='Research design paths. There are many ways.' multiline={true} onChangeText={(input) => setDescription(input)} maxLength={100}/>
            <View style={styles.lastbutview} >
                <MyButton text={`Create Task`} onPress={TaskComplete} />
            </View>

        </ScrollView>

    )
}
export default CreateTask;
const styles = StyleSheet.create({
    mainview: {

        flex: 1
    },
    text: {
        color: 'black',
        // alignSelf:'center',
        // paddingLeft:'18%',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft:'13%'
        // borderWidth:1,
        // width: '100%',
    },
    text2: {
        marginLeft: '8%',
        fontSize: 20,
        marginTop: 30,
        color: 'black',
        fontWeight: 'bold',
        width: '38%',
        // borderWidth:1,
    },
    textinput: {
        width: '85%',
        borderWidth: 1,
        marginLeft: '8%',
        borderRadius: 12,
        borderColor: 'grey',
        marginTop: 15,
        paddingLeft: 12
    },
    butview: {
        flexDirection: 'row',
        marginLeft: '8%',
        marginTop: 15,
        width: '85%',
    },
    calview: {
        flexDirection: 'row',
        marginLeft: '8%',
        width: '85%',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 12,
        height: 50,
        marginTop: 15,
        overflow: 'hidden',
    },
    caltext: {
        marginLeft: 10,
        marginTop: 12,
        fontSize: RFValue(15),
        width: '65%',
        color: grey,
        // borderWidth:1,
    },
    calicon: {
        // position: 'absolute',
        // marginLeft: '88%'
        // alignSelf:'flex-end',
        // marginLeft:'55%',
        flexDirection: 'row',
        width: '30%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    starttimeview: {
        flexDirection: 'row',
        marginLeft: '8%',
        borderWidth: 1,
        width: '38%',
        height: 50,
        borderRadius: 12,
        borderColor: 'grey',
        alignItems: 'center',

    },
    endtime: {
        // marginLeft: '22%',
        fontSize: 20,
        marginTop: 30,
        color: 'black',
        fontWeight: 'bold',
        marginLeft: '8%',
        width: '38%',
    },
    textinput2: {
        width: '85%',
        borderWidth: 1,
        marginLeft: '8%',
        borderRadius: 12,
        borderColor: 'grey',
        marginTop: 15,
        paddingLeft: 12,
        height: 80
    },
    lastbutview: {
        height: 55,
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '5%',
    },
    calendaricon:{
        height:37,
        width:37,
        backgroundColor:'#ecf4fd',
        justifyContent:'center',
        alignItems:"center",
        borderRadius:20
    }

})