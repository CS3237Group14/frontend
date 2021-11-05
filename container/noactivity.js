import React, { Component } from 'react';
import { Image, View, StyleSheet , Text } from 'react-native';
import { Constants } from 'expo';
import {ProgressBar} from 'react-native-paper';


export default class App extends Component {

   
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text1}>You are standing !! </Text>
        <Image source={require('../assets/catstanding.jpg')} style={styles.image} />
        <Text style={styles.text1}>Start exercising to keep your pet fit ! </Text>
      </View>
    );
  }
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
    marginRight: 40
    
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
    marginBottom:20,},
});
