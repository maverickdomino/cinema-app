import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import ReactDOM from 'react-dom';
import LiveMovies from './LiveMovies';
import './index.css';
import './MediaQueries.css';
import UpcomingMovies from './UpcomingMovies';
import AuthForm from './AuthForm';
import CinemaRoom from './CinemaRoom';

class App extends Component {

    render() {
        return (
            <Router>
            <div className="container">
                <div className="navbar">
                    <ul className="navList">
                        <li><NavLink exact to="/cinema-app" activeClassName="activeNav">Strona główna</NavLink></li>
                        <li><NavLink to="/repertuar" activeClassName="activeNav">Repertuar</NavLink></li>
                        <li><NavLink to="/rezerwacja" activeClassName="activeNav">Rezerwuj bilet</NavLink></li>
                        <li><NavLink to="/user" activeClassName="activeNav">Zaloguj/Zarejestruj</NavLink></li>
                    </ul>
                </div>
                <div className="wrapper">
                <Switch>
                    <Route exact path="/cinema-app" component={LiveMovies} />
                    <Route path="/user" component={AuthForm} />
                    <Route path="/rezerwacja" component={CinemaRoom} />
                </Switch>
                </div>
            </div>
            </Router>
        )
    }

}
ReactDOM.render(<App />, document.getElementById('root'));
