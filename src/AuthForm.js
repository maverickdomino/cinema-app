import React, { Component } from 'react';
import './AuthForm.css';
<<<<<<< HEAD
import firebase from './firebase.js';

const auth = firebase.auth();
=======
import {app, facebookProv} from './firebase.js';

const auth = app.auth();
>>>>>>> ca57b2aaebc6dbc8439224e9cca66bf36a54b640
class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      textEmail: "",
<<<<<<< HEAD
      textPassword: ""
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
=======
      textPassword: "",
      infMessage: "",
      className: "errorBox",
      authenticated: false
    }

    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogWithFb = this.handleLogWithFb.bind(this);
>>>>>>> ca57b2aaebc6dbc8439224e9cca66bf36a54b640
    }

    handleSignup(e){
      //TODO: check 4 real email
      const {textEmail,textPassword} = this.state;
<<<<<<< HEAD
      const promise = auth.createUserWithEmailAndPassword(textEmail,textPassword);
      console.log(`Email: ${textEmail} passw: ${textPassword}`)
      promise.catch((e) => alert(e.message));
    }
    handleLogin(e){
      const {textEmail,textPassword} = this.state;
      const promise = auth.signInWithEmailAndPassword(textEmail,textPassword);
      promise.catch((e) => alert(e.message));
    }
    //checking if the user was already signed in
    /*firebase.auth().onAuthStateChanged((firebaseUser) =>{
      firebaseUser ? console.log(firebaseUser): console.log('not looged');
    })*/
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
=======
     auth.createUserWithEmailAndPassword(textEmail,textPassword)
      .then(() => this.setState({
        infMessage:"registre succesfully",
        className:"errorBox-active",
        authenticated:true
      }))
      .catch((e) => this.setState({
        className:"errorBox-active",
        infMessage:e.message}))
    }

    handleLogin(e){
      const {textEmail,textPassword} = this.state;
      auth.signInWithEmailAndPassword(textEmail,textPassword)
        .then((result,err) =>{
          if(!err){
          this.setState({authenticated:true})
          this.props.history.push('/userview');
          }
        })
        .catch((e) => this.setState({
          className:"errorBox-active",
          infMessage:e.message
        }))
      }

    //checking if the user was already signed in
    /*auth.onAuthStateChanged((firebaseUser) =>{
      firebaseUser ? console.log(firebaseUser): console.log("not looged");
    })*/

    handleChange(e){
      this.setState({[e.target.name]: e.target.value});
    }

    handleLogWithFb(e){
      const promise = app.auth().signInWithPopup(facebookProv)
        promise.catch((e) => this.setState({label:e.message}));
    }

  render() {
    return (
      <div className="app">
        <header>
            <div className="wrapper-auth">
              <h1>Login/register</h1>
            </div>
        </header>
        <section className="container-auth">
        <div className="logForm">
        <label className={this.state.className}>{this.state.infMessage}</label>
            <input
              type="email"
              name="textEmail"
              placeholder="enter your e-mail"
              value={this.state.textEmail}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="textPassword"
              placeholder="What is you password"
              value={this.state.textPassword}
              onChange={this.handleChange}
>>>>>>> ca57b2aaebc6dbc8439224e9cca66bf36a54b640
            />
            <button type="button" onClick={this.handleSignup}>
              Sign Up
            </button>
              <br/>
            <button type="button" onClick={this.handleLogin}>
              Log in
            </button>
<<<<<<< HEAD
          </div>    
=======
            <br/>
            <button className="fbButton" type="button" onClick={this.handleLogWithFb}>
              log with facebook
            </button>
          </div>
>>>>>>> ca57b2aaebc6dbc8439224e9cca66bf36a54b640
        </section>
      </div>
    );
  }
}
export default AuthForm;