import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LiveMovies from './LiveMovies';
import './index.css';
import './MediaQueries.css';
import UpcomingMovies from './UpcomingMovies';

class App extends Component {

    render() {
        return (
            <React.Fragment>
            <div className="container">
                <div className="navbar">
                    <ul>
                        <li>Repertuar</li>
                        <li>Rezerwuj bilet</li>
                        <li>Loguj</li>
                        <li>Rejestruj</li>
                    </ul>
                </div>
                <div className="wrapper">
                    <div className="section-upcoming">
                    <span className="sections-title">NADCHODZĄCE PREMIERY</span>
                        <UpcomingMovies />
                    </div>
                    <div className="section-live">
                    <span className="sections-title">FILMY AKTUALNIE GRANE</span>
                        <LiveMovies />
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }

}




ReactDOM.render(<App />, document.getElementById('root'));
