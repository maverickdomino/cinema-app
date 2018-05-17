import firebase from 'firebase';

const config = {
	apiKey: "AIzaSyBZSOCqbiLgzpAqRz6KiPnjhSPFn0hXJBA",
    authDomain: "adroit-lantern-169718.firebaseapp.com",
    databaseURL: "https://adroit-lantern-169718.firebaseio.com",
    projectId: "adroit-lantern-169718",
    storageBucket: "adroit-lantern-169718.appspot.com",
    messagingSenderId: "626637546715"
};

<<<<<<< HEAD
firebase.initializeApp(config);
export default firebase;
=======
const app = firebase.initializeApp(config);
const facebookProv = new firebase.auth.FacebookAuthProvider();
export {app,facebookProv};
>>>>>>> ca57b2aaebc6dbc8439224e9cca66bf36a54b640
