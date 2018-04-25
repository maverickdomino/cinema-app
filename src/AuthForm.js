import React, { Component } from 'react';
import './AuthForm.css';
import firebase from './firebase.js';

const auth = firebase.auth();
class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      textEmail: "",
      textPassword: ""
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }

    handleSignup(e){
      const {textEmail,textPassword} = this.state;
      console.log(`Email: ${textEmail} passw: ${textPassword}`)
    }
    handleLogin(e){
      const {textEmail,textPassword} = this.state;
      const promise = auth.signInWithEmailAndPassword(textEmail,textPassword)
      promise.catch((e) => alert(e.message));
    }
    handleChange(e){
      this.setState({[e.target.name]: e.target.value});
    } 
  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Login/register</h1>
            </div>
        </header>
        <section className='container'>
        <div className="logForm">
            <input 
              type="email" 
              name="textEmail" 
              placeholder="What's your name?"
              value={this.state.textEmail}
              onChange={this.handleChange} 
            />
            <input 
              type="password" 
              name="textPassword" 
              placeholder="What is you password"
              value={this.state.textPassword}
              onChange={this.handleChange}  
            />
            <button type="button" onClick={this.handleSignup}>
              Sign Up
            </button>
              <br/>
            <button type="button" onClick={this.handleLogin}>
              Log in
            </button>
          </div>    
        </section>
      </div>
    );
  }
}
export default AuthForm;