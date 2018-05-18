import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import {app, user,facebookProv} from './firebase.js';

const auth = app.auth();
export default class App extends React.Component {
  	constructor(props) {
    super(props);
    }

  render() {
    if (auth.isSignInWithEmailLink(window.location.href)) {
  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  // the sign-in operation.
  // Get the email if available. This should be available if the user completes
  // the flow on the same device where they started it.
  var email = window.localStorage.getItem('emailForSignIn');
  console.log(email);
    if (!email) {
//     // User opened the link on a different device. To prevent session fixation
//     // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation');
    }
  // The client SDK will parse the code from the link for you.
  auth.signInWithEmailLink(email, window.location.href)
    .then(function(result) {
      // Clear email from storage.
      window.localStorage.removeItem('emailForSignIn');
      console.log(result.user)
      console.log(result.additionalUserInfo.isNewUser)
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
    })
    .catch(function(error) {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    });
}

            // After asking the user for their email.
         auth.fetchSignInMethodsForEmail(textEmail)
        .then(function(signInMethods) {
          // This returns the same array as fetchProvidersForEmail but for email
          // provider identified by 'password' string, signInMethods would contain 2
          // different strings:
          // 'emailLink' if the user previously signed in with an email/link
          // 'password' if the user has a password.
          // A user could have both.
          if (signInMethods.indexOf(
                  auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) !== -1) {
            // User can sign in with email/password.
          }
           if (signInMethods.indexOf(
                   auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD) !== -1) {
             // User can sign in with email/link.
          }
        })
        .catch(function(error) {
          // Some error occurred, you can inspect the code: error.code
        });

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
    return (
      <div className="App">
        <article>SUCCCES</article>
       </div>
    );
  }
}
export default userView;