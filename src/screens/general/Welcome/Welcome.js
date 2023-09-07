import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { Welcom_BCK } from "../../../assets/assets";
import MyButton from "../../../shared/Button/MyButton";
import styles from "./styles";
import FastImage from "react-native-fast-image";
const Welcome = ({navigation}) =>
{
  const gotoHome = () =>
  {
    navigation.navigate('Login');
  }
  return(
    <View style={styles.containor}>
      {/* <ImageBackground source={Welcom_BCK} style={styles.imageBck} resizeMode='center' >
      </ImageBackground> */}
      <FastImage source={Welcom_BCK} style={styles.imageBck}   />
      <View style={styles.welcomeTextView}>
        <Text style={styles.welcomeText} >Welcome to Go Task</Text>
        <Text style={styles.welcomeTextBody} >A workspace to over 10 million influencers around the global of the world. </Text>
      </View>
      <View style={styles.ButtonView} >  
        <MyButton text={`Let's Start`} onPress={gotoHome} />
      </View>
    </View>
  )
}
export default Welcome;