import React, {useState, useEffect} from 'react'
import { View, KeyboardAvoidingView, Image, Text, StyleSheet,Dimensions } from 'react-native'
//import firebasedb from '../firebasedb'; 
import BlackButton from '../component/BlackButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {CheckBox} from 'react-native-elements'
import Constants from 'expo-constants'
import {Appbar, Title, Subheading, TextInput} from 'react-native-paper';
import {noactivity} from '../container/noactivity';
// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
//import 'firebase/auth';
import { getDatabase, ref, onValue, set, push } from 'firebase/database';

// setupHighscoreListener("Mn_sVvUNDGZ6S31_Gn9") {
//   const db = getDatabase();
//   const reference = ref(db, 'users/' + "Mn_sVvUNDGZ6S31_Gn9");
//   onValue(reference, (snapshot) => {
//     const highscore = snapshot.val().name;
//     console.log("New high score: " + highscore);
//   });
// };
//import * as firebase from 'firebase';
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
const Firebase = initializeApp(firebaseConfig);
console.log(Firebase);
//const auth = Firebase.auth()

// function setupHighscoreListener() {
//   const db = getDatabase();
//   const reference = ref(db);
//   onValue(reference, (snapshot) => {
//     console.log("New high score: " + highscore);
//   });
// }

function storeHighScore(score) {
  const db = getDatabase();
  const reference = ref(db, 'users/' + 'yinK7Dkc2lbPNhLxOSHiTTEkJiD3');
  const newRef = push(reference);
  set(newRef, {
    highscore: score,
  });
}

function setupHighscoreListener() {
  const resultList = [];
  const db = getDatabase();
  const reference = ref(db, 'users/' + 'yinK7Dkc2lbPNhLxOSHiTTEkJiD3');
  onValue(reference, (snapshot) => {
    for (let i of Object.values(snapshot.val())) {
      console.log("result", i.result)
      resultList.push(i.result);
    }
    console.log("Not New high score: " + snapshot.val());
    return resultList;
  });
}

// export { auth };

const MINUTE_MS = 4000;

export default function SignUpContainer() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState('');

  const handleUpdateName = name => setName(name)

  const handleUpdateEmail = email => this.setEmail(email)

  const handleUpdatePassword = password => this.setPassword(password)

  // componentDidMount() {
  // //storeHighScore(555);
  // setupHighscoreListener();
  // }

  
  const handleSignUp =  async ()=> {
    // try {
    //   if (this.state.email !== '' && this.state.password !== '') {
    //     await Firebase.createUserWithEmailAndPassword(this.state.email, this.state.password);
    //   }
    // } catch (error ) {
    //   // setSignupError(error.message);
    //   alert(error.message);
    // }
    // auth
    //   .createUserWithEmailAndPassword(this.state.email, this.state.password)
    //   .then(userCredentials => {
    //     const user = userCredentials.user;
    //     console.log('Registered with:', user.email);
    //   })
    //   .catch(error => alert(error.message))
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password) 
    .then((res) => {
      res.user.updateProfile({
        displayName: this.state.name,
        email: this.state.email
      })
      var uid = res.user.uid;
      this.handleUser(uid)
      this.props.navigation.navigate("Main")
    })
    .catch(function(error) {
      // Handle Errors here.
      //var errorCode = error.code;
      var errorMessage = error.message;
      // if (errorCode == 'auth/weak-password') {
      //   alert('The password is too weak.');
      // } else {
        alert(errorMessage);
      //}
      console.log(error);
  })
};

useEffect(() => {
  const interval = setInterval(() => {
    console.log('Logs every minute');
    const results = setupHighscoreListener();
    console.log("Every 4 seconds: ", results)
    if (results) {
      setResult(results[0]);
    }
  }, MINUTE_MS);

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, []);
  
  //  handleUser = () => {
  //   const uid = firebase.auth().currentUser.uid;

  //   const usersRef = ref.child('users');
  //   usersRef.set({
  //   uid: {
  //     name: this.state.name,
  //     email: this.state.email,
  //     password: this.state.password,
  //     phoneNumber: null,
  // }
  // .catch(err => console.error(err))
//});
//     // firebasedb.firestore()
//     // .collection('users')
//     // .doc(uid)
//     // .set ({
//     //   name: this.state.name,
//     //   email: this.state.email,
//     //   password: this.state.password,
//     //   phoneNumber: null,
//     //   photoURL: this.state.photo
//     // })
//     // .catch(err => console.error(err))
//}

    return (
     <View style={styles.container}>
        <TextInput style={styles.textInput} placeholder="Name" label="Name" mode = "outlined" onChangeText={handleUpdateName} value={name}/>
        <TextInput style={styles.textInput} placeholder="Email" label="Email" mode="outlined" onChangeText={handleUpdateEmail} value={email}/>
        <TextInput secureTextEntry style={styles.textInput} placeholder="Password" label="Password" mode="outlined"
        onChangeText={handleUpdatePassword} value={password}/>
        {/* <TextInput secureTextEntry style={styles.textInput} placeholder="Repeat Password" label="Repeat Password" mode="outlined"
        onChangeText={handleUpdatePassword1} value={password1}/> */}
        <CheckBox containerStyle={{backgroundColor: '#ffebcd',borderColor:'#ffebcd'}} 
        title ={<View>
          <Text style={styles.textA}>I agree to the </Text>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Terms')}><Text style={styles.texta}>Terms of Service and Privacy Policy</Text></TouchableOpacity>
          </View>} checked={checked} onPress={() => setChecked(!checked)}/>
        <BlackButton style={styles.button} onPress={() => {
          if (name.length && email.length && password.length && password == password && checked == true) {
           //this.handleSignUp()
           setupHighscoreListener()
            //this.handleCreateUser()
            //this.handleUser()
          }
          // else {
          //   this.setState({
          //     name: '',
          //     email: '',
          //     password: '',
          //     password1:'',
          //     signUpSuccess: false,
          //     done: true
          //   }) 
          // }
        }}>
          Sign Up
        </BlackButton>
        {
          signUpSuccess == true && <Text style={styles.text}>Sign Up Successful!</Text> 
          || signUpSuccess == false && done && <Text style={styles.textB}>Sign Up Unsuccessful!</Text>
        }
        <Text style={styles.textC}>Already have an account?</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignIn')}><Text style={styles.textC}> Sign in</Text></TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffebcd'
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
    marginTop: 20,
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