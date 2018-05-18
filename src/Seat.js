import React, { Component } from 'react';
import './dominikStyles.css';

class Seat extends Component {
	constructor(props) {
    super(props);
	this.handleClick = this.handleClick.bind(this);
	this.handleMouseOver = this.handleMouseOver.bind(this);
	this.handleMouseOut = this.handleMouseOut.bind(this);
  }
  
  handleClick()
  {
	 this.props.onStateChange(this.props.number);
  }
  
  handleMouseOver()
  {
	  this.props.onMouseOverFreePlace(this.props.number);
	  
  }
  
   handleMouseOut()
  {
	  this.props.onMouseOutFreePlace(this.props.number);
	 
  }
	
	render() {

		return(
			<div className='seat' style={{backgroundColor: this.props.bgColor}} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onClick={this.handleClick}>{this.props.number+1}</div>
			
		);
	}
	
}

export default Seat;