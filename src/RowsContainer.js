import React, {Component} from 'react';
import './dominikStyles.css';
import Row from './Row.js';

class RowsContainer extends Component {
	constructor(props) {
    super(props);
	
	this.handleStateChange = this.handleStateChange.bind(this);
	this.handleOnMouseOverFreePlace = this.handleOnMouseOverFreePlace.bind(this);
	this.handleOnMouseOutFreePlace = this.handleOnMouseOutFreePlace.bind(this);
	}
	
	
	handleStateChange(row, col)
  {

		 this.props.onStateChange(row,col);
		
  }
  
  handleOnMouseOverFreePlace(row, col)
  {
	this.props.onMouseOverFreePlace(row,col);

  }
  
  handleOnMouseOutFreePlace(row, col)
  {
	  this.props.onMouseOutFreePlace(row,col);

  }
  
	render() {
		let rowsNumbers = [];
		for (var i = 0; i < 10; i++) {
		rowsNumbers.push(i);
		}
		
		
		
		let rows = rowsNumbers.map((number) => <div key={number} className="row"><Row bgColors={this.props.bgColors.slice(number*10,(number*10)+10)} onStateChange={this.handleStateChange} onMouseOverFreePlace={this.handleOnMouseOverFreePlace} onMouseOutFreePlace={this.handleOnMouseOutFreePlace} number={number}/></div>);
		
		return(
			<div id='rowsContainer'>
				<div className='rowsInnerContainer'>
			{rows}
				</div>
			</div>
		);
		
	}	
}

export default RowsContainer; 