import React, { Component, useState, useEffect} from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Constants } from 'expo';
import {NavigationContainer} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ProgressBar, Subheading, Title} from 'react-native-paper';
import { getDatabase, ref, onValue,onChildAdded, set, push,get, child,   } from 'firebase/database';
import Firebase from './config/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import * as firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import firebasedb from '../firebasedb';
//import functions from '../functions/index';
import {getFunctions, httpsCallable} from 'firebase/functions';
import Moment from 'moment';
import { database } from '@react-native-firebase/database';
import BlackButton from '../component/PurpleButton'; 
import Chart from './chart'; 
const Stack = createStackNavigator();
// const navigation = useNavigation();
function changepage() {
  return (

    <NavigationContainer independent={true}>
      <Stack.Navigator  mode='modal' headerMode='none'>
        <Stack.Screen name = 'Activity' component={Activity}/>
        <Stack.Screen name = 'Chart' component={Chart}/>
        </Stack.Navigator>
      </NavigationContainer>
    
  )
}
//import functions from '@react-native-firebase/functions';
// //import { initializeApp } from "firebase/app";
// //import { getAnalytics } from "firebase/analytics";
// //import { getDatabase } from "firebase/database";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBdZuOO1qtHlAkfp4g4IBxXPJcltAcYHtw",
//   authDomain: "motion-detection-40f42.firebaseapp.com",
//   databaseURL: "https://motion-detection-40f42-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "motion-detection-40f42",
//   storageBucket: "motion-detection-40f42.appspot.com",
//   messagingSenderId: "163846818222",
//   appId: "1:163846818222:web:2c967ba407c5086554e03f"
// };

// // Initialize Firebase
// // let app;
// // if (firebase.apps.length === 0) {
// //   app = firebase.initializeApp(firebaseConfig);
// // } else {
// //   app = firebase.app()
// // }
// //firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();

const MINUTE_MS = 2000;
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyBdZuOO1qtHlAkfp4g4IBxXPJcltAcYHtw",
  authDomain: "motion-detection-40f42.firebaseapp.com",
  databaseURL: "https://motion-detection-40f42-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "motion-detection-40f42",
  storageBucket: "motion-detection-40f42.appspot.com",
  messagingSenderId: "163846818222",
  appId: "1:163846818222:web:2c967ba407c5086554e03f"
  });
const functions = getFunctions(firebaseConfig);
//var resultList = [];
var percentage; 
var result_data=0;
var result_time=[];
var activity = '';
// function setupActivityListener() {
    
//     const resultList = [];
//     const db = getDatabase();
//     getAuth().onAuthStateChanged(function(user) {
//         if (user) {
//             console.log("hello hello heelo ");
        
//         }
//     });
//     const reference = ref(db, 'users/' + user.uid); //can put in the user id and get as per the signin done
//     onValue(reference, (snapshot) => {
//         if (snapshot.val()!=null) {
//             for (let i of Object.values(snapshot.val())) {
//                 console.log("result", i.result)
//                 resultList.push(i.result);
//             }
//         } else {
//             console.log("No data for this user");
//         }
//     });
//     return resultList;


