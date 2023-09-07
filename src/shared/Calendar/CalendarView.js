import { View, StyleSheet, Text } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { WhiteImage } from '../../assets/assets';
import { LinearGradientSecondary, LinearGradientPrimary, black, white, grey, containor } from '../../assets/colors';

import { useDispatch } from 'react-redux';
import { upcomingTaskDate } from '../../actions/Actions';
import { useEffect } from 'react';




const CalendarView = () => {

  const currentDate = new Date();
  const options = { weekday: 'long', day: '2-digit', month: 'short' };
  const options2 = { year: 'numeric', month: '2-digit', day: '2-digit' };

  console.log('Inside Component ---- CalenderView-------');

  const Dispatch = useDispatch();
  const getDate = (output) =>
  {
      const date = new Date(output).toLocaleDateString('zh-CN',options2).replace(/\//g, '-');
      console.log('=======getDate : ',typeof(date))

      Dispatch(upcomingTaskDate(date));
  }

  useEffect(()=>{
    console.log('Current Date -- ',currentDate.toLocaleDateString('zh-CN',options2).replace(/\//g, '-'));
    Dispatch(upcomingTaskDate(currentDate.toLocaleDateString('zh-CN',options2).replace(/\//g, '-')));
    console.log('useEffect  ---- CalenderView-------');
  },[])

  return(
  <View style={styles.container}>
    <View style={styles.DateView} >
      <Text style={styles.Today} >Today</Text>
      <Text style={styles.Date} >{currentDate.toLocaleDateString('en-UK', options)}</Text>
    </View>
    <CalendarStrip
      
      style={{height:70, width:'100%', backgroundColor: containor }}
      
      scrollable= {true}
      scrollerPaging= {true}
      highlightDateNumberStyle={{backgroundColor:LinearGradientPrimary, borderRadius:20, height:25, width:25, paddingTop:'6%', color: white, }}
      dateNameStyle={{marginBottom:'25%', color:grey}}
      highlightDateNameStyle={{marginBottom:'12%', color:grey}}
      dateNumberStyle={{color:grey}}
      iconLeft={false}
      iconRight={false}
      showMonth={false}
      onDateSelected={getDate}
      selectedDate={currentDate}
      upperCaseDays={false}
      

    />
    
  </View>
  )
  };
export default CalendarView; 

const styles = StyleSheet.create({
  container: 
  { 
    // flex: 1,
    justifyContent:'center',
    backgroundColor:containor,
    // borderWidth:1,
  },
  DateView:
  {
    marginLeft:'8%',
    // borderWidth:1,
  },
  Date:
  {
    fontSize:23,
    // fontWeight:'bold',
    color: black,
  },
  Today:
  {
    fontSize:18,
    color: grey,
  }
  
});