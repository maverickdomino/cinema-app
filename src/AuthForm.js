import React, { Component } from 'react';
import './AuthForm.css';
import {app, facebookProv} from './firebase.js';

const auth = app.auth();
class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      textEmail: "",
      textPassword: "",
      infMessage: "",
      className: "errorBox",
      authenticated: false
    }

    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogWithFb = this.handleLogWithFb.bind(this);
    }

    handleSignup(e){
      //TODO: check 4 real email
      const {textEmail,textPassword} = this.state;
     auth.createUserWithEmailAndPassword(textEmail,textPassword)
      .then(() => this.setState({
        infMessage:"registre succesfully",
        className:"errorBox-active",
        authenticated:true
      }))
      .catch((e) => this.setState({
<<<<<<< HEAD
        className:"errorBox-active",  
=======
        className:"errorBox-active",
>>>>>>> 37af726c986f52aac8c1d4f3ea6b93a3ab08ec0d
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
        <section className="container">
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
=======
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
>>>>>>> 37af726c986f52aac8c1d4f3ea6b93a3ab08ec0d
            />
            <button type="button" onClick={this.handleSignup}>
              Sign Up
            </button>
              <br/>
            <button type="button" onClick={this.handleLogin}>
              Log in
            </button>
            <br/>
            <button className="fbButton" type="button" onClick={this.handleLogWithFb}>
              log with facebook
            </button>
<<<<<<< HEAD
          </div>    
=======
          </div>
>>>>>>> 37af726c986f52aac8c1d4f3ea6b93a3ab08ec0d
        </section>
      </div>
    );
  }
}
export default AuthForm;
