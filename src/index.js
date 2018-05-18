import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import ReactDOM from 'react-dom';
import LiveMovies from './LiveMovies';
import './index.css';
import './MediaQueries.css';
import AuthForm from './AuthForm';
import CinemaRoom from './CinemaRoom';
import {app, facebookProv} from './firebase.js';
import PrivateRoute from './PrivateRoute';
import Information from './Information';

const auth = app.auth();

class App extends Component {
      
    state = { loading: true, authenticated: false, user: null };
      
      componentWillMount() {

            auth.onAuthStateChanged(user => {
            if (user) {
              this.setState({
                authenticated: true,
                currentUser: user,
                loading: false
              });
            } else {
              this.setState({
                authenticated: false,
                currentUser: null,
                loading: false
              });
            }
          });
        }

    render() {
        const { authenticated, loading } = this.state;
        if (loading) {
            return <p>Loading..</p>;
        }

        return (
            <Router basename={process.env.PUBLIC_URL}>
            <div className="container">
                <div className="navbar">
                    <ul className="navList">
                        <li><NavLink exact to="/" activeClassName="activeNav">Strona główna</NavLink></li>
                        <li><NavLink to="/repertuar" activeClassName="activeNav">Repertuar</NavLink></li>
                        <li><NavLink to="/rezerwacja" activeClassName="activeNav">Rezerwuj bilet</NavLink></li>
                        <li><NavLink to="/autoryzacja" activeClassName="activeNav">Zaloguj/Zarejestruj</NavLink></li>
                    </ul>
                </div>
                <div className="wrapper">
                <Switch>
                    <Route exact path="/" component={LiveMovies} />
                    <Route path="/autoryzacja" component={AuthForm} />
                    <Route path="/informacja" component={Information} />
                </Switch>
                <PrivateRoute exact path="/rezerwacja" component={CinemaRoom} authenticated={authenticated}/>
                </div>
            </div>
            </Router>
        )
    }

}
ReactDOM.render(<App />, document.getElementById('root'));
