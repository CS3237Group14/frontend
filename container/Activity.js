import React, { Component, useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { Constants } from 'expo';
import {ProgressBar, Subheading, Title} from 'react-native-paper';
import { getDatabase, ref, onValue, set, push } from 'firebase/database';
import Firebase from './config/firebase';

const MINUTE_MS = 2000;

function setupActivityListener() {
    const resultList = [];
    const db = getDatabase();
    const reference = ref(db, 'users/' + 'yinK7Dkc2lbPNhLxOSHiTTEkJiD3');
    onValue(reference, (snapshot) => {
        if (snapshot) {
            for (let i of Object.values(snapshot.val())) {
                // console.log("result", i.result)
                resultList.push(i.result);
            }
        } else {
            console.log("No data for this usre");
        }
    });
    return resultList;
}

export default function Activity() {

    const [result, setResult] = useState(-1);
    const [image, setImage] = useState(require('../assets/catstanding.jpg'));
    const [imageUrl, setImageUrl] = useState('../assets/catstanding.jpg');
    const [count, setCount] = useState(0);
    const [percentage, setPercentage] = useState(0)
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
        let imageNew = image;
        setPercentage(0);
        if ((result+ 1) == 1) {
            imageNew = require('../assets/cat-walking.gif');
        } else if ((result + 1) == 2) {
            imageNew = require('../assets/cat-jumping.gif');
        } else if ((result + 1) == 3) {
            imageNew = require('../assets/cat-running.gif');
        } else {
            imageNew = require('../assets/catstanding.jpg');
        }
        setImage(imageNew); 
    }, [result])


    useEffect(() => {
        const interval = setInterval(() => {
          const results = setupActivityListener();
          if (results) {
            console.log("Result every 1 second: ", results[results.length - 1])
                console.log("Set result")
                // if (results[results.length - 1] != result) {
                //     console.log(result);
                //     console.log(count);
                //     setCount((c) => c + 1);
                // }
                // if (count > 3) {
                    setResult((e) => {
                        if (results[results.length - 1] != e) {
                            return results[results.length - 1]
                        }
                        return e;
                    });
                //     setCount(0); 
                // }
                setPercentage((p) => {
                    if (p == 1) {
                        return p
                    } else {
                        return p + 0.1
                    }
                });
          }
        }, MINUTE_MS);
      
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, []);

    const updateMessage = () =>{
        if (percentage <= 0.2){
            setComponents((e) => { return {
                percentage: percentage,
                health_message: "You and your pet are close to being unhealthy !! ", 
                color_cond: "#e60909", 
                act_message:"Keep running to prevent your pet from getting sick !"
            }})
        }
        else if (percentage>0.2 && percentage<=0.85){
            setComponents((e) => { return {
                percentage: percentage,
                health_message: "You and your pet are on the road to being healthy !!", 
                color_cond: "#eaf51b", 
                act_message:"Keep walking to see improvement on the health status of your cat !"
            }}) 
        }
        else  {
            setComponents((e) => { return {
                percentage: percentage,
                health_message: "You and your pet are very healthy !!", 
                color_cond: "#1bf543", 
                act_message:"You are walking well !!          Keep going !!"}
            })
        }
    }

    useEffect(() => {
        updateMessage()
    }, [percentage])

    return (
      <View style={styles.container}>
          <Text style={styles.text1}>{components.health_message} </Text>
          <ProgressBar progress={percentage} color={components.color_cond} style={styles.progress}/>
          <Image source={image} style={styles.image} />
          <Text style={styles.text1}>{components.act_message} </Text>
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
});
