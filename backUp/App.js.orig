import React, { Component } from 'react';
import './App.css';
import AuthForm from './AuthForm';
import UserView from './userView';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

function AuthenticatedRoute({component:Component, authenticated, ...rest}){
	return(
		<Route {...rest}
			render = {(props) => authenticated === true
				? <Component {...props} {...rest}/>
				: <Redirect to = '/'/>}
		/>
	)
}

class App extends Component {
  render() {
    return (
    	<Router>
	      <Switch>
	        <Route exact path = "/" render = {props => <AuthForm {...props}/>}/>
	        <AuthenticatedRoute exact path = "/userview"  component = {UserView} /*authenticated = {this.state.authenticated}*//>
	      </Switch>
	    </Router>  
    );
  }
}

export default App;
