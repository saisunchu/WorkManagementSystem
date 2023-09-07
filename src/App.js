import React, { useEffect } from "react";
import { Text, View, StatusBar, StyleSheet } from "react-native"; 
import Welcome from "./screens/general/Welcome/Welcome";
import { Routes } from "./routes/routes";
import { Provider } from "react-redux";
import store from "./Reducers";
import { red, white, grey } from "./assets/colors";

// import firebase from '@react-native-firebase/app'; 
// import '@react-native-firebase/messaging'; 
import messaging from '@react-native-firebase/messaging';
// import {Alert} from 'react-native';
import PushNotification from 'react-native-push-notification'; 
import {Platform} from 'react-native'; 
import PushNotificationIOS from '@react-native-community/push-notification-ios'; 
// import {FirebaseMessagingTypes} from '@react-native-firebase/messaging'; 
import axios from "axios";
import { TouchableOpacity } from "react-native";

Text.defaultProps = {
  style: {color:grey},
};

const App = () =>
{

  // const data = {
  //   to: 'eNMagnVYSEy_dMJ5mERjDD:APA91bHwOVYq96CN-etEY7p-ZaEGsy0idWMq6dlhndCZqI3ifrmLJkJeH8WfhTdxPGT2dpGP_yxbrAC1_yrqP9fOb_rhax1RtzxpJ8LKlF9nLX0Eno2r81-jF2Hrx04NPsYolEAdE-Mo',
  //   notification: {
  //     title: 'Six',
  //     body: 'seven '
  //   }
  // };

  useEffect(() => { 
    console.log('Inside useEffect-----');
    messaging().onMessage(response => { 

        console.log(JSON.stringify(response));
        if (Platform.OS !== 'ios') { 
            showNotification(response.notification); 
            return; 
        } 
        
    }); 
    messaging().getToken().then((token) => {
    console.log('FCM token:', token);
    global.Token = token;
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Background message received:', remoteMessage);
      // Process the message and update the UI or perform other actions

      if (Platform.OS !== 'ios') { 
        showNotification(response.notification); 
        return; 
      } 
      PushNotificationIOS.requestPermissions().then(() => 
          showNotification(response.notification), 
      ); 

    });
    const showNotification = ( notification ) => { 
      PushNotification.localNotification({ 
          channelId: "my-channel-id", // ID of the channel to use
          title: notification.title, 
          message: notification.body, 
      }); 
    }; 
    
}, 
[]
); 

// const PushNot = () =>
// {
//   console.log('Inside PushNot');
//   axios.post('https://fcm.googleapis.com/fcm/send', data, {
//     headers: {
//       Authorization: 'key=AAAAS16eIb4:APA91bGHAheMFW-2GTC9O5f355U2aTplgYRzEwftJjJZRHnr-7S-nJ24TSO1xeb3ai7C_TN2GjRHaNno2AGAcQJeOSYi3Qh8cO0pG1Va1rhpie6wqE7Eb_zDiWE0BA_GrXt7IUGYzv_U',
//       'Content-Type': 'application/json'
//     }
//   }).then(response => {
//     console.log('Notification sent:', response.data);
//   }).catch(error => {
//     console.error('Notification error:', error);
//   });

// }

  return(
    <Provider store={store} >
      <View style={{flex:1}}>
        <StatusBar backgroundColor='transparent' translucent={true} />
        <Routes/>
     
      </View>
    </Provider>
    // <View style={{flex:1, backgroundColor:'white'}} > 
    //   <TouchableOpacity style={{height:'72%', backgroundColor:'green', justifyContent:'center', alignItems:'center' }} onPress={PushNot}  >
    //     <Text style={{color:'white'}} > Push notification </Text>
    //   </TouchableOpacity>
    // </View>
  )
}
export default App;







