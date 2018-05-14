import React, { Component } from 'react';
import './dominikStyles.css';
import Seat from './Seat.js'

class Row extends Component {
	constructor(props) {
    super(props);
		
	this.handleStateChange = this.handleStateChange.bind(this);	
	this.handleOnMouseOverFreePlace = this.handleOnMouseOverFreePlace.bind(this);
	this.handleOnMouseOutFreePlace = this.handleOnMouseOutFreePlace.bind(this);	
	}
	
	handleStateChange(number)
  {
	  this.props.onStateChange(this.props.number,number);
  }
  
  handleOnMouseOverFreePlace(number)
  {
	  this.props.onMouseOverFreePlace(this.props.number,number);

  }
  
  handleOnMouseOutFreePlace(number)
  {
	  
	  this.props.onMouseOutFreePlace(this.props.number,number);
	
  }
	render() {
		let numbers = [];

		for (var i = 0; i < 10; i++) {
		numbers.push(i);
		}
		
		let seats = numbers.map((number) => <Seat key={number} bgColor={this.props.bgColors[number]}
		onStateChange={this.handleStateChange} onMouseOverFreePlace={this.handleOnMouseOverFreePlace}
		onMouseOutFreePlace={this.handleOnMouseOutFreePlace} number={number}/>);
		
		return(
		<ul>
		{seats}
		</ul>
		);
		
	}
	
}

export default Row;