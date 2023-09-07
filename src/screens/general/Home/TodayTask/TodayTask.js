import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, BackHandler, Pressable } from "react-native";
import styles from "./styles";
import { UIDesignImage, Testing, BDEImage, SearchImage, Development, UIDesign2, Development2, SearchImage2, Testing2, BDEImage2 } from "../../../../assets/assets";
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { black, transparent, white, LinearGradientSecondary, grey } from "../../../../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../../FirebaseAction";
import { taskDetails, taskID } from "../../../../actions/Actions";

let TaskData = [
    {   id:0, taskname:'UI Design', category:'Design', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
        Description: 'Research design paths. There are many career paths within the field of design...'
    },
    {   id:1, taskname:'UI Design', category:'Design', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
        Description: 'Research design paths. There are many career paths within the field of design...'
    },
    {   id:2, taskname:'UI Design', category:'Design', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
        Description: 'Research design paths. There are many career paths within the field of design...'
    },
    {   id:3, taskname:'UI Design', category:'Design', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
        Description: 'Research design paths. There are many career paths within the field of design...'
    },
    {   id:4, taskname:'UI Design', category:'Design', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
        Description: 'Research design paths. There are many career paths within the field of design...'
    },
    {   id:5, taskname:'UI Design', category:'Design', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
        Description: 'Research design paths. There are many career paths within the field of design...'
    },
    {   id:6, taskname:'UI Design', category:'Design', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
        Description: 'Research design paths. There are many career paths within the field of design...'
    },
    {   id:7, taskname:'UI Design', category:'Design', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
        Description: 'Research design paths. There are many career paths within the field of design...'
    },
    {   id:8, taskname:'UI Design', category:'Design', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
        Description: 'Research design paths. There are many career paths within the field of design...'
    },
    {   id:9, taskname:'UI Design', category:'Design', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
        Description: 'Research design paths. There are many career paths within the field of design...'
    },
    {   id:10, taskname:'UI Design', category:'Design', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
        Description: 'Research design paths. There are many career paths within the field of design...'
    },
    {   id:11, taskname:'UI Design', category:'Design', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
        Description: 'Research design paths. There are many career paths within the field of design...'
    },
    {   id:12, taskname:'UI Design', category:'Design', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
        Description: 'Research design paths. There are many career paths within the field of design...'
    },
    {   id:13, taskname:'UI Design', category:'Design', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
        Description: 'Research design paths. There are many career paths within the field of design...'
    },
    {   id:14, taskname:'UI Design', category:'Design', Date:'05 April, Tuesday', StartTime:'09:00 AM', EndTime:'11:00 AM',
        Description: 'Research design paths. There are many career paths within the field of design...'
    },
]
let filteredData
const TodayTask = ({navigation, route}) =>
{
    const [f,setF] = useState(true);
    const Dispatch = useDispatch();
    const StateData = useSelector((state) => state.Reducers);
    const [render, setRender] = useState();
    // const filteredData = route.params.TodayTaskData;
    const today = new Date();
    const todayDateString = today.toLocaleDateString('zh-CN', {day:'2-digit', month:'2-digit', year:'numeric'}).split('/').join('-');


    console.log('=====StateData.TaskDetailsArr : ',StateData.TaskDetailsArr);
    filteredData = StateData.TaskDetailsArr;
    console.log('=====filteredData : ',filteredData);

    function objectToArray(obj) {
        const result = [];
        // console.log('Arraaayyyy result =====', result );
        Object.values(obj).forEach(function(subObj) {
          result.push(subObj);
        });
        console.log('Arraaayyyy result =====', result );
        return result;
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
    navigation.getParent()?.setOptions({
        tabBarStyle: {
            backgroundColor: white,
            height:  Platform.OS === 'ios' ? '11%' : '10%',
            justifyContent: 'center',
            paddingBottom: Platform.OS === 'ios' ? 15 : 0,
            borderTopColor: transparent,
            elevation:0,
            shadowOpacity:0,
            }
    });
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          handleBackPress
        );
        HideBottomTab();


        const fetchTasks = async () =>
        {
            const DataTasks = await getTasks();
            // console.log('------------------------------------------------------DataTasks:',DataTasks);
            const FirebaseTaskArray = objectToArray(DataTasks);
            // console.log('------------------------------------------------------FirebaseTaskArray:',FirebaseTaskArray);
            Dispatch(taskDetails(FirebaseTaskArray))
            // setFilterFlag(true);
            // console.log('=====StateData.TaskDetailsArr : ',StateData.TaskDetailsArr);
            // filteredData = StateData.TaskDetailsArr;
            // console.log('=====filteredData : ',filteredData);
        }
        fetchTasks();
        console.log('filteredData.length========',filteredData.length);
        Dispatch(taskID(filteredData.length))

        return () => backHandler.remove();
      }, []);

      useEffect(() => {

        const fetchTasks = async () =>
        {
            const DataTasks = await getTasks();
            // console.log('------------------------------------------------------DataTasks:',DataTasks);
            const FirebaseTaskArray = objectToArray(DataTasks);
            // console.log('------------------------------------------------------FirebaseTaskArray:',FirebaseTaskArray);
            Dispatch(taskDetails(FirebaseTaskArray))
            // setFilterFlag(true);
            // console.log('=====StateData.TaskDetailsArr : ',StateData.TaskDetailsArr);
            // filteredData = StateData.TaskDetailsArr;
            // console.log('=====filteredData : ',filteredData);
        }
        fetchTasks();
        console.log('filteredData.length========',filteredData.length);
        Dispatch(taskID(filteredData.length))

      }, [render]);

    const handleBackPress = () => {
        // Handle the back button press here
        ShowBottomTab();
        navigation.push('Home');
        return true; // Return true to prevent default behavior (exit app)
      };
    
      const renderItem = ({item}) =>
      {   
        //   return(
        //       <View style={styles.renderItem} >
        //           <View style={{height:50, width:50, justifyContent:'center', alignItems:'center'}} > 
        //           {
        //              item.category==='Design' ? <Image source={UIDesignImage} style={{height:50, width:50}} />
        //              : item.category==='Development' ? <Image source={Development} style={{height:40, width:40}} />
        //              : item.category==='Research' ? <Image source={SearchImage} style={{height:42, width:40}} />
        //              : item.category==='Testing' ? <Image source={Testing} style={{height:50, width:50}} /> 
        //              : <Image source={BDEImage} style={{height:50, width:50}} resizeMode='cover' />
        //           }
        //           </View>
        //           <View style={{marginLeft:'4%', width:'47%'}} >
        //               <Text style={styles.TaskName} >{item.taskname}</Text>
        //               <Text style={styles.Time} >{item.time1} - {item.time2}</Text>
        //           </View>
        //           <View style={styles.TaskStatus} >
        //               {
        //                   item.status==='Done' ? <AntIcon name='checkcircle' color={LinearGradientSecondary} size={15}  /> 
        //                                        : <MaterialIcon name='pending-actions' color={LinearGradientSecondary} size={20} /> 
        //               }
        //           </View>
        //           <View style={{marginLeft:'7%'}}>
        //               <AntIcon name='right' color={grey} size={20} />
        //           </View>
        //       </View>
        //   );
        const GoTaskDetails = () =>
        {
            navigation.navigate('TaskDetail',{ item, prevScreen:'TodayTask'});
        }
        return(
            <Pressable style={styles.renderItem} onPress={GoTaskDetails} >
              <View style={styles.TaskSymbole} >
                    {
                        item.category === 'Design' ? (<View style={styles.flatlistdesigntask}><Image source={UIDesign2} style={{ height: 40, width: 40 }} /></View>) : (null)

                    }
                    {
                        item.category === 'Development' ? (<View style={styles.flatlistdevelopmenttask}><Image source={Development2} style={{ height: 40, width: 40 }} /></View>) : (null)
                    }
                    {
                        item.category === 'Research' ? (<View style={styles.flatlistresearchtask}><Image source={SearchImage2} style={{ height: 40, width: 40 }} /></View>) : (null)
                    }
                    {
                        item.category === 'Testing' ? (<View style={styles.flatlisttestingtask}><Image source={Testing2} style={{ height: 40, width: 40 }} /></View>) : (null)
                    }
                    {
                        item.category === 'BDE' ? (<View style={styles.flatlistbdetask}><Image source={BDEImage2} style={{ height: 40, width: 40 }} resizeMode='cover' /></View>) : (null)
                    }
                </View>
                <View style={{marginLeft:'4%', width:'50%', height:50 }} >
                    <Text style={styles.TaskName} >{item.taskname}</Text>
                    <Text style={styles.Time} >{item.time1} - {item.time2}</Text>
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
  

    return(
        <View style={styles.containor} >
            <View style={styles.TodayTask}>
                <Text onPress={handleBackPress} > <AntIcon name='left' size={25} color={black} /> </Text>
                <View style={{marginLeft:'20%'}} >
                    <Text style={styles.TodayTaskText} >Today's Task</Text>
                </View>
            </View>
            <View style={styles.TaskFlatListView}>
            <FlatList
                        data={ filteredData.filter((task,index)=> task.date===todayDateString ) }
                        renderItem={({index,item})=>renderItem({index,item})}
                        keyExtractor={ item=> item.id }
                        extraData={ filteredData.filter((task,index)=> task.date===todayDateString ) }
            />
            </View>
        </View>
    )
}
export default TodayTask;