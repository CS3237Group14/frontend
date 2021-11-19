import React from 'react'
import { View, Image,  Text, ActivityIndicator, StyleSheet,Dimensions } from 'react-native'
import BlackButton from '../component/BlackButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants'
import {Appbar, Title, Subheading, TextInput} from 'react-native-paper';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import firebase from '../firebasedb';
// import * as firebase from 'firebase/app';
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, set } from "firebase/database";
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
 const auth = getAuth();
class Login extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    signIn: false,
    exists: false
  }

  handleUpdateName = name => this.setState({name})

  handleUpdateEmail = email => this.setState({email})

  handleUpdatePassword = password => this.setState({password})

  handleSignIn = () => {
    signInWithEmailAndPassword(auth, this.state.email, this.state.password);
    this.props.navigation.navigate("Activity");
    // firebaseDb.auth().signInWithEmailAndPassword(this.state.email, this.state.password) .then(() => 
    // this.props.navigation.navigate("Main")
    // // this.setState ({
    // //   name: '',
    // //   email: '',
    // //   password: '',
    // //   signIn: true,
    // //   exists: true})
    // )
    // .catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   if (errorCode === 'auth/wrong-password') {
    //     alert('Wrong password.');
    //   } else {
    //     alert(errorMessage);
    //   }
    //   console.log(error);
    //   });
  }
      

  render() {
    const { name, email, password, signIn, exists } = this.state;

    return (
      <View style={styles.container}>
        <TextInput style={styles.textInput} placeholder="Email" mode="outlined" label="Email" onChangeText={this.handleUpdateEmail} value={email}/>
        <TextInput secureTextEntry style={styles.textInput} placeholder="Password" label="Password" mode="outlined"
        onChangeText={this.handleUpdatePassword} value={password}/>
        <BlackButton style={styles.button} onPress={this.handleSignIn}>
          Sign In
        </BlackButton>
        <Text style={styles.textA}>By proceeding you agree to the </Text><TouchableOpacity onPress={()=>this.props.navigation.navigate('Terms')}><Text style={styles.texta}>Terms of Service and Privacy Policy</Text>
        </TouchableOpacity>
        <Text style={styles.textC}>Don't have an account?</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')}><Text style={styles.textC}> Sign up!</Text></TouchableOpacity>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9FA0FF'
  },
  textInput: {
   // borderRadius: 5,
  //  borderWidth: 2,
    backgroundColor: "white",
    fontSize: 20,
    marginBottom: 8,
    width: (Dimensions.get('window').width>400)?400:Dimensions.get('window').width-40,
  
  },
  button: {
    marginTop: 42,
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
    marginTop: 10,
    textAlign: "center",
    fontSize: 15
  },
  texta: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 15,
    textDecorationLine:"underline"
  }, 
  textC: {
    marginTop : 10,
    //color: 'white',
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
  } 
})

export default Login