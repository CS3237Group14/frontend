import React, { Component } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { Constants } from 'expo';
import {ProgressBar, Subheading, Title} from 'react-native-paper';

export default class App extends Component {

    state = {
        percentage:0.15, //to obtained form firebase as a part of long term analysis 
        health_message:null, 
        color_cond:"", 
        act_message:"", 
    }

    updateMessage = () =>{
        if (this.state.percentage<=0.2){
            this.setState({
                health_message: "You and your pet are close to being unhealthy !! ", 
                color_cond: "#e60909", 
                act_message:"Keep running to prevent your pet from getting sick !"
            })
        }
        else if (this.state.percentage>0.2 && this.state.percentage<=0.85){
            this.setState({
                health_message:"You and your pet are on the road to being healthy !!" , 
                color_cond:"#eaf51b",
                act_message:"Keep walking to see improvement on the health status of your cat !"
            })
        }
        else  {
            this.setState({
                health_message:"You and your pet are very healthy !!" , 
                color_cond:"#1bf543",
                act_message:"You are walking well !!          Keep going !!"
            })
        }
        }
        componentDidMount() {
            this.updateMessage();
            
          }
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.text1}>{this.state.health_message} </Text>
          <ProgressBar progress={this.state.percentage} color={this.state.color_cond} style={styles.progress}/>
          <Image source={require('../assets/cat-running.gif')} style={styles.image} />
          <Text style={styles.text1}>{this.state.act_message} </Text>
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
