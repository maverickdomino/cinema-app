import React, {Component} from 'react';
import './dominikStyles.css';
import Row from './Row.js';

class RowsContainer extends Component {
	render() {
		return(
			<div>
			<Row/>
			<Row/>
			</div>
		);
		
	}	
}

export default RowsContainer; 