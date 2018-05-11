import React, {Component} from 'react';
import './dominikStyles.css';
import Row from './Row.js';

class RowsContainer extends Component {
	render() {
		let rowsNumbers = [];
		for (var i = 1; i <= 12; i++) {
		rowsNumbers.push(i);
		}
		
		const rows = rowsNumbers.map((number) => <div class="row"><Row/></div>);
		
		return(
			<div id='rowsContainer'>
			{rows}
			</div>
		);
		
	}	
}

export default RowsContainer; 