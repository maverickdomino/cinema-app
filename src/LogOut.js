import React, {Component} from 'react';
//import './AuthForm.css'
import {app} from './firebase.js';

const auth = app.auth();

class LogOut extends Component {

	componentWillMount() {
		let {authenticated} = this.props;
      	console.log("user from logout: "+auth.user);
      	console.log("auth from logout: "+authenticated);
      if(authenticated){
        auth.signOut()
        .then(console.log("signout"))
      }
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