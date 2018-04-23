import React, { Component } from 'react';
import './AuthForm.css';
import firebase from './firebase.js';

class AuthForm extends Component {
  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Login/register</h1>
            </div>
        </header>
        <section className='container'>
              <form className='logForm'>
                <input type="text" name="username" placeholder="What's your name?" />
                <input type="text" name="currentItem" placeholder="What is you password" />
                <button id="btnSignup">Sign Up</button>
                <button id="btnLogin">Log in</button>
              </form>
        </section>
      </div>
    );
  }
}
export default AuthForm;