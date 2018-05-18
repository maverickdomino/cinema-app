import React, { Component } from 'react';
import './AuthForm.css';
import {app, user,facebookProv} from './firebase.js';

const auth = app.auth();
const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: 'localhost:3000/userview',
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios'
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
      }
    };

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

    handleSignup(e){
      //TODO: check 4 real email
      const {textEmail,textPassword} = this.state;

      if(textPassword !== '' && textPassword.length >= 6){
      auth.sendSignInLinkToEmail(textEmail, actionCodeSettings)
        .then(
              () =>{ 
                this.setState({
                  infMessage:"auth email has sended succesfully, please check your email box",
                  className:"errorBox-active",
                })
                window.localStorage.setItem('emailForSignIn', textEmail);
                //auth.createUserWithEmailAndPassword(textEmail,textPassword)  
              }
                  // )
            // .catch((e) => this.setState({
            //   className:"errorBox-active",
            //   infMessage:e.message}))
            // }
          )

        .catch((e) => this.setState({
                className:"errorBox-active",
                infMessage:e.message
              }));
      }else {this.setState({
                      infMessage:"Podaj conajmniej 6 literowe hasło",
                      className:"errorBox-active",
                    })
        }
    }
    handleLogin(e){
      const {textEmail,textPassword} = this.state;
      auth.signInWithEmailAndPassword(textEmail,textPassword)
        .then((result,err) =>{
          if(!err){
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
            <button type="button" onClick={this.handleSignup}>
              Zarejestruj
            </button>
              <br/>
            <button type="button" onClick={this.handleLogin}>
              Zaloguj
            </button>
            <br/>
            <button className="fbButton" type="button" onClick={this.handleLogWithFb}>
              Zaloguj przez facebook
            </button>
          </div>    
        </section>
      </div>
    );
  }
}
export default AuthForm;
