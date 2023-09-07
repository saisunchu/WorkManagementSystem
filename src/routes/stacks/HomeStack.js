import React from "react";
import { View, Text } from "react-native";
import Home from "../../screens/general/Home/Home";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import TodayTask from "../../screens/general/Home/TodayTask/TodayTask";
import TaskDetail from "../../screens/general/TaskDetail";


const Stack = createStackNavigator();

const HomeStack = () =>
{
    return(
        <Stack.Navigator
        initialRouteName='Home'
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
            name='Home'
            component={Home}
            options={{ title: 'Home' }}
        />
        <Stack.Screen
            name='TodayTask'
            component={TodayTask}
        />
        <Stack.Screen
            name='TaskDetail'
            component={TaskDetail}
        />

    </Stack.Navigator>
    )
}
export default HomeStack;