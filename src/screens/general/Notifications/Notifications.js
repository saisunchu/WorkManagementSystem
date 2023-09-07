import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import styles from "./styles";
import FastImage from "react-native-fast-image";
import { getNotifications } from "../../../FirebaseAction/Notifications";
import { useFocusEffect } from "@react-navigation/native";

const Notification = () =>
{
    const [notificationData, setNotificationData] = useState([]);

    console.log('Inside Notifications -------- Componnent ========== ');

    const renderNotifications = ({item}) =>
    {
        console.log('Item.userPhoto======', item.userPhoto);
        return(
            <View style={styles.renderNotificationsView} >
                {/* <View> */}
                    <View style={styles.UserPhoto} >
                        <Image source={{uri: item.userPhoto}} style={{height:'100%', width:'100%' }} />
                    </View>
                    <View style={styles.titlebodyView} >
                        <Text style={styles.title} >{item.title}</Text>
                        <Text style={styles.body} >{item.body}</Text>
                    </View>
                {/* </View>   */}
            </View>
        )
    }

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

        console.log('Inside useEffect ------- ');

        const fetchNotifications = async () =>
        {
          const Notifications = await getNotifications(); 
          // console.log('------------------------------------------------------DataTasks:',DataTasks);
          const FirebaseTaskArray = objectToArray(Notifications);
          // console.log('------------------------------------------------------FirebaseTaskArray:',FirebaseTaskArray);
          global.notifications = FirebaseTaskArray;
          console.log('=====global.notifications CreateTask : ',global.notifications);
    
        }
        fetchNotifications();
        
        setNotificationData(global.notifications);

    },[])


    // useFocusEffect(
    //     React.useCallback(() => {
    //       fetchData().then(data => setData(data));
    //     }, [])
    //   );

      const fetchData = useCallback(() => {
        
        console.log('Inside useEffect ------- ');

        const fetchNotifications = async () =>
        {
          const Notifications = await getNotifications(); 
          // console.log('------------------------------------------------------DataTasks:',DataTasks);
          const FirebaseTaskArray = objectToArray(Notifications);
          // console.log('------------------------------------------------------FirebaseTaskArray:',FirebaseTaskArray);
          global.notifications = FirebaseTaskArray;
          console.log('=====global.notifications CreateTask : ',global.notifications);
    
        }
        fetchNotifications();
        
        setNotificationData(global.notifications);

        
      }, []);

      useFocusEffect(fetchData);


    // useEffect(()=>{

    //     console.log('Inside useEffect ------- ');

    //     const fetchNotifications = async () =>
    //     {
    //       const Notifications = await getNotifications(); 
    //       // console.log('------------------------------------------------------DataTasks:',DataTasks);
    //       const FirebaseTaskArray = objectToArray(Notifications);
    //       // console.log('------------------------------------------------------FirebaseTaskArray:',FirebaseTaskArray);
    //       global.notifications = FirebaseTaskArray;
    //       console.log('=====global.notifications CreateTask : ',global.notifications);
    
    //     }
    //     fetchNotifications();
        
    //     setNotificationData(global.notifications);

    // },[])

    return(
        <View style={styles.containor} >
            <View style={styles.HeaderNotificationView} >
                <Text style={styles.HeaderTextHomePage} >Notifications</Text>
            </View>
            <View style={styles.NotificationFlatListView} >
                <FlatList 
                    // data={[{id:0,name:'John Doe'}, {id:1,name:'Richard Roe'}]}
                    data={ notificationData }
                    renderItem={renderNotifications}
                    keyExtractor={item=>item.id}
                    extraData={ notificationData }
                />
            </View>
        </View>
    )
}
export default Notification;