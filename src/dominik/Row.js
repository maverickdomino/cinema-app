import React, { Component } from 'react';
import './dominikStyles.css';
import Seat from './Seat.js'

class Row extends Component {
	render() {
		let numbers = [];

		for (var i = 1; i <= 16; i++) {
		numbers.push(i);
		}
		
		const seats = numbers.map((number) => <Seat number={number}/>);
		
		return(
		<ul>
		{seats}
		</ul>
		);
		
	}
	
}

export default Row;