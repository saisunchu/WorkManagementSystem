import React, { useEffect, useState } from "react";
import { View, Text, TouchableHighlight, TouchableOpacity, ScrollView, ProgressBarAndroidBase, FlatList, Image, Pressable, ImageBackground, ActivityIndicator,BackHandler,Alert } from "react-native";
import styles from "./Styles";
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import { ButtonPrimary, LinearGradientPrimary, LinearGradientSecondary, Secondary, grey, transparent, white } from "../../../assets/colors";
import LinearGradient from "react-native-linear-gradient";
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import * as Progress from 'react-native-progress';
import { BDEImage, DefaultProfileImage, LinearGradient_BCK, User1, User2, User3, UIDesign2, BDEImage2, Testing2, SearchImage2, Development2, NoTask, NoTask2 } from "../../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../FirebaseAction";
import { notificationStore, taskDetails, taskID } from "../../../actions/Actions";
import auth from '@react-native-firebase/auth';
import { RFValue } from "react-native-responsive-fontsize";
import FastImage from "react-native-fast-image";
import { getNotifications } from "../../../FirebaseAction/Notifications";


// let TaskDataHome = [
//     {   id:0, taskname:'UI Design', category:'Design', status:'Done', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
//         Description: 'Research design paths. There are many career paths within the field of design...'
//     },
//     {   id:1, taskname:'UI Design', category:'Design', status:'Done', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
//         Description: 'Research design paths. There are many career paths within the field of design...'
//     },
//     {   id:2, taskname:'UI Design', category:'Design', status:'Done', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
//         Description: 'Research design paths. There are many career paths within the field of design...'
//     },
//     {   id:3, taskname:'UI Design', category:'Design', status:'Pending', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
//         Description: 'Research design paths. There are many career paths within the field of design...'
//     },
//     {   id:4, taskname:'UI Design', category:'Design', status:'Pending', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
//         Description: 'Research design paths. There are many career paths within the field of design...'
//     },
//     {   id:5, taskname:'UI Design', category:'Design', status:'Done', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
//         Description: 'Research design paths. There are many career paths within the field of design...'
//     },
//     {   id:6, taskname:'UI Design', category:'Design', status:'Done', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
//         Description: 'Research design paths. There are many career paths within the field of design...'
//     },
//     {   id:7, taskname:'UI Design', category:'Design', status:'Done', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
//         Description: 'Research design paths. There are many career paths within the field of design...'
//     },
//     {   id:8, taskname:'UI Design', category:'Design', status:'Pending', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
//         Description: 'Research design paths. There are many career paths within the field of design...'
//     },
//     {   id:9, taskname:'UI Design', category:'Design', status:'Pending', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
//         Description: 'Research design paths. There are many career paths within the field of design...'
//     }
// ]
let TaskDataHome = [];
let filteredData = [];
global.notifications = [];

