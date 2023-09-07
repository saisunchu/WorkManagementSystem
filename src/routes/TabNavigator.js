import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { ButtonPrimary, red, transparent, white } from "../assets/colors";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntIcon from 'react-native-vector-icons/AntDesign'

import HomeStack from "./stacks/HomeStack";
import ProfileStack from "./stacks/ProfileStack";
import { Date_Icon, Date_Icon_Filled, Home_Icon, Home_Icon_Filled, Notification_Icon, Notification_Icon_Filled, Profile_Icon, Profile_Icon_Filled } from "../assets/assets";
import UpcomingTaskStack from "./stacks/UpcomingTaskStack";
import NotificationStack from "./stacks/NotificationStack";
import CreateTaskStack from "./stacks/CreateTaskStack";



const Tab = createBottomTabNavigator();

const MyTabs = ({navigation}) => {
    return (
      <Tab.Navigator
        screenOptions={({ route: { name } }) => ({
          tabBarStyle: styles.tabBarStyle,
          headerShown: false,
          //style: { display: 'none' }, // Initially hide the tab bar
          tabBarActiveTintColor: ButtonPrimary,
          tabBarInactiveTintColor: 'lightgray',
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            marginBottom: 5,
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 14,
            color: 'grey'
          },
          tabBarIconStyle: {
            width: 20,
            height:15,
            marginTop: 0,
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarShowLabel:false,
          
          
        })}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <CustomHomeTabBarButton focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="UpcomingTaskStack"
          component={UpcomingTaskStack}
          options={{
            tabBarIcon: props => <CustomDateTabBarButton {...props} />,
          }}
        />
  
        <Tab.Screen
          name="CreateTaskStack"
          component={CreateTaskStack} 
          options={{
            tabBarButton: props => <CustomCreateTaskBarButton {...props} />,
            tabBarStyle:{
              display:'none',
            }
          }}
        />
  
        <Tab.Screen
          name="NotificationStack"
          component={NotificationStack}
          options={{
            tabBarIcon: props => <CustomNotificationTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            tabBarIcon: props => <CustomProfileTabBarButton {...props} />,
          }}
        />
      </Tab.Navigator>
    );
  };
  
  const CustomHomeTabBarButton = ({ onPress, focused }) => (
    
      focused ? (
        <Image style={{ width: 25, height: 25,}} 
      source={Home_Icon_Filled} resizeMode={'contain'} />
      ) : (
        <Image style={{ width: 25, height: 25,}} 
      source={Home_Icon} resizeMode={'contain'} />
      )
  );
  const CustomDateTabBarButton = ({ onPress, focused }) => (
    
      focused ? (
        <Image style={{ width: 25, height: 25,}} 
        source={Date_Icon_Filled} resizeMode={'contain'} />  
      ) : (
        <Image style={{ width: 25, height: 25,}} 
      source={Date_Icon} resizeMode={'contain'} />
      )

  );
  const CustomCreateTaskBarButton = ({ onPress }) => (
    <Pressable onPress={() => onPress()} style={{marginTop:'-5%'}} >
      <AntIcon name='pluscircle' size={60} color={ButtonPrimary} />
    </Pressable>
  );
  const CustomNotificationTabBarButton = ({ onPress, focused }) => (
  
      focused ? (
        <Image style={{width: 28, height: 28,}} 
        source={Notification_Icon_Filled} resizeMode={'contain'} />
      ) : (
        <Image style={{width: 28, height: 28,}} 
        source={Notification_Icon} resizeMode={'contain'} />
      )
    
  );
  const CustomProfileTabBarButton = ({ onPress, focused }) => (
      focused ? (
        <Image style={{ borderWidth:1, width: 25, height: 25,}} 
      source={Profile_Icon_Filled} resizeMode={'contain'} />
      ) : (
        <Image style={{ borderWidth:1, width: 25, height: 25,}} 
      source={Profile_Icon} resizeMode={'contain'} />
      )
  );


  export default MyTabs;
  
  const styles = StyleSheet.create({
    tabBarStyle: {
      backgroundColor: white,
      height:  Platform.OS === 'ios' ? '11%' : '10%',
      justifyContent: 'center',
      paddingBottom: Platform.OS === 'ios' ? 15 : 0,
      borderTopColor: transparent,
      elevation:0,
      shadowOpacity:0,
    },
    tabBarBtnMainContainer: {
      // width: RF(75),
      // height: RF(75),
      // marginTop: RF(13),
      width: 20,
      height: 20,
    },
    tabBarBtnMainContainerClose: {
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnContainer: {
      width: 20,
      height: 20,
    },
    btnContainerClose: {
      width: 56,
      height: 56,
      borderRadius: 30,
      backgroundColor: red,
    },
    mt10: {
      marginTop: 10,
    },
    homeImage: {
      width: 24,
      height: 24,
    },
  });
  