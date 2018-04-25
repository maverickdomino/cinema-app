import firebase from 'firebase';

const config = {
	apiKey: "AIzaSyBZSOCqbiLgzpAqRz6KiPnjhSPFn0hXJBA",
    authDomain: "adroit-lantern-169718.firebaseapp.com",
    databaseURL: "https://adroit-lantern-169718.firebaseio.com",
    projectId: "adroit-lantern-169718",
    storageBucket: "adroit-lantern-169718.appspot.com",
    messagingSenderId: "626637546715"
};

firebase.initializeApp(config);
export default firebase;