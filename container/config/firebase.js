import {initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBdZuOO1qtHlAkfp4g4IBxXPJcltAcYHtw",
    authDomain: "motion-detection-40f42.firebaseapp.com",
    databaseURL: "https://motion-detection-40f42-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "motion-detection-40f42",
    storageBucket: "motion-detection-40f42.appspot.com",
    messagingSenderId: "163846818222",
    appId: "1:163846818222:web:2c967ba407c5086554e03f"
};

const Firebase = initializeApp(firebaseConfig);

export default Firebase;

