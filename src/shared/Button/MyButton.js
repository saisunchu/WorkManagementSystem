import React from "react";
import { Text, View, StatusBar, TouchableOpacity } from "react-native";
import styles from "./styles";


const MyButton = (props) =>
{
  return(
    <TouchableOpacity style={styles.Button} onPress={props.onPress}>
        <Text style={styles.ButtonText} >{props.text}</Text>
    </TouchableOpacity>
  )
}
export default MyButton;