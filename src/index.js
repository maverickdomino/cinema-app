import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CinemaRoom from './CinemaRoom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CinemaRoom />, document.getElementById('root'));
registerServiceWorker();
