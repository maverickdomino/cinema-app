import React, { Component } from 'react';
import './dominikStyles.css';

class Seat extends Component {
	constructor(props) {
    super(props);
    this.state = {free: true,
					booked: false,
					chosen: false,
					bgColor: '#3355FF'};
	this.handleClick = this.handleClick.bind(this);
	this.handleMouseOver = this.handleMouseOver.bind(this);
	this.handleMouseOut = this.handleMouseOut.bind(this);
  }
  
  handleClick()
  {
	  if(this.state.free)
	  {
		  this.setState({
			free: false,
			chosen: true,
			bgColor: 'green',
		  }); 
	  }
	  if(this.state.chosen)
	  {
		  this.setState({
			  chosen: false,
			  free: true,
			  bgColor: '#3355FF',
		  });
	  }
  }
  
  handleMouseOver()
  {
	 if(this.state.free)
	 {
		 this.setState({
			 bgColor: 'blue',
		 });
	 }
  }
  
   handleMouseOut()
  {
	 if(this.state.free)
	 {
		 this.setState({
			 bgColor: '#3355FF',
		 });
	 }
  }
	
	render() {

		return(
			<div class='seat' style={{backgroundColor: this.state.bgColor}} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onClick={this.handleClick}>{this.props.number}</div>
			
		);
	}
	
}

export default Seat;