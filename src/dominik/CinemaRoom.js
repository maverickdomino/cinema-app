import React, { Component } from 'react';
import './dominikStyles.css';
import Screen from './Screen.js';
import RowsContainer from './RowsContainer.js';
import Legend from './Legend.js';

class CinemaRoom extends Component {
  render() {
    return (
		<div>
			<Screen/>
			<RowsContainer/>
			<Legend/>
			
		</div>
    );
  }
}

export default CinemaRoom;
