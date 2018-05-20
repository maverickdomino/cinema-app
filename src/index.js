import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import LiveMovies from './LiveMovies';
import './index.css';
import './MediaQueries.css';
//import UpcomingMovies from './UpcomingMovies';
import AuthForm from './AuthForm';
import Repertuar from './Repertuar';
import CinemaRoom from './CinemaRoom';

class App extends Component {
	constructor(props){
        super(props);
        this.state = {
			id: 'id',
			title: 'title',
			day: 'day',
			hour: 'hour',
			room: 0,
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(id,title,day,hour,room)
	{
		this.setState({
			id: id,
			title: title,
			day: day,
			hour: hour,
			room: room,
		});
	}

    render() {

        return (
            <Router>
				<div className="container">
					<div className="navbar">
						<ul>
							<li><Link to="/">Strona główna</Link></li>
							<li><Link to="/repertuar">Repertuar</Link></li>
							<li>Rezerwacja</li>
							<li><Link to="/loguj">Loguj</Link></li>
							<li>Rejestruj</li>
						</ul>
					</div>
					<div className="wrapper">
						<Route path="/loguj" exact component={AuthForm} />
						<Route path="/" exact component={LiveMovies} />
						<Route path="/repertuar" render={(props) => <Repertuar {...props} onClick={this.handleClick}/> }/>
						<Route path={`/${this.state.id}`} render={(props) => <CinemaRoom {...props} 
						id={this.state.id} title={this.state.title} day={this.state.day}
						hour={this.state.hour} room={this.state.room}/> }/>
					</div>
				</div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