const Home = ({ navigation }) => {
    const [id, setId] = useState(0);
    const [zVal, setzVal] = useState(0);
    const [f, setF] = useState(false);
    const [f2, setF2] = useState(false);
    const [MarkAsDoneColor, setMarkAsDoneColor] = useState(white);
    const [PendingTaskColor, setPendingTaskColor] = useState(white);
    const [ViewAllColor, setViewAllColor] = useState(white);
    const [render,setRender] = useState(true)
    const [color, setcolor] = useState('white')
    const [toggle,settoggle] = useState(true)
    const [todaytask,settodaytask]=useState(0)
    const Dispatch = useDispatch();
    const StateData = useSelector((state) => state.Reducers)

    const today = new Date();
    const todayDateString = today.toLocaleDateString('zh-CN', {day:'2-digit', month:'2-digit', year:'numeric'}).split('/').join('-');
   
    function objectToArray(obj) {
        const result = [];
        // console.log('Arraaayyyy result =====', result );
        Object.values(obj).forEach(function (subObj) {
            result.push(subObj);
        });
        console.log('Arraaayyyy result =====', result);
        return result;
    }
           

    // filteredData=objectToArray(TaskDataHome);
    // console.log('=====StateData.TaskDetailsArr : ',StateData.TaskDetailsArr);
    // console.log('=====filteredData : ', filteredData);
    console.log('=====StateData.TaskDetailsArr : ', StateData.TaskDetailsArr);
    filteredData = StateData.TaskDetailsArr;
    console.log('=====filteredData : ', filteredData);
    const temp2=filteredData.length
    console.log(temp2,'\\\\\\\\\\')

    const TodayTaskScreen = () =>
    {
        const TodayTaskData = filteredData.filter((task,index)=> task.date===todayDateString );
        console.log('TodayTaskData=======',TodayTaskData);
        // const temp= TodayTaskData.length
        // console.log(temp,'+++++++++++++++')
        // settodaytask(temp)
        // navigation.navigate('TodayTask',{ TodayTaskData });
        navigation.navigate('TodayTask');
        // navigation.replace('TodayTask',{ TodayTaskData });
    }

    const Filter = () => {
        console.log('Inside Filter Fn');
        setF(true)
    }
    const MarkAsDone = () =>
    {
        console.log('--------------------------------------------Mark as Done----------------------------------------------');
        setMarkAsDoneColor(LinearGradientSecondary)
        setViewAllColor(white)
        setPendingTaskColor(white)
        console.log('TaskDataHome - ', TaskDataHome);
        Dispatch(taskDetails(TaskDataHome));
        console.log('====================================');
        console.log('FilteredData - ', filteredData);
        console.log('TaskDataHome - ', TaskDataHome);
        console.log('====================================');
        filteredData = TaskDataHome.filter(task => task.status === 'Done');
        Dispatch(taskDetails(filteredData));
        console.log('Filtered Data - Mark as Done - ', filteredData);
        setF(false)
        // compressedData = filteredData;
    }
    const PendingTask = () =>
    {
        console.log('-----------------------------------------Pending Task-------------------------------------------------');
        Dispatch(taskDetails(TaskDataHome));   
        setPendingTaskColor(LinearGradientSecondary)
        setViewAllColor(white)
        setMarkAsDoneColor(white)
        setF(false)
        filteredData = TaskDataHome.filter(task => task.status === 'Overdue' || task.status === '');
        Dispatch(taskDetails(filteredData));
        // compressedData = filteredData;
    }
    const ViewAll = () =>
    {
        console.log('--------------------------------------------View ALl----------------------------------------------');
        Dispatch(taskDetails(TaskDataHome));   
        setViewAllColor(LinearGradientSecondary)
        setPendingTaskColor(white)
        setMarkAsDoneColor(white)
        setF(false)
        filteredData = TaskDataHome;
        Dispatch(taskDetails(filteredData));
        // compressedData = filteredData;
    }
    const closeindicator = () =>{
        setTimeout(() => {
            settoggle(false)
        }, 2000);
    }

    const renderItem = ({ index, item }) => {
        // console.log('{Item}=======', item);
        const GoTaskDetails = () =>
        {
            navigation.navigate('TaskDetail',{ item, prevScreen:'Home',});
        }

        console.log('=================Item===================');
        console.log(index);
        console.log('====================================');

        if (index > 4) {
            return null;
        }

        return (
            <Pressable style={styles.renderItem} onPress={GoTaskDetails} >
                <View style={styles.TaskSymbole} >
                    {
                        item.category === 'Design' ? (<View style={styles.flatlistdesigntask}><FastImage source={UIDesign2} style={styles.flatlisticonstyle} /></View>) : (null)

                    }
                    {
                        item.category === 'Development' ? (<View style={styles.flatlistdevelopmenttask}><FastImage source={Development2} style={styles.flatlisticonstyle} /></View>) : (null)
                    }
                    {
                        item.category === 'Research' ? (<View style={styles.flatlistresearchtask}><FastImage source={SearchImage2} style={styles.flatlisticonstyle} /></View>) : (null)
                    }
                    {
                        item.category === 'Testing' ? (<View style={styles.flatlisttestingtask}><FastImage source={Testing2} style={styles.flatlisticonstyle} /></View>) : (null)
                    }
                    {
                        item.category === 'BDE' ? (<View style={styles.flatlistbdetask}><FastImage source={BDEImage2} style={styles.flatlisticonstyle} resizeMode='cover' /></View>) : (null)
                    }
                </View>

                <View style={{ marginLeft: '4%', width: '50%', height:50,justifyContent:'center'}} >
                    <Text style={styles.TaskName} >{item.taskname}</Text>
                    <Text style={styles.Time} >{item.time1} - {item.time2}</Text>
                </View>

                <View style={styles.TaskStatus} >
                    {
                        item.status === 'Done' ? <AntIcon name='checkcircle' color={LinearGradientSecondary} size={19} /> :
                            item.status === 'InReview' ? <MaterialIcon name='preview' color={LinearGradientSecondary} size={23} /> :
                                item.status === 'Overdue' ? <MaterialIcon name='watch-later' color={LinearGradientSecondary} size={23} /> :
                                    <></>
                    }
                </View>
                <View style={{ width: '20%', alignItems: 'center' }}>
                    <AntIcon name='right' color={grey} size={20} />
                </View>
            </Pressable>
        );
    }

    useEffect(()=>{


        console.log('Home - UseEffect Called-------',true);

        setF2(true);
        const fetchTasks = async () =>
        {
            const DataTasks = await getTasks();
            // console.log('------------------------------------------------------DataTasks:',DataTasks);
            const FirebaseTaskArray = objectToArray(DataTasks);
            // console.log('------------------------------------------------------FirebaseTaskArray:',FirebaseTaskArray);
            filteredData = FirebaseTaskArray;
            console.log('=====filteredData UseEffect : ',filteredData);
            TaskDataHome = filteredData;
            Dispatch(taskDetails(FirebaseTaskArray))
            // setFilterFlag(true);
            // console.log('=====StateData.TaskDetailsArr : ',StateData.TaskDetailsArr);
            
            
        }
        fetchTasks();

        const fetchNotifications = async () =>
        {
            const Notifications = await getNotifications();
            // console.log('------------------------------------------------------DataTasks:',DataTasks);
            const FirebaseTaskArray = objectToArray(Notifications);
            // console.log('------------------------------------------------------FirebaseTaskArray:',FirebaseTaskArray);
            global.notifications = FirebaseTaskArray;
            console.log('=====global.notifications UseEffect : ',global.notifications);
            
            // Dispatch(notificationStore(global.notifications))
            
        }
        fetchNotifications();


        console.log('filteredData.length========',filteredData.length);
        Dispatch(taskID(filteredData.length))

        const UserPhotoUpdate = async () =>
        {
            console.log('auth().currentUser.photoURL===========',auth().currentUser.photoURL);
            if(auth().currentUser.photoURL)
            {
                global.UserPhoto = auth().currentUser.photoURL;
                global.UserName = auth().currentUser.displayName;
                console.log('====================================IF Executed -  auth().currentUser.photoURL:::',auth().currentUser.photoURL,auth().currentUser.displayName);
            }
            else
            {
                await auth().currentUser.updateProfile({photoURL: Image.resolveAssetSource(DefaultProfileImage).uri});
                console.log('====================================');
                console.log(auth().currentUser.photoURL);
                console.log('====================================');
                global.UserPhoto = auth().currentUser.photoURL;
            }
        }

        UserPhotoUpdate();
        


        return () => {
            // Component will unmount
            // Perform cleanup operations here
            console.log('filteredData.length========',filteredData.length);
            Dispatch(taskID(filteredData.length))
          };
    },[render]);


    useEffect(()=>{

       
        console.log('Home - UseEffect Called-------++++++++',true);
        

        setF2(true);
        const fetchTasks = async () => {
            const DataTasks = await getTasks();
            // console.log('------------------------------------------------------DataTasks:',DataTasks);
            const FirebaseTaskArray = objectToArray(DataTasks);
            // console.log('------------------------------------------------------FirebaseTaskArray:',FirebaseTaskArray);
            Dispatch(taskDetails(FirebaseTaskArray))
            // setFilterFlag(true);
            // console.log('=====StateData.TaskDetailsArr : ',StateData.TaskDetailsArr);
            filteredData = FirebaseTaskArray;
            console.log('=====filteredData UseEffect : ',filteredData);
            const temp=filteredData.filter((task, index) => task.date === todayDateString)
            const temp2=temp.length
            settodaytask(temp2)
            console.log(temp2,'+++++++++++++')
            TaskDataHome = filteredData;
            // console.log('=====filteredData : ',filteredData);
        }
        fetchTasks();
        console.log('filteredData.length========', filteredData.length);
        Dispatch(taskID(filteredData.length))
      

        const UserPhotoUpdate = async () => {
            console.log('auth().currentUser.photoURL===========', auth().currentUser.photoURL);
            if (auth().currentUser.photoURL) {
                global.UserPhoto = auth().currentUser.photoURL;
                global.UserName = auth().currentUser.displayName;
                console.log('====================================IF Executed -  auth().currentUser.photoURL:::', auth().currentUser.photoURL, auth().currentUser.displayName);
            }
            else {
                await auth().currentUser.updateProfile({ photoURL: Image.resolveAssetSource(DefaultProfileImage).uri });
                console.log('====================================');
                console.log(auth().currentUser.photoURL);
                console.log('====================================');
                global.UserPhoto = auth().currentUser.photoURL;
            }
        }

        UserPhotoUpdate();
        closeindicator()
       

        return () => {
            // Component will unmount
            // Perform cleanup operations here
            console.log('filteredData.length========', filteredData.length);
            Dispatch(taskID(filteredData.length))
          };
     
          
    },[]);


    if (f2 === true) {
        return (
            <View style={styles.containor}>

                <View style={styles.HeaderHomePageView}>
                    <Text style={styles.HeaderTextHomePage} >Homepage</Text>
                    <Pressable style={styles.FilterIcon} onPress={Filter} >
                        <IoniconsIcon name='filter' size={28} color={grey} />
                    </Pressable>
                </View>
                <View style={styles.ProgressSummary}>
                    {/* <LinearGradient start={{x:0,y:0}} end={{x:1, y:0}} colors={[LinearGradientSecondary,LinearGradientPrimary]} style={styles.LinearGradient} > */}
                    {/* <ImageBackground source={LinearGradient_BCK} imageStyle={styles.LinearGradient} style={{height:'100%', width:'100%',}} > */}
                    <FastImage source={LinearGradient_BCK} style={{ height: '100%', width: '100%', borderRadius: 20 }}>
                        <View style={{ height: '100%', width: '100%', padding: '8%' }} >
                            <Text style={styles.ProgressHeaderText} >Today's progress summary</Text>
                            <Text style={styles.ProgressText} >{todaytask} Tasks</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.MembersView} horizontal={true} >
                                    {/* <Pressable style={styles.ProgressPlusIcon} onPress={AddMembers} >
                                        <AntIcon name='plus' size={40} color={ButtonPrimary} />
                                    </Pressable> */}

                                    <View style={[styles.MemberIcon, { marginRight: '-20%', zIndex: 1 }]} >
                                        <Image source={User1} style={{ height: '100%', width: '100%' }} ></Image>
                                    </View>
                                    <View style={[styles.MemberIcon, { marginRight: '-20%', zIndex: 0 }]} >
                                        <Image source={User2} style={{ height: '100%', width: '100%' }} ></Image>
                                    </View>
                                    <View style={[styles.MemberIcon, { marginRight: '-20%', zIndex: -1 }]} >
                                        <Image source={User3} style={{ height: '100%', width: '100%' }} ></Image>
                                    </View>

                                </View>
                                <View style={styles.ProgressBar} >
                                    <View style={{ flexDirection: 'row', width: 110, justifyContent: 'space-between' }}>
                                        <Text style={styles.ProgressBarText} >Progress</Text>
                                        <Text style={styles.ProgressBarPercentage} >40%</Text>
                                    </View>
                                    <Progress.Bar progress={0.4} width={110}
                                        color={white} Text={'Progress'} unfilledColor={'#5FA6DA'}
                                        borderWidth={0} height={8}
                                    />
                                </View>
                            </View>
                        </View>
                    </FastImage>
                    {/* </ImageBackground> */}
                    {/* </LinearGradient> */}
                </View>
                <View style={styles.TodayTask}>
                    <Text style={styles.TodayTaskText} >Today's Task </Text>
                    <Text onPress={TodayTaskScreen} style={{ color: grey, fontSize: RFValue(13) }} >See All</Text>
                </View>
                <View style={styles.TaskFlatListView}>
                    {toggle==true ?
                    (
                        <ActivityIndicator size='large' color='#0082E1' />
                    ):(
                    
                        
                        filteredData.length === 0
                            ?  
                              <View style={styles.NoTaskView} >
                                 <FastImage source={NoTask2}  style={styles.NoTaskImage}/>
                                 <Text style={styles.NoTaskText} >No Tasks</Text>
                              </View>
                            :
                            <FlatList
                                // data={ filteredData.filter((task,index)=> task.date===todayDateString && (index < 5) ) }
                                data={filteredData.filter((task, index) => task.date === todayDateString)}
                                // data={ filteredData }
                                renderItem={({ index, item }) => renderItem({ index, item })}
                                keyExtractor={item => item.id}
                                // extraData={ filteredData.filter((task,index)=> task.date===todayDateString && index < 5) }
                                extraData={filteredData.filter((task, index) => task.date === todayDateString)}
                                showsVerticalScrollIndicator={false}
                            // extraData={ filteredData }
                            />

                       
                    )
                }

                    {/* <FlatList
                data={ filteredData.filter((task,index)=>index < 5) }
                // data={ filteredData }
                renderItem={({index,item})=>renderItem({index,item})}
                keyExtractor={ item=> item.id }
                extraData={ filteredData.filter((task,index)=>index < 5) }
                // extraData={ filteredData }
                /> */}

                </View>
                {
                    f == true &&
                    <Pressable style={styles.FilterScreenContainor} onPress={() => setF(false)} >
                        <View style={styles.FilterScreen} >
                            <Pressable style={[styles.FilterScreenField, { backgroundColor: MarkAsDoneColor }]} onPress={MarkAsDone} >
                                <Text style={styles.FilterScreenFieldText}>Mark as Done</Text>
                            </Pressable>
                            <Pressable style={[styles.FilterScreenField, { backgroundColor: PendingTaskColor }]} onPress={PendingTask}>
                                <Text style={styles.FilterScreenFieldText}>Pending Task</Text>
                            </Pressable>
                            <Pressable style={[styles.FilterScreenField, { backgroundColor: ViewAllColor }]} onPress={ViewAll}>
                                <Text style={styles.FilterScreenFieldText}>View All</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                }
            </View>
        )
    }
}
export default Home;
