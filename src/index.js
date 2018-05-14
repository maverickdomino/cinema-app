import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import ReactDOM from 'react-dom';
import LiveMovies from './LiveMovies';
import './index.css';
import './MediaQueries.css';
import AuthForm from './AuthForm';

class App extends Component {

    render() {
        return (
            <Router>
            <div className="container">
                <div className="navbar">
                    <ul className="navList">
                        <li><NavLink to="/" activeClassName="activeNav">Strona główna</NavLink></li>
                        <li><NavLink to="/repertuar" activeClassName="activeNav">Repertuar</NavLink></li>
                        <li>Rezerwuj bilet</li>
                        <li><NavLink to="/loguj" activeClassName="activeNav">Loguj</NavLink></li>
                        <li>Rejestruj</li>
                    </ul>
                </div>
                <div className="wrapper">
                <Switch>
                    <Route exact path="/loguj" component={AuthForm} />
                    <Route exact path="/" component={LiveMovies} />
                </Switch>
                </div>
            </div>
            </Router>
        )
    }

}
ReactDOM.render(<App />, document.getElementById('root'));
