import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import {app, user, facebookProv} from './firebase.js';

const auth = app.auth();
class UserView extends React.Component {
  	constructor(props) {
    super(props);


// Confirm the link is a sign-in with email link.
if (auth.isSignInWithEmailLink(window.location.href)) {
  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  // the sign-in operation.
  // Get the email if available. This should be available if the user completes
  // the flow on the same device where they started it.
  let email = window.localStorage.getItem('emailForSignIn');
  console.log(email);
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    email = window.prompt('Please provide your email for confirmation');
  }
  // The client SDK will parse the code from the link for you.
  auth.signInWithEmailLink(email, window.location.href)
    .then(function(result) {
      // Clear email from storage.
      window.localStorage.removeItem('emailForSignIn');
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
        console.log(result.additionalUserInfo.isNewUser)
    })
    .catch(function(error) {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    });
}

   }
 

     // auth.createUserWithEmailAndPassword(textEmail,textPassword)
     //  .then(
     //    (user) =>{
     //      user.sendEmailVerification().then(
     //        () => {console.log("email send")},(error) =>{console.log(error.message)}
     //        //   () => this.setState({
     //        //     infMessage:"registre succesfully",
     //        //     className:"errorBox-active",
     //        // })
     //      )
     //    }
     //  )
  render(){
    return (
      <div className="App">
        <article>SUCCCES</article>
       </div>
    );
  }
}
export default UserView;
