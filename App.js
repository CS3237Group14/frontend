import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Image, Text, ImageBackground , ScrollView} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants'
import WhiteButton from "./component/WhiteButton";
import SignUpContainer from "./container/SignUpContainer"
import running from "./container/running"
import walking from "./container/walking"
import jumping from "./container/jumping"
import Login from "./container/Login"
import Activity from "./container/Activity"

import no_activity from "./container/noactivity"
// import Main from "./container/Main"
import TermsCond from "./container/TermsCond"
// import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
// import firebaseDb from './firebaseDb'
import BlackButton from './component/BlackButton';


// function Separator() {
//   return <View style={styles.separator} />;
// }

function HomeScreen({navigation}) {
  return (
<SafeAreaView style={styles.container}>
<Image style={styles.image} source={require('./assets/unnamed.png')}/>
  <Text style={styles.textb}>PETCISE</Text>
  <Text style={styles.textn}>Let's get healthy !!</Text>
  <ScrollView style={styles.scrollview}>
      <WhiteButton style={styles.button} onPress={() =>navigation.navigate('SignUp')}>Sign Up</WhiteButton>
      <WhiteButton style={styles.button} onPress={() =>navigation.navigate('Login')}>Log In</WhiteButton>
      <WhiteButton style={styles.button} onPress={() =>navigation.navigate('running')}>Running</WhiteButton>
      <WhiteButton style={styles.button} onPress={() =>navigation.navigate('walking')}>Walking</WhiteButton>
      <WhiteButton style={styles.button} onPress={() =>navigation.navigate('jumping')}>Jumping</WhiteButton>
      <WhiteButton style={styles.button} onPress={() =>navigation.navigate('no_activity')}>No activity</WhiteButton>
      <WhiteButton style={styles.button} onPress={() =>navigation.navigate('Activity')}>Activity</WhiteButton>
  </ScrollView>
      {/* <WhiteButton style={{    borderRadius:15,
        width: 200,
        height: 50,
        marginBottom: 30
        }} 
        onPress={() =>{navigation.navigate('google')}}>Google Sign In</WhiteButton> */}
</SafeAreaView>
  );
}

const Stack = createStackNavigator();



class App extends Component {
  
    // componentDidMount() {
    //   GoogleSignin.configure({
    //     webClientId: '458566252197-f3juqgm6r2es8cjk2vat5t10nd37s5tf.apps.googleusercontent.com', 
    //     offlineAccess: true, 
    //     hostedDomain: '', 
    //     loginHint: '', 
    //     forceConsentPrompt: true, 
    //   });

    // }
    render() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator presentation='modal' headerMode="none">
        { <Stack.Screen name="Home" component={HomeScreen}/> }
        {<Stack.Screen name="SignUp" component={SignUpContainer}/> }
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="running" component={running}/>
        <Stack.Screen name="walking" component={walking}/>
        <Stack.Screen name="jumping" component={jumping}/>
        <Stack.Screen name="no_activity" component={no_activity}/>
        <Stack.Screen name="Activity" component={Activity}/>

        {/* <Stack.Screen name="Main"  options={{headerLeft:null}} component={Main}/>*/}
        <Stack.Screen name="Terms" component={TermsCond}/>
        {/*<Stack.Screen name="google"  options={{headerLeft:null}} component={signgoogle}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}

// export class signgoogle extends Component {

//   state = {
//     user: false
//   }

//   async componentDidMount() {
//     try {
//       // add any configuration settings here:
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       // create a new firebase credential with the token
//       const credential = firebaseDb.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
//       // login with credential
//       alert(userInfo.idToken)
//       firebaseDb.firestore()
//       .collection('users')
//       .doc(user.user.uid)
//       .set ({
//         name: user.user.displayName,
//         email: user.user.email,
//         phoneNumber: user.user.phoneNumber,
//         photoURL: user.user.photoURL
//       })
//       .catch(err => console.error(err))
//       this.setState({user:user.user})
//     } 
//     catch (error) {
//       console.log(error)
//     }
//   }
//   render() {
//     return(

//       <SafeAreaView style={styles.container1}>
//       <BlackButton style={styles.button} onPress={()=>{
//         if(this.state.user.uid) {
//         this.props.navigation.navigate("Main")
//         }
//         else {
//           alert("please sign in")
//           this.props.navigation.navigate("Home")
//         }
//       }}>
//           Let's Go
//         </BlackButton>
//       </SafeAreaView>
//     )
//   }
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent:"center",
    //alignItems:"center",
    backgroundColor: '#3A54CD',
  },
  container1: { 
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#ffebcd',
  },
  button: {
    borderRadius:15,
    width: 200,
    height: 55,
    marginBottom: 30,
    alignSelf:"center",
    justifyContent:"center"
  },
  textb: {
    color: "white",
    fontSize: 48,
    fontWeight:"bold",
    alignSelf:"center",
    justifyContent:'center'
  },
  textn: {
    color: "white",
    fontSize: 30,
    marginBottom: 40,
    alignSelf:"center",
    justifyContent:"center"
  },
  image: {
    height: 200,
    width: 200,
    alignSelf:"center",
    justifyContent:"center",
    marginTop: 100,
    resizeMode: 'contain',
    
  }
});

export default App