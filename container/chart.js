import React, { Component, useState, useEffect} from 'react';
import { Image, View, StyleSheet, Text, Dimensions } from 'react-native';
import { Constants } from 'expo';
import {ProgressBar, Subheading, Title} from 'react-native-paper';
import { getDatabase, ref, onValue,onChildAdded, set, push,get, child,   } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import Firebase from './config/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import * as firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import firebasedb from '../firebasedb';
//import functions from '../functions/index';
import {getFunctions, httpsCallable} from 'firebase/functions';
import Moment, { max } from 'moment';
import { database } from '@react-native-firebase/database';
import BlackButton from '../component/PurpleButton';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { color } from 'react-native-reanimated';

var running =[0,0,0,0,0,0,0];
var walking=[0,0,0,0,0,0,0];
var jumping=[0,0,0,0,0,0,0]; 
var dateslabel=[]; 
var totalcalorie=0;
var sum=0; 
async function long_term_analysis(){
    //var percentage=0;
    Moment.locale('en');
    const predlist=[];
    const db= getDatabase();
    //getAuth().onAuthStateChanged(function(user){
        //if(user){
            //const [jumping_new, setJumpNew] =useState([0,0,0,0,0,0,0]); 
            let jumping_new = [0,0,0,0,0,0,0];
            var nowdate= new Date();
            let day= nowdate.getDay();  //sunday ==0, monday ==1, tuesday ==2...........
            if(day>0)      //if not sunday then just -1 to align with our data
                day=day-1;
            else //for sunday assign it to value 6
                day=6;
            //const reference = ref(db, 'users/' + user.uid);
            //userid=user.uid; 
            const dbref= ref(db);
            const t=0;
            let data; 
            let time_start_flag=0;
            let cumm_time=0; 
            let time_start=0;
            let time_end=0; 
            let counter_start=0;
            let counter_end=0;
            let time_stop=nowdate.minusDays(6);
            let time_stop_mod= new Date(time_stop.getFullYear(), time_stop.getMonth(), time_stop.getDate()); 
            console.log("time stop mod: ", time_stop_mod);
            let counter_running=0;
            let counter_walking=0; 
            let counter_jumping=0; 
            //var percentage=0;
            console.log("testing 1 2 3"); 
            await get(child(dbref, 'users/' + 'D47VUtocuWPNKunLFkA6u1WMFQr1')).then((snapshot)=>{
                if(snapshot.val()!=null){
                    console.log("run once only");
                    data=snapshot.val(); 
                    console.log(data);
                    for(let j of Object.values(data)){
                        let prediction=j.result;
                        let timestamp=j.timestamp;
                        
                        let time_start_monitor=new Date(timestamp[0], timestamp[1]-1,timestamp[2], timestamp[3], timestamp[4]);
                        //console.log("time start: ",time_start_monitor);
                        
                        if(time_start_monitor>=time_stop_mod && time_start_monitor<=nowdate){
                        console.log("time_stop_mod: ", time_stop_mod); 
                        if(prediction==0 && time_start_flag==0)
                            counter_start=0;
                        else if (time_start_flag==0 && prediction!=0){
                            counter_start=counter_start+1;
                            // if(prediction==1)
                            // counter_walking=counter_walking+1; 
                            // if(prediction==3)
                            // counter_running=counter_running+1;
                            // if(prediction==2)
                            // counter_jumping=counter_jumping+1;
                            //console.log("differnce in start counter: ", counter_start);
                        }
                        if(counter_start==3 && time_start_flag==0){
                            time_start=time_start_monitor;
                            console.log("i run this code",time_start);
                            time_start_flag=1; 
                            if(prediction==1)
                            counter_walking=counter_walking+1; 
                            if(prediction==3)
                            counter_running=counter_running+1;
                            if(prediction==2)
                            counter_jumping=counter_jumping+1;
                            
                        }
                        if(time_start_flag==1){
                            if(prediction==1)
                            counter_walking=counter_walking+1; 
                            if(prediction==3)
                            counter_running=counter_running+1;
                            if(prediction==2)
                            counter_jumping=counter_jumping+1;
                        }
                        let currtime;
                        let nowtime; 
                        if(time_start_flag==1){
                        time_start= new Date(time_start); 
                        //console.log("time Start checking : ", time_start); 
                         currtime= new Date(time_start.getFullYear(), time_start.getMonth(), time_start.getDate());
                         //console.log("time Start checking 2: ", currtime); 
                         nowtime= new Date(time_start_monitor.getFullYear(), time_start_monitor.getMonth(), time_start_monitor.getDate()); }
                        if(currtime+1==nowtime && time_start_flag==1){
                        counter_end=3;
                        
                    }
                        else if(time_start_flag==1 && prediction==0)
                        counter_end=counter_end+1;
                        else if (time_start_flag==1 && prediction!=0)
                        counter_end=0;
        
                        if(counter_end==3 && time_start_flag==1){
                            time_end=time_start_monitor;
                            time_start_flag=0;
                            cumm_time=((time_end-time_start)/60000);
                            // console.log("time start2: ",time_start);
                            console.log("time end: ",time_end);
                            // console.log("cummulative time: ", cumm_time);
                            let dateformate= time_start.getDate()+"/"+time_start.getMonth();
                            dateslabel.push(dateformate);
                            let diff= (new Date(time_end.getFullYear(), time_end.getMonth(), time_end.getDate())- time_stop_mod)/86400000 ;
                            console.log("difference=", diff); 
                            if(counter_jumping>counter_running && counter_jumping>counter_walking){
                            jumping[diff]=jumping[diff]+(cumm_time*8);
                            //walking[diff]=(0);
                            //running[diff]=(0);
                            }
                            else if(counter_running>counter_jumping && counter_running>counter_walking){
                            running[diff]=running[diff]+(cumm_time*11.4);
                            //jumping[diff]=(0); 
                            //walking[diff]=(0); 
                            }
                            else{
                            walking[diff]=walking[diff]+(cumm_time*3.3);
                            //running[diff]=(0);
                            //jumping[diff]=(0);
                            }
                            
                            
                            console.log("print counter: ", counter_running); 
                            console.log("running: ", running); 

                            counter_end=0;
                            counter_start=0;
                            //setJumpNew((e) => {e[3] = 0; return e}); 
                            jumping_new[3] =10;
                            counter_jumping=0;
                            counter_running=0;
                            counter_walking=0; 
                        }
                        
                        if(currtime+1==nowtime){
                            cumm_time=0; }
        
        
                    }
                }
                //console.log("cumm check: ", cumm_time);
                console.log("walk check: ", walking);
                console.log("jump check: ", jumping);
                console.log("jump new check: ", running);
                
                //console.log("Percentage: ", ); 
                //return percentage; 
                }
                
            });

            
            return jumping; 
}

