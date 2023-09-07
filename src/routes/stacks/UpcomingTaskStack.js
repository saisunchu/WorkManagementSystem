import UpcomingTask from "../../screens/general/UpcomingTask/UpcomingFile";
import React from "react";
import { View, Text } from "react-native";
import Home from "../../screens/general/Home/Home";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import TaskDetail from "../../screens/general/TaskDetail";


const Stack = createStackNavigator();

const UpcomingTaskStack = () =>
{
    return(
        <Stack.Navigator
        initialRouteName='UpcomingTask'
        screenOptions={{
            headerShown: false,
            headerStyle: {
                backgroundColor: "#101010"
            },
            animationEnabled: false,
            gestureEnabled: false,
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerTintColor: "#ffd700",
            ...TransitionPresets.SlideFromRightIOS
        }}>
        <Stack.Screen
            name='UpcomingTask'
            component={UpcomingTask}
            options={{ title: 'UpcomingTask' }}
        />
        <Stack.Screen
            name='TaskDetail'
            component={TaskDetail}
            options={{
                tabBarStyle:{
                  display:'none',
                }
              }}
        />

    </Stack.Navigator>
    )
}
export default UpcomingTaskStack;