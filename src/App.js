import React, { Component } from 'react';
import './App.css';
import AuthForm from './AuthForm';
import UserView from './userView';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

class App extends Component {
  render() {
    return (
    	<Router>
	      <Switch>
	        <Route exact path = "/" render = {props => <AuthForm {...props}/>}/>
	        <Route exact path = "/userview" render = {() => <UserView/>}/>
	      </Switch>
	    </Router>  
    );
  }
}

export default App;
