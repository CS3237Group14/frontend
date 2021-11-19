const functions = require("firebase-functions");
const admin= require("firebase-admin");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld3 = functions.https.onRequest((request, response) => {
// //   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
admin.initializeApp();

exports.long_term_analysis = functions.https.onCall((data) => {
  //   functions.logger.info("Hello logs!", {structuredData: true});
  //  response.send("Hello from Firebase!");
  admin.database().ref("/users"+ data.uid).then(()=>{
    return data;
  });
});
