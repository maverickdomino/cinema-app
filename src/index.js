import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import LiveMovies from './LiveMovies';
import './index.css';
import './MediaQueries.css';
import UpcomingMovies from './UpcomingMovies';

class App extends Component {

    render() {
        return (
            <Router>
            <div className="container">
                <div className="navbar">
                    <ul>
                        <li><Link to="/repertuar">Repertuar</Link></li>
                        <li>Rezerwuj bilet</li>
                        <li>Loguj</li>
                        <li>Rejestruj</li>
                    </ul>
                </div>
                <div className="wrapper">

                    <div className="section-live">
                    <div className="sections-title">FILMY AKTUALNIE GRANE</div>
                        <LiveMovies />
                    </div>

                </div>
            </div>
            </Router>
        )
    }

}




ReactDOM.render(<App />, document.getElementById('root'));
