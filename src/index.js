import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import ReactDOM from 'react-dom';
import LiveMovies from './LiveMovies';
import './index.css';
import './MediaQueries.css';
import AuthForm from './AuthForm';
import CinemaRoom from './CinemaRoom';
import {app} from './firebase.js';
import PrivateRoute from './PrivateRoute';
import Information from './Information';
import LogOut from './LogOut';
import Repertuar from './Repertuar';
const auth = app.auth();

class App extends Component {
    constructor(props){
        super(props);
        this.state = { 
            loading: true, 
            authenticated: false, 
            user: null,
            index: 0,
            ids: [],
            linkLabel: "Zaloguj/Zarejestruj",
            logOutPath: "/autoryzacja" 
        }
        this.handleClick = this.handleClick.bind(this);
    }  

    handleClick(index,ids)
    {
        this.setState({
            index: index,
            ids: ids,
        });
    }
      componentWillMount() {
            auth.onAuthStateChanged(user => {
            if (user) {
              this.setState({
                authenticated: true,
                currentUser: user,
                loading: false,
                linkLabel: "wyloguj",
                logOutPath: "/logout",
              });
            } else {
              this.setState({
                authenticated: false,
                currentUser: null,
                loading: false,
                linkLabel: "Zaloguj/Zarejestruj",
                logOutPath: "/autoryzacja"
              });
            }
          });
        }

    render() {
        const { authenticated, loading, linkLabel,logOutPath } = this.state;
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
                        <li><NavLink to={this.state.logOutPath} activeClassName="activeNav">{this.state.linkLabel}</NavLink></li>
                    </ul>
                </div>
                <div className="wrapper"
>                <Switch>
                    <Route exact path="/" component={LiveMovies} />
                    <Route path="/autoryzacja" component={AuthForm} />
                    <Route path="/informacja" component={Information} />
                    <Route path="/logout" render={(props) => <LogOut authenticated={this.state.authenticated} {...props} />} />
                    <Route path="/repertuar" render={(props) => <Repertuar {...props} onClick={this.handleClick}/>} />
                <PrivateRoute path="/rezerwacja" authenticated={authenticated} component={(props) => <CinemaRoom {...props} id={this.state.ids[this.state.index]}/>} />
                </Switch>
                </div>
            </div>
            </Router>
        )
    }

}
ReactDOM.render(<App />, document.getElementById('root'));
