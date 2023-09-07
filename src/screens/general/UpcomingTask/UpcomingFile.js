import React, { useEffect, useState } from "react";
import CalendarView from "../../../shared/Calendar/CalendarView";
import { View, Text, FlatList, Image, Pressable } from "react-native";
import styles from "./styles";
import { BDEImage, Development, SearchImage, Testing, UIDesignImage,NoTask,NoTask2, UIDesign2, Development2, SearchImage2, Testing2, BDEImage2 } from "../../../assets/assets";
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { LinearGradientSecondary, grey } from "../../../assets/colors"; 
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from "react-redux";
import { taskDetails, taskID } from "../../../actions/Actions";
import { getTasks } from "../../../FirebaseAction";

let filteredData = [];
let TimeColor;
let TaskColor;

const UpcomingFile = ({navigation}) =>
{
  const [render, setRender] = useState(true)
  const StateData = useSelector((state)=>state.Reducers);
  filteredData = StateData.TaskDetailsArr;
  const Dispatch = useDispatch(); 

  console.log('Filtered Data --- in Upcoming File ----', filteredData);
  console.log('Upcoming Task Date --- in Upcoming File ----', StateData.upcoming_task_date);
  // const chosenDate = StateData.upcoming_task_date;

  function objectToArray(obj) {
    const result = [];
    // console.log('Arraaayyyy result =====', result );
    Object.values(obj).forEach(function(subObj) {
      result.push(subObj);
    });
    console.log('Arraaayyyy result =====', result );
    return result;
  }

  const renderItem = ({item}) =>
  {
    const GoTaskDetails = () =>
    {
        navigation.navigate('TaskDetail',{ item, prevScreen:'UpcomingTask'});
    }
    item.category === 'Design' ? TaskColor='#deebfa' :
    item.category === 'Development' ? TaskColor='#eedcf5' :
    item.category === 'Research' ? TaskColor='#f5e2d7' :
    item.category === 'Testing' ? TaskColor='#d5f7e2' :
    item.category === 'BDE' ? TaskColor='#cecef2' : (null)
    return(
        <Pressable style={[styles.renderItem,{backgroundColor: TaskColor}]} onPress={GoTaskDetails} >
             <View style={styles.TaskSymbole} >
                    {
                        item.category === 'Design' ? 
                          (TimeColor = '#57b3cf',TaskColor='#deebfa',
                          <View style={styles.flatlistdesigntask}>
                              <Image source={UIDesign2} style={{ height: 40, width: 40 }} />
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
            <View style={{marginLeft:'4%', width:'50%', height:50,justifyContent:'center'}} >
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

  console.log('====================================');
  console.log(filteredData.filter(task=>task.date==='2023-06-22'));
  console.log('====================================');

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

  return(
    <View style={styles.containor}>
      <Text style={styles.HeaderTextHomePage} >Upcoming Tasks</Text>
      <CalendarView />
      <View>
        <View style={styles.TodayTask}>
            <Text style={styles.TodayTaskText} >Schedule</Text>
        </View>
        <View style={styles.TaskFlatListView}>
          {
            filteredData.filter(task=>task.date===StateData.upcoming_task_date).length===0
                ? 
                <View style={styles.NoTaskView} >
                   <FastImage source={NoTask2}  style={styles.NoTaskImage}/>
                   <Text style={styles.NoTaskText} >No Tasks</Text>
                </View>
                : 
                <FlatList
                  data={ filteredData.filter(task=>task.date===StateData.upcoming_task_date) }
                  renderItem={({index,item})=>renderItem({index,item})}
                  keyExtractor={ item=> item.id }
                  extraData={ filteredData.filter(task=>task.date===StateData.upcoming_task_date) }
                  showsVerticalScrollIndicator={false}
                />
          }    
            </View>
      </View>
    </View>
  )
}
export default UpcomingFile;