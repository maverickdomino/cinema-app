import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import LiveMovies from './LiveMovies';
import './index.css';
import './MediaQueries.css';
import UpcomingMovies from './UpcomingMovies';
import AuthForm from './AuthForm';
import Repertuar from './Repertuar';

//import CinemaRoom from './CinemaRoom';
//import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<CinemaRoom />, document.getElementById('root'));

class App extends Component {

    render() {
        return (
            <Router>
            <div className="container">
                <div className="navbar">
                    <ul>
                        <li><Link to="/">Strona główna</Link></li>
                        <li><Link to="/repertuar">Repertuar</Link></li>
                        <li>Rezerwuj bilet</li>
                        <li><Link to="/loguj">Loguj</Link></li>
                        <li>Rejestruj</li>
                    </ul>
                </div>
                <div className="wrapper">
                    <Route path="/loguj" exact component={AuthForm} />
                    <Route path="/" exact component={LiveMovies} />
                    <Route path="/repertuar" exact component={Repertuar} />

                    </div>

                </div>
            </Router>
        )
    }

}




ReactDOM.render(<App />, document.getElementById('root'));
//>>>>>>> ca57b2aaebc6dbc8439224e9cca66bf36a54b640
