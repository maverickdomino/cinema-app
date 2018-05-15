import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import LiveMovies from './LiveMovies';
import './index.css';
import CinemaRoom from './CinemaRoom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CinemaRoom />, document.getElementById('root'));
registerServiceWorker();
