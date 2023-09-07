import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity,TextInput, BackHandler, Pressable, Share, Dimensions } from 'react-native';
import AntIcon from "react-native-vector-icons/Ionicons";
import AntIcon1 from "react-native-vector-icons/Ionicons";
import AntIcon2 from "react-native-vector-icons/AntDesign";
import AntIcon3 from "react-native-vector-icons/AntDesign";
import AntIcon4 from "react-native-vector-icons/AntDesign";
import AntIcon5 from "react-native-vector-icons/FontAwesome";
import AntIcon6 from "react-native-vector-icons/AntDesign";
import IonIcon from "react-native-vector-icons/Ionicons";
import FeatherIcon from 'react-native-vector-icons/Feather' 
import * as Progress from 'react-native-progress';
import { DefaultProfileImage, TaskDetail_Circle,TaskDetail_Circle2,TaskDetail_Circle3, UIDesignImage, User1} from "../../assets/assets";
import { LinearGradientPrimary, black, grey, red, transparent, white } from "../../assets/colors";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { appRefresh, taskDetails } from "../../actions/Actions";
import { addTasks, getTasks } from "../../FirebaseAction";
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { useIsFocused } from "@react-navigation/native";
import { TapGestureHandler } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import FastImage from "react-native-fast-image";
import messaging from '@react-native-firebase/messaging';
import axios from "axios";
import { addNotifications, getNotifications } from "../../FirebaseAction/Notifications";

const width=Dimensions.get('screen').width
let taskcomments = []
let FirebaseTaskArray

Text.defaultProps = {
   style: {color:grey},
}; 