function resetstates(){
  jumping=[0,0,0,0,0,0,0];
  running=[0,0,0,0,0,0,0];
  walking=[0,0,0,0,0,0,0];
  sum=0;
}
export default function chartdisplay(){
    const [datas, setDatas] = useState([]); 
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        //Alert.alert('Refreshed');
      });
      return unsubscribe;
    }, [navigation]);
    useEffect(() => {
        long_term_analysis().then((e) => setDatas(e)).catch(e => console.log(e));
        //setDatas(long_term_analysis());
        //setDatas(data);
        //console.log("percent check:", percentage); 
    //     setPercentage((p) => {
    //             return percent;
    //         });
    // setPercentage(percent);
      },[])
      console.log("jumping new check in main: ", datas); 

    

    for (let i = 0; i < 7; i++) {
        sum += jumping[i]+running[i]+walking[i];
    }
    const navigation=useNavigation(); 
      return (
        <View style={styles.container}>
            <Text style = {styles.text1}>Your Calorie Tracker for the Last 7 Days !! </Text>
  <LineChart
    data={{
      labels: ['T-6', 'T-5', 'T-4', 'T-3', 'T-2', 'T-1', 'Today(T)'],
      datasets: [
        // {
        //   data: running
        // }, 
        {
        data: jumping,
        color: (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`
    },
        {
            data: running,
            color: (opacity = 0.5) => `rgba(155, 34, 38, ${opacity})`},
            {
                data: walking, 
         color: (opacity = 0.5) => `rgba(0, 0, 255, ${opacity})`},
        // {
        //     data: walking}, 
      ],
      legend: ['Jumping', 'Running', 'Walking']
    }}
    width={(Dimensions.get('window').width>400)?400:Dimensions.get('window').width-40 } // from react-native
    height={400}
    //yAxisLabel="Calories burnt"
    
    yAxisSuffix="cal"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#ada7ff",
      backgroundGradientFrom: "#e0c3fc",
      backgroundGradientTo: "#8187dc",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#000000"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
  <Text style = {styles.text1}>You burnt <Text style= {styles.text2}>{sum}</Text> calories. </Text>
   <BlackButton style={styles.button} onPress={() => {navigation.navigate('Activity'); resetstates()}}>Activity Time!</BlackButton> 
        </View>
      );

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
    },
    image: {
      height: 400,
      width: 400,
      alignSelf:"center",
      justifyContent:"center",
      marginTop: 100,
      resizeMode: 'contain',
      
    },
    progress: {
      height: 20,
      width:350, 
      borderColor:'#000000',
      borderRadius: 30,
      borderWidth:2, 
      backgroundColor:"#ffffff", 
      
    },
    text1 :{
      fontSize: 26,
      fontWeight:"bold",
      alignSelf:'center',
      marginTop:10,
      //textDecorationLine:"underline",
      justifyContent: 'center',
      marginBottom:10,
      textAlign: 'center',
      marginBottom:20,
  
    },
    text2 :{
        fontSize: 26,
        fontWeight:"bold",
        alignSelf:'center',
        marginTop:10,
        //textDecorationLine:"underline",
        justifyContent: 'center',
        marginBottom:10,
        textAlign: 'center',
        marginBottom:20,
        color: "#757BC8", 
    
      },
      button: {
        borderRadius:15,
        width: 200,
        height: 55,
        marginBottom: 30,
        alignSelf:"center",
        justifyContent:"center", 
        borderWidth: 3, 
      },
  });

