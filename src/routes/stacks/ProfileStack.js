import React from "react";
import Profile from "../../screens/general/Profile";
import Statistics from "../../screens/general/Statistics";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

const Stack = createStackNavigator();

const ProfileStack = () =>
{
    return(
        <Stack.Navigator
        initialRouteName='Profile'
        screenOptions={{
            animationEnabled: false,
            gestureEnabled: false,
            headerShown: false,
            headerStyle: {
                backgroundColor: "#101010"
            },
            animationEnabled: false,
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerTintColor: "#ffd700",
            ...TransitionPresets.SlideFromRightIOS
        }}>
        <Stack.Screen
            name='Profile'
            component={Profile}
            options={{ title: 'Profile' }}
        />
        <Stack.Screen
            name='Statistics'
            component={Statistics}
        />
    </Stack.Navigator>
    )
}
export default ProfileStack;