// }
var userid; 
var counter_check=0; 
function setupActivityListener() {
    var resultList = [];
    // const result=0; 
    const db = getDatabase();
    const reference = ref(db, 'users/' + userid);
    onValue(reference, (snapshot) => {
        if (snapshot) {
            resultList=[]; 
            result_time=[]; 
            for (let i of Object.values(snapshot.val())) {
                // console.log("result", i.result)
                resultList.push(i.result);
                result_time.push(i.timestamp); 
                counter_check=counter_check+1; 
                //console.log(i); 
            }
        } else {
            console.log("No data for this user");
        }
    });
    return resultList;
}
Date.prototype.minusDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() - days);
    return date;
}
function long_term_analysis(){
    //var percentage=0;
    Moment.locale('en');
    const predlist=[];
    const db= getDatabase();
    getAuth().onAuthStateChanged(function(user){
        if(user){
            var nowdate= new Date();
            let day= nowdate.getDay();  //sunday ==0, monday ==1, tuesday ==2...........
            if(day>0)      //if not sunday then just -1 to align with our data
                day=day-1;
            else //for sunday assign it to value 6
                day=6;
            const reference = ref(db, 'users/' + user.uid);
            userid=user.uid; 
            const dbref= ref(db);
            const t=0;
            let data; 
            let time_start_flag=0;
            let cumm_time=0; 
            let time_start=0;
            let time_end=0; 
            let counter_start=0;
            let counter_end=0;
            let time_stop=nowdate.minusDays(day);
            let time_stop_mod= new Date(time_stop.getFullYear(), time_stop.getMonth(), time_stop.getDate()); 
            //var percentage=0;
            console.log("testing 1 2 3"); 
            get(child(dbref, 'users/' + user.uid)).then((snapshot)=>{
                if(snapshot.val()!=null){
                    console.log("run once only");
                    data=snapshot.val(); 
                    console.log(data);
                    for(let j of Object.values(data)){
                        if(j!=null){
                        let prediction=j.result;
                        let timestamp=j.timestamp;
                        
                        let time_start_monitor=new Date(timestamp[0], timestamp[1]-1,timestamp[2], timestamp[3], timestamp[4]);
                        console.log("time start: ",time_stop_mod);
                        
                        if(time_start_monitor>=time_stop_mod && time_start_monitor<=nowdate){
                        if(prediction==0 && time_start_flag==0)
                            counter_start=0;
                        else if (time_start_flag==0 && prediction!=0){
                            counter_start=counter_start+1;
                            //console.log("differnce in start counter: ", counter_start);
                        }
                        if(counter_start==3 && time_start_flag==0){
                            time_start=time_start_monitor;
                            time_start_flag=1; 
                        }
                        if(time_start_flag==1 && prediction==0)
                        counter_end=counter_end+1;
                        else if (time_start_flag==1 && prediction!=0)
                        counter_end=0;
        
                        if(counter_end==3 && time_start_flag==1){
                            time_end=time_start_monitor;
                            time_start_flag=0;
                            cumm_time=cumm_time+((time_end-time_start)/60000);
                            console.log("time start2: ",time_start);
                            console.log("time end: ",time_end);
                            console.log("cummulative time: ", cumm_time);
                            counter_end=0;
                            counter_start=0; 
                        }
        
        
                    }
                }
                }
                console.log("cumm check: ", cumm_time);
                percentage = cumm_time/150;
                console.log("Percentage: ", percentage); 
                //return percentage; 
                }
                
            });
            //console.log("Percentgae check in func: ", percentage); 
            //return percentage;
         }
     })
     //console.log("Percentgae check in func: ", percentage); 
     //return percentage; 
}
export default function Activity() {

    const [result, setResult] = useState(-1);
    const [image, setImage] = useState(require('../assets/cat-standing.png'));
    const [imageUrl, setImageUrl] = useState('../assets/cat-standing.png');
    const [count, setCount] = useState(0);
    //const [percentage, setPercentage] = useState(0)
    const [components, setComponents] = useState({
        percentage: 0.0, //to obtained form firebase as a part of long term analysis 
        health_message:null, 
        color_cond:"", 
        act_message:"", 
    })

    // const [percentage, setPercentage] = setState(0.15);
    // const [healthMessage, setHealthMessage] = setState(null);
    // const [colorCond, setColorCond] = setState("");
    // const [actMessage, setActMessage] = setState("");
    // const setResultUI = (returnedResult) => {  
        
    //     if (returnedResult !== result) {
    //         console.log(returnedResult, result);

    //     } else {
    //         console.log('update percentage', percentage);
    //         setPercentage((p) => p + 0.1);
    //     }
        
    // }
    useEffect(() => {
        long_term_analysis();
        console.log("percent check:", percentage); 
    //     setPercentage((p) => {
    //             return percent;
    //         });
    // setPercentage(percent);
      },[])
    useEffect(() => {
        let imageNew = image;
        //setPercentage(0);
        if ((result) == 1) {
            imageNew = require('../assets/cat_walk.gif');
            activity= "walking "; 
        } else if ((result ) == 2) {
            imageNew = require('../assets/cat_jump.gif');
            activity= "jumping ";
        } else if ((result) == 3) {
            imageNew = require('../assets/cat_run.gif');
            activity="running ";
        } else {
            imageNew = require('../assets/cat_rest.gif');
            activity="exercising "; 
        }
        setImage(imageNew); 
    }, [result])


    useEffect(() => {
        const interval = setInterval(() => {
          const results = setupActivityListener();
          //long_term_analysis();
          
          console.log("Counter check: ", counter_check); 
          if (results) {
            console.log("Result every 1 second: ", results[results.length-2])
                console.log("Set result: ", results )
                console.log("Result_time: ", result_time)
                // if (results[results.length - 1] != result) {
                //     console.log(result);
                //     console.log(count);
                //     setCount((c) => c + 1);
                // }
                // if (count > 3) {
                    setResult((e) => {
                        var counter_walk=0; 
                        var counter_run=0; 
                        var counter_jump=0; 
                        var counter_rest=0;
                        var result_arr= [results[results.length - 4], results[results.length - 3], results[results.length - 2]];
                        console.log(result_arr); 
                        if(result_arr !=null){
                        for(let i in result_arr){
                            console.log(i);
                            if(result_arr[i]==1)
                            counter_walk=counter_walk+1;
                            else if (result_arr[i]==2)
                            counter_jump=counter_jump+1;
                            else if (result_arr[i]==3)
                            counter_run=counter_run+1;
                            else
                            counter_rest=counter_rest+1;
                        }
                        console.log(counter_jump);
                        console.log(counter_walk);
                        console.log(counter_rest);
                        console.log(counter_run);
                        if(counter_walk>counter_jump && counter_walk>counter_rest && counter_walk>counter_run)
                        return 1
                        else if(counter_jump>counter_walk && counter_jump>counter_rest && counter_jump>counter_run)
                        return 2
                        else if(counter_run>counter_jump && counter_run>counter_rest && counter_run>counter_walk)
                        return 3
                        else if(counter_rest>counter_jump && counter_rest>counter_run && counter_rest>counter_walk)
                        return 0
                        else 
                        return result_arr[1]
                        // if (results[results.length - 1] != e) {
                        //     return results[results.length - 1];
                        //     //return result_data; 
                        // }
                        // return e;
                    } 
                    });
                //     setCount(0); 
                // }
                // setPercentage((p) => {
                    
                //         return p; 
                    
                // });
          }
        }, MINUTE_MS)

        // useEffect(() => {
        //     let imageNew = image;
        //     //setPercentage(0);
        //     if ((result) == 1) {
        //         imageNew = require('../assets/cat_walk.gif');
        //         activity= "walking "; 
        //     } else if ((result ) == 2) {
        //         imageNew = require('../assets/cat_jump.gif');
        //         activity= "jumping ";
        //     } else if ((result) == 3) {
        //         imageNew = require('../assets/cat_run.gif');
        //         activity="running ";
        //     } else {
        //         imageNew = require('../assets/cat_rest.gif');
        //         activity="exercising "; 
        //     }
        //     setImage(imageNew); 
        // }, [result_data]); 
    
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, []);
    
    const updateMessage = () =>{
        if (percentage <= 0.2){
            setComponents((e) => { return {
                percentage: percentage,
                health_message: "You and your pet are close to being unhealthy !! ", 
                color_cond: "#e60909", 
                act_message:"Keep " +activity+ "to prevent your pet from getting sick !"
            }})
        }
        else if (percentage>0.2 && percentage<=0.85){
            setComponents((e) => { return {
                percentage: percentage,
                health_message: "You and your pet are on the road to being healthy !!", 
                color_cond: "#eaf51b", 
                act_message:"Keep " +activity+ "to see improvement on the health status of your cat !"
            }}) 
        }
        else  {
            setComponents((e) => { return {
                percentage: percentage,
                health_message: "You and your pet are very healthy !!", 
                color_cond: "#1bf543", 
                act_message:"You are " +activity+ "well !! Keep going !!"}
            })
        }
    }

    useEffect(() => {
        updateMessage()
    }, [result])
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
          <Text style={styles.text1}>{components.health_message} </Text>
          <ProgressBar progress={percentage} color={components.color_cond} style={styles.progress}/>
          <Image source={image} style={styles.image} />
          <Text style={styles.text1}>{components.act_message} </Text>
          {/* <TouchableOpacity onPress={()=>navigation.navigate('Chart')}><Text style={styles.text1}>Calories Burnt !</Text></TouchableOpacity> */}
          <BlackButton style={styles.button} onPress={() =>navigation.navigate('Chart')}>Calories Burnt!</BlackButton> 
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
    height: 300,
    width: 300,
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
  
  button: {
    borderRadius:15,
    width: 200,
    height: 55,
    marginBottom: 30,
    alignSelf:"center",
    justifyContent:"center", 
    borderColor: 'black', 
    borderTopColor:'black', 
    borderWidth: 3
  },
});
