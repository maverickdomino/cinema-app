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
    }

    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogWithFb = this.handleLogWithFb.bind(this);
    }

   componentWillMount() {
    auth.onAuthStateChanged(user => {
      if(user){
        auth.signOut()
        .then(console.log("signout"))
      }
    })
  }

    handleSignup(e){
      //TODO: check 4 real email
      const {textEmail,textPassword} = this.state;
     auth.createUserWithEmailAndPassword(textEmail,textPassword)
      .then(() => this.setState({
        infMessage:"registre succesfully",
        className:"errorBox-active",
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
            this.props.history.push('/rezerwacja');
          }
        })
        .catch((e) => this.setState({
          className:"errorBox-active",
          infMessage:e.message
        }))
      }

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
              <h1>Zaloguj/Zarejestruj</h1>
            </div>
        </header>
        <section className="container-auth">
        <div className="logForm">
        <label className={this.state.className}>{this.state.infMessage}</label>
            <input
              type="email"
              name="textEmail"
              placeholder="wpisz swój adres e-mail"
              value={this.state.textEmail}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="textPassword"
              placeholder="wpisz swoje hasło"
              value={this.state.textPassword}
              onChange={this.handleChange}
            />
            <button type="button" onClick={this.handleLogin}>
              Zaloguj
            </button>
            <br/>
            <button className="fbButton" type="button" onClick={this.handleLogWithFb}>
              zaloguj się przez facebooka
            </button>
              <br/>
            <button type="button" onClick={this.handleSignup}>
              Nie masz jeszcze konta?
            </button>
          </div>    
        </section>
      </div>
    );
  }
}
export default AuthForm;
