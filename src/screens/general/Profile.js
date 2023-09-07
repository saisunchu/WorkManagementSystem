import React, { useEffect, useState } from "react";
import { Alert, Image, LogBox, Pressable, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View, Modal, Dimensions, Button } from 'react-native';
import { launchImageLibrary } from "react-native-image-picker";
import AntIcon from "react-native-vector-icons/AntDesign";
import { ChangeProfile_Icon, EditProfile, Statistics_Icon, Logout_Icon } from "../../assets/assets";
import { notificationStore, profileImage } from "../../actions/Actions";
import { useDispatch, useSelector } from "react-redux"; 
import auth from '@react-native-firebase/auth';
import { addDeveloper, getDeveloper } from "../../FirebaseAction/Developers";
import { StoreDeveloperData, getDeveloperData } from "../../FirebaseAction/DevelopersData";
import { containor } from "../../assets/colors";
import messaging from '@react-native-firebase/messaging';
import axios from "axios";
import { addNotifications, getNotifications } from "../../FirebaseAction/Notifications";

LogBox.ignoreAllLogs()

const {width}=Dimensions.get('screen')

let UserProfileData = {

}

const Profile = ({ navigation }) => {

    const [selectedImage, setSelectedImage] = useState(global.UserPhoto);
    const [name, setName] = useState(auth().currentUser.displayName)
    const [isModalVisible, setModalVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const Dispatch = useDispatch();
    const StateData = useSelector((state) => state.Reducers)

    const onStatistics = () => {
        navigation.navigate('Statistics')

    }

    function objectToArray(obj) {
        const result = [];
        // console.log('Arraaayyyy result =====', result );
        Object.values(obj).forEach(function (subObj) {
            result.push(subObj);
        });
        console.log('Arraaayyyy result =====', result);
        return result;
    }


    const logout = () => {
        console.log('inside logout')
        Alert.alert("Logout", "Are you sure you want to logout ?", [
            {
                text: "cancel", onPress: () => {
                    return null;
                }
            },
            {
                text: "ok", onPress: () => {
                    console.log('inside ok')
                    const response = auth().signOut()
                    //console.log(response)
                    navigation.navigate('Login')
                }
            }])
    }

    const changeProfile = () => {
        console.log('inside profile')

        setModalVisible(!isModalVisible)
    }
    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible);
    }
    const changeimage = () => {
        opengallery()
        setModalVisible(!isModalVisible)
    }
    const setname = async () => {
       if(inputValue=='')
       {
         alert('Please Enter Name')
       }
       else{
        // setName(inputValue)
        setModalVisible(!isModalVisible)
        await auth().currentUser.updateProfile({displayName: inputValue });
        console.log('auth().currentUser.displayName=========',auth().currentUser.displayName,'------',inputValue);
        global.UserName = auth().currentUser.displayName;
        setInputValue('')


        const tempEmail = auth().currentUser.email;
        const currDevDataObj = await getDeveloper(tempEmail);
        // const currDevData = objectToArray(currDevDataObj);
        currDevDataObj.displayName = inputValue;
        console.log('currDevDataObj==========', currDevDataObj);
        addDeveloper(tempEmail,currDevDataObj);


        const data = {
            to: global.Token ,
            notification: {
              title: global.UserName,
              body: 'Profile Name Changed',
            }
          };
        

        PushNot(data)

    }
    }

    const PushNot = async(data) =>
    {
      console.log('Inside PushNot- data :',data);
      axios.post('https://fcm.googleapis.com/fcm/send', data, {
        headers: {
          Authorization: 'key=AAAAS16eIb4:APA91bGHAheMFW-2GTC9O5f355U2aTplgYRzEwftJjJZRHnr-7S-nJ24TSO1xeb3ai7C_TN2GjRHaNno2AGAcQJeOSYi3Qh8cO0pG1Va1rhpie6wqE7Eb_zDiWE0BA_GrXt7IUGYzv_U',
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log('Notification sent:', response.data);
      }).catch(error => {
        console.error('Notification error:', error);
      });

      const fetchNotifications = async () =>
      {
          const Notifications = await getNotifications(); 
          // console.log('------------------------------------------------------DataTasks:',DataTasks);
          const FirebaseTaskArray = objectToArray(Notifications);
          // console.log('------------------------------------------------------FirebaseTaskArray:',FirebaseTaskArray);
          global.notifications = FirebaseTaskArray;
          console.log('=====global.notifications CreateTask : ',global.notifications);
          
        //   Dispatch(notificationStore(global.notifications))
          
      }
      await fetchNotifications();


      global.notifications.push({ id: global.notifications.length, title: data.notification.title, body: data.notification.body , userPhoto: global.UserPhoto })
      console.log('====================================');
      console.log('global.Notifications - ', global.notifications);
      console.log('====================================');

      const object = global.notifications.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});

      console.log('Notifications Object=====',object);
      addNotifications('Notifications', object) 

    }

    const opengallery = () => {
        let options = {
            mediaType: 'photo'
        }

         launchImageLibrary (options, (response) => {
            console.log('Response', response)
            if (response.didCancel === true) {
                console.log(response)
            }
            else {
                setSelectedImage(response.assets[0].uri);
                Dispatch(profileImage(response.assets[0].uri));
                console.log('response.assets[0].uri======',response.assets[0].uri);
                
                UserProfileData.uid=auth().currentUser.uid;
                UserProfileData.displayName=auth().currentUser.displayName;
                UserProfileData.email=auth().currentUser.email;
                StoreDeveloperData(response.assets[0].uri);
                
                // UserProfileData.photoURL=  response.assets[0].uri;
                // const fetchDeveloperData = async () => {
                //     try {
                //       const photoURL = await getDeveloperData();
                //       UserProfileData.photoURL = photoURL;
                //     } catch (error) {
                //       console.log(error.message);
                //     }
                //   }
                  
                //   fetchDeveloperData();


                // getDeveloperData();


                // UserProfileData.photoURL = StateData.profile_image;
                
                // addDeveloper(UserProfileData.email,UserProfileData)
                // console.log('--------------addDeveloper(UserProfileData.uid,UserProfileData)-------------');

                const UserPhotoUpdate = async () =>
                {
                    // await auth().currentUser.updateProfile({photoURL: 'https://www.cato.org/sites/cato.org/files/2021-01/John-Glaser.jpg' });
                    console.log('===============Before Update Photo=====================');
                    console.log(auth().currentUser.email,'----------',auth().currentUser.photoURL);
                    console.log('====================================');

                    const photoURL = await getDeveloperData();
                    UserProfileData.photoURL = photoURL;

                    console.log('====================================');
                    console.log('UserProfileData.photoURL======',UserProfileData.photoURL);
                    console.log('====================================');

                    addDeveloper(UserProfileData.email,UserProfileData)
                    console.log('--------------addDeveloper(UserProfileData.uid,UserProfileData)-------------');

                    const FirebaseData = await getDeveloper(auth().currentUser.email)
                    console.log('====================================');
                    console.log('FirebaseData======',FirebaseData);
                    console.log('FirebaseData.photoURL======',FirebaseData.photoURL);
                    console.log('====================================');
                    await auth().currentUser.updateProfile({photoURL: FirebaseData.photoURL });
                    console.log('===============After Update Photo=====================');
                    console.log(auth().currentUser.photoURL);
                    console.log('====================================');
                    global.UserPhoto = auth().currentUser.photoURL;

                    console.log('global.UserPhoto======',global.UserPhoto);
                }
                UserPhotoUpdate(); 

                const data = {
                    to: global.Token ,
                    notification: {
                      title: global.UserName,
                      body: 'Profile Photo Updated',
                    }
                  };
                
        
                PushNot(data)


            }
        })


        // showImagePicker(options,(response) =>{
        //     console.log(response)
        // })
    }

    // useEffect(() => {
    //     setSelectedImage(auth().currentUser)
    // }, []);

    return (
        <View style={{ flex: 1, backgroundColor: containor}}>

            <Text style={styles.heading}>Profile</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginTop:'9%' ,alignSelf:'center'}}>
                <View style={styles.imgview}>
                    {selectedImage && (
                        <Image source={{ uri: selectedImage }} style={styles.img} />
                    )}
                </View>
                <TouchableOpacity onPress={opengallery} style={styles.changeiconbut}>
                    <Image source={ChangeProfile_Icon} style={styles.changeiconimg} />
                </TouchableOpacity>
            </View>
            <Text style={styles.name}>{global.UserName}</Text>
            <TouchableOpacity onPress={changeProfile}>
                <View style={styles.profileview}  >
                    <Image source={EditProfile} style={{ height: 35, width: 35 }} />
                    <Text style={styles.profiletext}>Edit Profile</Text>
                    <AntIcon name="right" size={20} style={{ marginLeft: '45%',color:'grey' }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={onStatistics} >
                <View style={styles.profileview}>
                    <Image source={Statistics_Icon} style={{ height: 32, width: 30 }} />
                    <Text style={styles.statisticsstyle}>Statistics</Text>
                    <AntIcon name="right" size={20} style={{ marginLeft: '48%',color:'grey' }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={logout}>
                <View style={styles.profileview}>
                    <Image source={Logout_Icon} style={{ height: 39, width: 36 }} />
                    <Text style={styles.profiletext}>Log out</Text>
                    <AntIcon name="right" size={20} style={{ marginLeft: '51%',color:'grey' }} />
                </View>
            </TouchableOpacity>

            <Modal animationType="slide"
                transparent visible={isModalVisible}
                presentationStyle="overFullScreen"
            >
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <TextInput placeholder="Enter name"
                            value={inputValue} style={styles.textInput}
                            onChangeText={(value) => setInputValue(value)} />

                        <TouchableOpacity style={styles.setname} onPress={setname}>
                            <Text style={styles.editprofiletext}>Set Name</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.changeimage} onPress={changeimage}>
                            <Text style={styles.editprofiletext}>Change Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.setname} onPress={toggleModalVisibility}>
                            <Text style={styles.editprofiletext}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


        </View>
    )
}
export default Profile
const styles = StyleSheet.create({
    heading: {
        alignSelf: 'center',
        marginTop: '12%',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18,
        
    },
    imgview: {
        height: 165,
        width: 165,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 80,
        borderColor: '#0082E1',
        borderWidth: 2,
        alignSelf: 'center',
        //marginTop: 20,
        //flexDirection: "row",
        //marginLeft: '5%',
        padding: 5
    },
    img: {
        height: '100%',
        width: '100%',
        borderRadius: 80,
        alignSelf: 'center',


    },
    changeiconimg: {
        height: 45,
        width: 45,

        // marginLeft:-32,
        // marginTop:25
    },
    changeiconbut: {
        height: 45,
        width: 45,
        marginTop: 110,
        marginLeft: -40
    },
    name: {
        alignSelf: 'center',
        color: 'black',
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    profileview: {
        flexDirection: 'row',
        alignItems: "center",
        width: '100%',
        marginLeft: '8%',
        marginTop: 30,
    },
    profiletext: {
        color: 'black',
        fontSize: 16,
        marginLeft: 15
    },
    statisticsstyle:{
        color:'black',
        fontSize:16,
        marginLeft:19
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        //justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -90 }],
        height: 250,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    textInput: {
        width: "80%",
        borderRadius: 13,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
        marginTop: 30
    },
    setname: {
        borderWidth: 1,
        borderColor: 'white',
        width: '45%',
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        borderRadius: 9,
        backgroundColor: '#0082E1',
        marginTop: 10,

    },
    changeimage: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#0082E1',
        borderRadius: 9,
        height: 40,
        alignItems: 'center',
        width: '45%',
        justifyContent: 'center',
        marginTop: 10

    },
    editprofiletext: {
        color: 'white', fontWeight: 'bold'
    },

})