const TaskDetail = ({navigation, route}) => {
    const [butt1, setbutt1] = useState(true);
    const [butt2, setbutt2] = useState(true);
    const [butt3, setbutt3] = useState(true);
    const [comment, setComment] = useState('');

    const StateData = useSelector((state) => state.Reducers)
    const Dispatch = useDispatch();
    // console.log('StateData-----------Profile_Image----::::',StateData.profile_image);
    const item = route.params.item;

    const Time1 = moment(item.time1, "HH:mm").format("h A");
    const Time2 = moment(item.time2, "HH:mm").format("h A");
    const Date = moment(item.date).format("MMM D");

    const [refreshed, setRefreshed] = useState(false);

    function objectToArray(obj) {
        const result = [];
        // console.log('Arraaayyyy result =====', result );
        Object.values(obj).forEach(function(subObj) {
          result.push(subObj);
        });
        console.log('Arraaayyyy result =====', result );
        return result;
      }


    const but1 = async () => {
        setbutt1(!butt1)
        setbutt2(true)
        setbutt3(true)
       
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
        console.log('====================================');
        console.log('butt1 pressed --- Mark Completed');
        console.log('====================================');
        // let TempArray = StateData.TaskDetailsArr;
        let TempArray = FirebaseTaskArray;
        console.log('FirebaseTaskArray==========',TempArray);
        taskcomments = item.comments;
        TempArray.push({id:item.id, taskname: item.taskname, category: item.category, date: item.date, time1: item.time1, time2: item.time2, description: item.description, comments: taskcomments, status : 'Done'})
        console.log('TempArray------',TempArray);


        // const uniqueData = TempArray.filter((item, index, self) =>
        // index === self.findIndex((t) => (
        //   t.id === item.id 
        // ))
        // );

        const uniqueData = [...TempArray].reverse().filter((item, index, self) =>
        index === self.findIndex((t) => t.id === item.id)
        ).reverse();
      


        console.log('uniqueData------',uniqueData);
        // Dispatch(taskDetails(uniqueData))
        // const object = StateData.TaskDetailsArr.reduce((acc, curr) => {
        //     acc[curr.id] = curr;
        //     return acc;
        // }, {});
        const object = uniqueData.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});
        addTasks('TaskDetails',object)

        const data = {
            to: global.Token ,
            notification: {
              title: item.taskname,
              body: 'Mark as Done'
            }
          };
        

        PushNot(data);


    }
    const but1new = async () => {
        setbutt1(!butt1)


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
        console.log('====================================');
        console.log('butt1New pressed --- Mark Removed');
        console.log('====================================');
        // let TempArray = StateData.TaskDetailsArr;
        let TempArray = FirebaseTaskArray;
        console.log('FirebaseTaskArray==========',TempArray);
        taskcomments = item.comments;
        TempArray.push({id:item.id, taskname: item.taskname, category: item.category, date: item.date, time1: item.time1, time2: item.time2, description: item.description, comments: taskcomments, status : ''})
        console.log('TempArray------',TempArray);


        // const uniqueData = TempArray.filter((item, index, self) =>
        // index === self.findIndex((t) => (
        //   t.id === item.id 
        // ))
        // );

        const uniqueData = [...TempArray].reverse().filter((item, index, self) =>
        index === self.findIndex((t) => t.id === item.id)
        ).reverse();
      


        console.log('uniqueData------',uniqueData);
        // Dispatch(taskDetails(uniqueData))
        // const object = StateData.TaskDetailsArr.reduce((acc, curr) => {
        //     acc[curr.id] = curr;
        //     return acc;
        // }, {});
        const object = uniqueData.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});
        addTasks('TaskDetails',object)
    }
    const but2 = async () => {
        setbutt2(!butt2)
        setbutt1(true)
        setbutt3(true)

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
        console.log('====================================');
        console.log('butt2 pressed --- InReview Completed');
        console.log('====================================');
        // let TempArray = StateData.TaskDetailsArr;
        let TempArray = FirebaseTaskArray;
        console.log('FirebaseTaskArray==========',TempArray);
        taskcomments = item.comments;
        TempArray.push({id:item.id, taskname: item.taskname, category: item.category, date: item.date, time1: item.time1, time2: item.time2, description: item.description, comments: taskcomments, status : 'InReview'})
        console.log('TempArray------',TempArray);


        // const uniqueData = TempArray.filter((item, index, self) =>
        // index === self.findIndex((t) => (
        //   t.id === item.id 
        // ))
        // );

        const uniqueData = [...TempArray].reverse().filter((item, index, self) =>
        index === self.findIndex((t) => t.id === item.id)
        ).reverse();
      


        console.log('uniqueData------',uniqueData);
        // Dispatch(taskDetails(uniqueData))
        // const object = StateData.TaskDetailsArr.reduce((acc, curr) => {
        //     acc[curr.id] = curr;
        //     return acc;
        // }, {});
        const object = uniqueData.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});
        addTasks('TaskDetails',object)


        const data = {
            to: global.Token ,
            notification: {
              title: item.taskname,
              body: 'In Review'
            }
          };
        

        PushNot(data)


    }
    const but2new = async () => {
        setbutt2(!butt2)


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
        console.log('====================================');
        console.log('butt2New pressed --- InReview Removed');
        console.log('====================================');
        // let TempArray = StateData.TaskDetailsArr;
        let TempArray = FirebaseTaskArray;
        console.log('FirebaseTaskArray==========',TempArray);
        taskcomments = item.comments;
        TempArray.push({id:item.id, taskname: item.taskname, category: item.category, date: item.date, time1: item.time1, time2: item.time2, description: item.description, comments: taskcomments, status : ''})
        console.log('TempArray------',TempArray);


        // const uniqueData = TempArray.filter((item, index, self) =>
        // index === self.findIndex((t) => (
        //   t.id === item.id 
        // ))
        // );

        const uniqueData = [...TempArray].reverse().filter((item, index, self) =>
        index === self.findIndex((t) => t.id === item.id)
        ).reverse();
      


        console.log('uniqueData------',uniqueData);
        // Dispatch(taskDetails(uniqueData))
        // const object = StateData.TaskDetailsArr.reduce((acc, curr) => {
        //     acc[curr.id] = curr;
        //     return acc;
        // }, {});
        const object = uniqueData.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});
        addTasks('TaskDetails',object)
    }
    const but3 = async () => {
        setbutt3(!butt3)
        setbutt2(true)
        setbutt1(true)


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
        console.log('====================================');
        console.log('butt3 pressed --- Overdue Completed');
        console.log('====================================');
        // let TempArray = StateData.TaskDetailsArr;
        let TempArray = FirebaseTaskArray;
        console.log('FirebaseTaskArray==========',TempArray);
        taskcomments = item.comments;
        TempArray.push({id:item.id, taskname: item.taskname, category: item.category, date: item.date, time1: item.time1, time2: item.time2, description: item.description, comments: taskcomments, status : 'Overdue'})
        console.log('TempArray------',TempArray);


        // const uniqueData = TempArray.filter((item, index, self) =>
        // index === self.findIndex((t) => (
        //   t.id === item.id 
        // ))
        // );

        const uniqueData = [...TempArray].reverse().filter((item, index, self) =>
        index === self.findIndex((t) => t.id === item.id)
        ).reverse();
      


        console.log('uniqueData------',uniqueData);
        // Dispatch(taskDetails(uniqueData))
        // const object = StateData.TaskDetailsArr.reduce((acc, curr) => {
        //     acc[curr.id] = curr;
        //     return acc;
        // }, {});
        const object = uniqueData.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});
        addTasks('TaskDetails',object)


        const data = {
            to: global.Token ,
            notification: {
              title: item.taskname,
              body: 'Overdue'
            }
          };
        

        PushNot(data)


    }
    const but3new = async () => {
        setbutt3(!butt3)


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
        console.log('====================================');
        console.log('butt3New pressed --- Mark Completed');
        console.log('====================================');
        // let TempArray = StateData.TaskDetailsArr;
        let TempArray = FirebaseTaskArray;
        console.log('FirebaseTaskArray==========',TempArray);
        taskcomments = item.comments;
        TempArray.push({id:item.id, taskname: item.taskname, category: item.category, date: item.date, time1: item.time1, time2: item.time2, description: item.description, comments: taskcomments, status : ''})
        console.log('TempArray------',TempArray);


        // const uniqueData = TempArray.filter((item, index, self) =>
        // index === self.findIndex((t) => (
        //   t.id === item.id 
        // ))
        // );

        const uniqueData = [...TempArray].reverse().filter((item, index, self) =>
        index === self.findIndex((t) => t.id === item.id)
        ).reverse();
      


        console.log('uniqueData------',uniqueData);
        // Dispatch(taskDetails(uniqueData))
        // const object = StateData.TaskDetailsArr.reduce((acc, curr) => {
        //     acc[curr.id] = curr;
        //     return acc;
        // }, {});
        const object = uniqueData.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});
        addTasks('TaskDetails',object)
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

    
    }

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
            backgroundColor: white ,
            height:  Platform.OS === 'ios' ? '11%' : '10%',
            justifyContent: 'center',
            paddingBottom: Platform.OS === 'ios' ? 15 : 0,
            borderTopColor: transparent,
            elevation:0,
            shadowOpacity:0,
            }
    });
    };

    const PushComments = () =>
    {
        setComment('')
        console.log('Inside PushComments');
        // item.comments.push({comment: comment})
        let TempArray = StateData.TaskDetailsArr;
        taskcomments = item.comments;
        console.log('==================global.UserPhoto==================');
        console.log(global.UserPhoto);
        console.log('==================global.UserPhoto==================');
        taskcomments.push({ commentImageURL: global.UserPhoto,comment: comment})
        // taskcomments.push({comment: comment})
        TempArray.push({id:item.id, taskname: item.taskname, category: item.category, date: item.date, time1: item.time1, time2: item.time2, description: item.description, comments: taskcomments })

        const uniqueData = TempArray.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t.id === item.id 
        ))
        );

        Dispatch(taskDetails(uniqueData))
        const object = StateData.TaskDetailsArr.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});
        addTasks('TaskDetails',object)


        const data = {
            to: global.Token ,
            notification: {
              title: global.UserName + 'commented',
              body: comment,
            }
          };
        

        PushNot(data)



    }

    const handleBackPress = () => 
    {
        // Handle the back button press here
        console.log('=======handleBackPress');
        ShowBottomTab();
        // global.statusflag = true;
        // navigation.goBack();

        // Dispatch(appRefresh());

        // navigation.navigate('Home'); 

        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'Home' }], // replace 'InitialScreen' with the name of your initial screen
        // });

        // navigation.push('Home');
        
        const prevScreen = route.params.prevScreen;
        console.log('Previous Screen ---- ',prevScreen);
        if(prevScreen==='UpcomingTask')
            navigation.push('UpcomingTask');
        else if(prevScreen==='TodayTask')
            navigation.push('TodayTask');
        else if(prevScreen==='Home')
            navigation.push('Home');
            
        return true; // Return true to prevent default behavior (exit app)
    };

    const renderComments = ({index, item}) =>
    {
        const commentImageURL = item.commentImageURL;
        return(
            <View style={styles.renderComments}>
                <View style={{width:"13%"}}>
                <Image source={{ uri : commentImageURL }} style={styles.CommentImage2} />
                </View>
                {/* <Image source={{ uri : global.UserPhoto }} style={styles.CommentImage2} /> */}
                <View style={{ width:"88%"}}>
                    <Text style={{color:'black'}}>{global.UserName}</Text>
                    <Text>{item.comment}</Text>
                </View>
            </View>
        )
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          handleBackPress
        );
        console.log(width)
        console.log('====================================');
        console.log('------UseEffect Called------');
        console.log('------',item.status,'------');
        console.log('====================================');
        HideBottomTab();
        global.statusflag = true;
        item.status === 'Done' ? setbutt1(false) : 
        item.status === 'InReview' ? setbutt2(false) : 
        item.status === 'Overdue' ? setbutt3(false) : <></>
        return () => backHandler.remove();
    }, []);

    return (
       <ScrollView contentContainerStyle={{flexGrow:1,}} >
         <View style={styles.container}>

            <View style={styles.container2}>
                <Pressable onPress={()=>handleBackPress()} >
                    <AntIcon name="arrow-back" size={29} style={{ alignSelf: 'flex-start',color:'grey' }} />
                </Pressable>
                <Text style={styles.text1}>Task Details</Text>
                {/* <AntIcon1 name="circle" size={27}  /> */}
                <FeatherIcon name="corner-up-right" size={27} style={{ marginLeft: '13%',color:'grey' }} />
                <AntIcon2 name="ellipsis1" size={27} style={{ marginLeft: '5%',color:'grey' }} />
            </View>

            <Text style={styles.text2}>Task title</Text>
            <View style={styles.container3}>
                <Text style={styles.text3}>{item.taskname}</Text>
                <AntIcon3 name="form" size={26} style={{ marginLeft: '9%',color:'grey' }} />
            </View>

            <View >
                <Text style={styles.text4}>Due date</Text>

                <View style={{ flexDirection: 'row', width: '20%', marginLeft: '73%'}}>
                    <View >
                        <FastImage source={TaskDetail_Circle} style={{ height: 30, width: 30, borderRadius: 25 }} />
                    </View>
                    <View style={{ borderRadius: 25, marginLeft: -8 }}>
                        <FastImage source={TaskDetail_Circle2} style={{ height: 30, width: 30, }} />
                    </View>
                    <View style={{ borderRadius: 25, marginLeft: -8 }}>
                        <FastImage source={TaskDetail_Circle3} style={{ height: 30, width: 30 }} />
                    </View>
                </View>

                <View style={styles.container4}>
                    <AntIcon4 name="clockcircleo" size={20} style={{ marginTop: 2 ,color:'grey'}} />
                    <Text style={styles.text5}>{Time1}-{Time2}</Text>
                    <AntIcon5 name="calendar" size={20} style={{ marginLeft: '8%' }} />
                    <Text style={styles.text5}>{Date}</Text>
                </View>

            </View>
            <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', marginTop: 15,alignItems:'center',justifyContent:'center'}}>
                <Progress.Bar progress={0.9} width={width*0.81} color='#03c350' borderColor="grey" style={{ marginTop: 13 }} />
                <Text style={styles.text6}>90%</Text>
            </View>

            <View style={styles.butview}>
               
                {
                    butt1 ? (
                        <TouchableOpacity style={{ width:'34%', alignItems:'center',backgroundColor: '#ecf4fd', justifyContent: 'center', borderRadius: 25 , padding:'2%',marginRight:'6%'}} onPress={but1} >
                            <Text style={{ color: 'grey', fontSize:12 }}>Mark complete</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={{ width:'34%', padding:'2%', backgroundColor: '#0082E1', justifyContent: 'center', borderRadius: 25,marginRight:'6%' }} onPress={but1new} >
                            <View style={{ flexDirection: 'row' }}>
                                <AntIcon6 name="check" size={20} color="white" />
                                <Text style={{ color: 'white', fontSize:12,marginTop:2 }}>Mark complete</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }

                {
                    butt2 ? (
                        <TouchableOpacity style={{ height: 40, width:'26%', backgroundColor: '#ecf4fd', alignItems: 'center', justifyContent: 'center', borderRadius: 25,marginRight:'6%' }} onPress={but2} >
                            <Text style={{ color: 'grey', fontSize:12 }}>In Review</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={{ height: 40, width:'26%', backgroundColor: '#0082E1', alignItems: 'center', justifyContent: 'center', borderRadius: 25,marginRight:'6%' }} onPress={but2new} >
                            <View style={{ flexDirection: 'row' }}>
                                <AntIcon6 name="check" size={20} color="white" />
                                <Text style={{ color: 'white', fontSize:12,marginTop:2 }}>In Review</Text>
                            </View>
                        </TouchableOpacity>
                    )

                }
                {
                    butt3 ? (
                        <TouchableOpacity style={{ height: 40, width: '27%', backgroundColor: '#ecf4fd', alignItems: 'center', justifyContent: 'center', borderRadius: 25 }} onPress={but3}  >
                            <Text style={{ color: 'grey', fontSize:12 }}>Overdue</Text>
                        </TouchableOpacity>
                    ) : (

                        <TouchableOpacity style={{ height: 40, width: '27%', backgroundColor: '#0082E1', alignItems: 'center', justifyContent: 'center', borderRadius: 25 }} onPress={but3new} >
                            <View style={{ flexDirection: 'row' }}>
                                <AntIcon6 name="check" size={20} color="white" />
                                <Text style={{ color: 'white', fontSize:12,marginTop:2 }}>Overdue</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
          
            </View>
            <Text style={styles.text7}>Description</Text>
            {/* <TextInput style={styles.textinput} placeholder='Research design paths. There are many ways.'multiline={true} /> */}
            
            <View style={styles.DescriptionBox} >
                <Text>
                    {item.description}
                </Text>
            </View>
            

            <Text style={styles.text7}>Comments</Text>
            <View style={styles.CommentBox} >
                <Image source={{ uri : global.UserPhoto }} style={styles.CommentImage} />
                <TextInput style={styles.textinput1} value={comment} onChangeText={input => setComment(input) } placeholder="Add a comment..." placeholderTextColor={grey} multiline={true} />
                {
                    comment && 
                    <TouchableOpacity style={styles.SendButton} onPress={PushComments} >
                        <IonIcon name='send' size={32} color={LinearGradientPrimary} />
                    </TouchableOpacity>
                }
            </View>
            <FlatList
                data={item.comments}
                renderItem={({index, item})=>renderComments({index, item})}
                keyExtractor={(item, index) => index.toString()}
                extraData={item.comments}
                contentContainerStyle={{marginTop:'2%'}}
                scrollEnabled={false}
            />
        </View>
       </ScrollView>
    )
}
export default TaskDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop:'12%',
        paddingBottom:'5%',
    },
    container2: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: "center",
        justifyContent: 'center',


        alignSelf: 'center',
        // borderWidth:1,

    },
    container3: {
        flexDirection: 'row',
        marginTop: 4,
        width: '95%',
        // alignSelf:'center',
        justifyContent: 'space-between',
        marginLeft:'-1.5%',
        alignItems: 'center',
        // marginLeft:'1%'

    },
    container4: {
        flexDirection: 'row',
        marginTop: '-5%',
       
        width: '60%',
        alignItems:'center',
        paddingLeft:'5%',
        height:30,
      
    },
    text1: {
        // marginTop: '5%',
        marginLeft: '22%',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18,
    },
    text2: {
        marginLeft: '5%',
        marginTop: '3%',
        color: grey,
    },
    text3: {

        color: black,
        fontWeight: 'bold',
        fontSize: 17,
        marginLeft: '7%'

    },
    text4: {
        marginLeft: '5%',
        marginTop: 22,
        color: grey,
    },
    text5: {
        marginLeft: 7,
        color:'black'
    },
    text6: {
        marginLeft: 4,
        fontSize: 9,
        marginTop: 10,
        color:'black'
    },
    text7:{
        color: 'black',
        fontWeight: 'bold',
        marginLeft:'5%',
        marginTop:28,
        fontSize:18
    },
    butview: {
        flexDirection: 'row',
        borderWidth:1,
        marginTop: 35,
        width: '88%',
        overflow:'hidden',
        //justifyContent:'space-evenly',
        alignSelf:'center'
    },
    textinput:{
        width: '85%',
        borderWidth: 1,
        marginLeft: '5%',
        borderRadius: 12,
        borderColor: 'grey',
        marginTop: 15,
        paddingLeft:12,
        height:80
    },
    textinput1:{
    //    borderWidth:1,
       marginRight:'15%',
       marginLeft:'0%',
       marginTop:'-13%',
       width:'73%',
       color: grey,
    },
    DescriptionBox:
    {
        borderWidth:0.1,
        borderColor: 'black',
        width:'88%',
        alignSelf:'center',
        borderRadius:10,
        //elevation:1,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 1.41,
        // height:,
        marginTop: '6%',
        padding:'3%',
    },
    CommentBox:
    {
        borderWidth:0.1,
        borderColor: 'black',
        width:'88%',
        alignSelf:'center',
        borderRadius:5,
        // elevation:1,
        // shadowColor: '#000',
        // shadowOffset: {
        //   width: 0,
        //   height: 1,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 1.41,
        height:100,
        marginTop: '6%',
        paddingHorizontal:'3%',
        flexDirection:'row',
        overflow:'hidden',

    },
    CommentImage:
    {
        height:40, 
        width:40,
        marginLeft:'-1%',
        marginTop:'3%',
        borderRadius:20,

    },
    CommentImage2:
    {
        height:40, 
        width:40,
        //marginLeft:'-1%',
        // marginTop:'3%',
        borderRadius:20,
        marginRight:'1%',
    },
    SendButton:
    {
        // borderWidth:1,
        marginLeft:'-15%',
        paddingLeft:'4%',
        justifyContent:'flex-end',
    },
    renderComments:
    {
        //borderWidth:1,
        width:'88%',
        alignSelf:'center',
        marginBottom:'2%',
        flexDirection:'row',
        //alignItems:'center'
        
    },
})

