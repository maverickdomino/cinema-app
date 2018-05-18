import React, { Component } from 'react';
import { BrowserRouter, NavLink, Switch } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import './MediaQueries.css';
import Router from './Router';

class App extends Component {

    render() {
        console.log('url', process.env.PUBLIC_URL)
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="container">
                <div className="navbar">
                    <ul className="navList">
                        <li><NavLink exact to="/" activeClassName="activeNav">Strona główna</NavLink></li>
                        <li><NavLink to="/repertuar" activeClassName="activeNav">Repertuar</NavLink></li>
                        <li><NavLink to="/rezerwacja" activeClassName="activeNav">Rezerwuj bilet</NavLink></li>
                        <li><NavLink to="/user" activeClassName="activeNav">Zaloguj/Zarejestruj</NavLink></li>
                    </ul>
                </div>
                <Router />
            </div>
            </BrowserRouter>
        )
    }

}
ReactDOM.render(<App />, document.getElementById('root'));
