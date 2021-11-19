// components/signup.js

import React from 'react'
import { View, KeyboardAvoidingView, Image, Text, StyleSheet,Dimensions } from 'react-native'
import BlackButton from '../component/BlackButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {CheckBox} from 'react-native-elements'
import Constants from 'expo-constants'
import {Appbar, Title, Subheading, TextInput} from 'react-native-paper';
//import firebase from '../firebasedb'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import * as firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdZuOO1qtHlAkfp4g4IBxXPJcltAcYHtw",
  authDomain: "motion-detection-40f42.firebaseapp.com",
  databaseURL: "https://motion-detection-40f42-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "motion-detection-40f42",
  storageBucket: "motion-detection-40f42.appspot.com",
  messagingSenderId: "163846818222",
  appId: "1:163846818222:web:2c967ba407c5086554e03f"
};

// Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app()
// }
//firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export default class SignUpContainer extends React.Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      isLoading: false, 
      //signUpSuccess:false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
        //signUpSuccess:true
      })
      
      createUserWithEmailAndPassword(auth, this.state.email, this.state.password);
      this.props.navigation.navigate('Activity');
      // })
      // .catch(error => this.setState({ errorMessage: error.message }))      
     }
  }
  handleUser = (uid) => {
    const db = getDatabase();
  set(ref(db, 'users/' + uid), {
    username: this.state.displayName,
    email: this.state.email,
  })
    .catch(err => console.error(err))
  }
  render(){
  return (
    <View style={styles.container}>
    <TextInput style={styles.textInput} placeholder="Name" label="Name" mode = "outlined" onChangeText={(val) => this.updateInputVal(val, 'displayName')} value={this.state.displayName}/>
    <TextInput style={styles.textInput} placeholder="Email" label="Email" mode="outlined" onChangeText={(val) => this.updateInputVal(val, 'email')} value={this.state.email}/>
    <TextInput secureTextEntry style={styles.textInput} placeholder="Password" label="Password" mode="outlined"
    onChangeText={(val) => this.updateInputVal(val, 'password')} value={this.state.password}/>
    <CheckBox containerStyle={{backgroundColor: '#9FA0FF',borderColor:'#9FA0FF'}} tintColors={{ true: '#757BC8', false: '#000000' }}
    title ={<View>
      <Text style={styles.textA}>I agree to the </Text>
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Terms')}><Text style={styles.texta}>Terms of Service and Privacy Policy</Text></TouchableOpacity>
      </View>} checked={this.state.checked} onPress={() => this.setState({checked: !this.state.checked})}/>
    <BlackButton style={styles.button} onPress={() => {
      //if (this.state.displayName.length && this.state.email.length && this.state.password.length && this.state.checked == true) {
        this.registerUser()
        //this.handleUser()
      //}
      //else {
      //   this.setState({
      //     displayName: '',
      //     email: '',
      //     password: '',
          
      //   }) 
      // }
    }}>
      Sign Up
    </BlackButton>
    {/* {
      signUpSuccess == true && <Text style={styles.text}>Sign Up Successful!</Text> 
      || signUpSuccess == false && done && <Text style={styles.textB}>Sign Up Unsuccessful!</Text>
    } */}
    <Text style={styles.textC}>Already have an account?</Text>
    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}><Text style={styles.textC}> Log In</Text></TouchableOpacity>
</View>

  );
  }
}

const styles = StyleSheet.create({
container: { 
flex: 1,
flexDirection: 'column',
justifyContent: 'center',
alignItems: 'center',
//backgroundColor: '#ffebcd'
backgroundColor: "#9FA0FF", 
},
textInput: {
// borderRadius:5,
// borderWidth: 2,
backgroundColor:'white',
fontSize: 20,
marginBottom: 8,
width: (Dimensions.get('window').width>400)?400:Dimensions.get('window').width-40,
},
button: {
marginTop: 10,
borderRadius:20,
width:150,
height:45
},
text: {
fontSize: 20,
color: 'green',
marginTop: 40
},
textA: {
//marginTop:25,
textAlign: "center",
fontSize: 15
},
texta:{
//marginTop:25,
textAlign: "center",
fontSize: 15,
textDecorationLine:'underline'
},
textB: {
fontSize: 20,
color: 'red',
marginTop: 40
},
textC: {
marginTop : 10,
//color: 'white',
textAlign: "center",
fontWeight: "bold",
fontSize: 20
}
})