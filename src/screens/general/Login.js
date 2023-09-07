import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, ScrollView, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Login_Icon, Password_Show, Password_Hide, UIDesignImage, User1, User2, DefaultProfileImage } from "../../assets/assets";
import { ButtonPrimary, white } from "../../assets/colors";
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
    const [password, setpassword] = useState(true)
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const [active,setactive]= useState(true)
    const managepasswordvisibility = () => {
        setpassword(!password)
    }
    const WELCOME = () => {

        setactive(false)
        setTimeout(()=>{
            setactive(true)
        },1000)
        if(!email || !pass ){
            alert('Please fill Email and Password')
        }
        // if (email == '') {
        //     alert('Please fill Email ')
        // }
        // else if (pass == '') {
        //     alert('Please fill Password')
        // }
        else{
            
            auth().signInWithEmailAndPassword(email, pass).then((user) => {
                if (user) {
                    user.photoURL=DefaultProfileImage;
                    console.log(user.photoURL)
                    navigation.navigate('MyTabs')
                }
                
            })
            .catch((error) => {
                alert('Invalid Email or Password')
            })
            setemail('')
            setpass('')
            
        }

    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: white }} >
            <View style={styles.mainview}>

                <Image source={Login_Icon} style={styles.img} />
                <Text style={styles.text}>Let's sign you in.</Text>
                <Text style={styles.text1}>Sign in with your data that you have </Text>
                <Text style={styles.text1}>entered during your registration.</Text>
                <Text style={styles.email}>Email</Text>
                <TextInput style={styles.textinput} onChangeText={email => setemail(email)} value={email} keyboardType="email-address" />
                <Text style={styles.pass}>Password</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.textinput} secureTextEntry={password} onChangeText={pass => setpass(pass)} value={pass} />
                    <TouchableOpacity style={{ position: 'absolute', marginLeft: '80%' }} onPress={managepasswordvisibility}>
                        <Image source={password ? Password_Hide : Password_Show} style={{ height: 40, width: 40 }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.touchopacity} onPress={WELCOME} disabled={!active} >
                    <View style={styles.touchview}>
                        <Text style={styles.touchtext}>Sign in</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}
export default Login
const styles = StyleSheet.create({
    mainview: {

        backgroundColor: 'white',
        flex: 1,
        marginTop: '12%',
    },
    img: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        marginTop: 30
    },
    text: {
        color: ButtonPrimary,
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 15,
        alignSelf: 'center'
    },
    text1: {
        alignSelf: 'center'
    },
    email: {
        marginLeft: '9%',
        marginTop: 70,
        color:'black'
    },
    textinput: {

        width: '80%',
        marginLeft: '9%',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderTopColor: 'white',
        borderWidth: 1,
        color:'black'


    },
    pass: {
        marginTop: 35,
        marginLeft: '9%',
        color:'black'
    },
    touchopacity: {
        marginTop: 50,
        width: '80%',
        alignSelf: 'center'
    },
    touchview: {
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: ButtonPrimary,
        justifyContent: 'center'
        , height: 60
    },
    touchtext: {
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }

})

