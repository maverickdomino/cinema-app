import React, {Component} from 'react';
//import './AuthForm.css'
import {app} from './firebase.js';

const auth = app.auth();

class LogOut extends Component {


	componentDidMount() {
	    auth.onAuthStateChanged(user => {
	      if(user){
	        auth.signOut()
	        .then(console.log("signout"))
	      }
	    })
	  }

	render() {
		return(
		<div className="inf">
			<h1>Wylogowano pomyślne</h1>
		</div>
		);
		
	}
	
}

export default LogOut;