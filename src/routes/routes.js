import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import Welcome from '../screens/general/Welcome/Welcome';
import MyTabs from './TabNavigator';
import Login from '../screens/general/Login';


// make navigation instance
const Stack = createStackNavigator();



function MainStackNavigator() {

    const [isUserLogin, setUserLogin] = useState(true)
    //global.isUserLogin=true
    auth().onAuthStateChanged((user) => {
        console.log('state of user', user)
        if (user) {
            setUserLogin(false)
        }

    })

    return (
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName='Welcome'
                screenOptions={{
                    animationEnabled: false,
                    gestureEnabled: false,
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: "#101010"
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    },
                    headerTintColor: "#ffd700",
                    ...TransitionPresets.SlideFromRightIOS
                }}>
                
                {
                    isUserLogin ? (
                        
                        <Stack.Screen
                            name='Welcome'
                            component={Welcome}
                            options={{ title: 'Welcome' }}
                        />
                    ) : (
                        <Stack.Screen
                            name='MyTabs'
                            component={MyTabs}
                        />
                    )
                }
                {/* <Stack.Screen
                    name='MyTabs'
                    component={MyTabs}

                /> */}
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{ title: 'Welcome' }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export { MainStackNavigator as Routes };