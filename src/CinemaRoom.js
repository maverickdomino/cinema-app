import React, { Component } from 'react';
import './dominikStyles.css';
import Screen from './Screen.js';
import RowsContainer from './RowsContainer.js';
import Legend from './Legend.js';
import {app, facebookProv} from './firebase.js';


class CinemaRoom extends Component {

	constructor(props) {
		super(props);
		let seats = [];
		let bgColors = [];

		for(let i = 0; i < 100; i++)
		{
			seats.push(true);
			bgColors.push('#3355FF');
		}
		this.state = {
			seats: seats,
			bgColors: bgColors,
			chosenSeats: [],
		};
		
		this.handleStateChange = this.handleStateChange.bind(this);
		this.handleOnMouseOverFreePlace = this.handleOnMouseOverFreePlace.bind(this);
		this.handleOnMouseOutFreePlace = this.handleOnMouseOutFreePlace.bind(this);
	}
		
	componentDidMount(){
		let context = this;
		//Przy routingu trzeba tu podmienić wartość "-LCVoTIHGKwx9-gUvy7Z" na wartość dla kliknietego filmu		
		let movieID = "-LCVoTIHGKwx9-gUvy7Z";
		const ref = app.database().ref().child("seances").child(movieID);
		
		ref.on('value', function(snapshot){
			context.setState({ seats: snapshot.val().sits});
		})
	}
	
	//VERSION 1
	
	reserveSit(number){
		//Przy routingu trzeba tu podmienić wartość "-LCVoTIHGKwx9-gUvy7Z" na wartość dla kliknietego filmu	
		let movieID = "-LCVoTIHGKwx9-gUvy7Z";
		const ref = app.database().ref().child("seances").child(movieID);
		ref.child("sits").child(number).set(true);
	}
	
	
	unreserveSit(number){
		//Przy routingu trzeba tu podmienić wartość "-LCVoTIHGKwx9-gUvy7Z" na wartość dla kliknietego filmu	
		let movieID = "-LCVoTIHGKwx9-gUvy7Z";
		const ref = app.database().ref().child("seances").child(movieID);
		ref.child("sits").child(number).set(false);
	}
	
	//VERSION 2
	
	reservation(number, value){
		let movieID = "-LCVoTIHGKwx9-gUvy7Z";
		const ref = app.database().ref().child("seances").child(movieID);
		ref.child("sits").child(number).set(value);
	}
	
	handleStateChange(row, col){
	if(this.state.seats[row*10+col])
	  {
		if(this.state.chosenSeats.length === 10)
		{
			console.log('You can not choose more than 10 seats');
		}
		else
		{ 
			this.setState(function(prevState) {
				let copySeats = prevState.seats;
				let copyBgColors = prevState.bgColors;
				let copyChosenSeats = prevState.chosenSeats;
				
				copySeats[row*10+col] = false;
				copyBgColors[row*10+col] = 'green';
				copyChosenSeats.push({row: row, seat: col});
				
			return {
				seats: copySeats,
				bgColors: copyBgColors,
				chosenSeats: copyChosenSeats,
			};
			});

		}
	  }
	  else
	  {
		  let copyChosenSeats = this.state.chosenSeats;
		  let searchRow = row;
		  let searchSeat = col;
			let ind = -1;
		for(let i = 0; i < copyChosenSeats.length; i++) {
		if (copyChosenSeats[i].row === searchRow && copyChosenSeats[i].seat === searchSeat) {
        ind = i;
        break;
		}
		}
		  
		if(ind !== -1)
		{
			copyChosenSeats.splice(ind,1);

			this.setState(function(prevState) {
			let copySeats = prevState.seats;
			let copyBgColors = prevState.bgColors;
				//let copyChosenSeats = prevState.chosenSeats;
			
			copySeats[row*10+col] = true;
			copyBgColors[row*10+col] = '#3355FF';
		return {
			seats: copySeats,
			bgColors: copyBgColors,
			chosenSeats: copyChosenSeats,
		};
		});

	  }
	  
	  }
  }
  
  handleOnMouseOverFreePlace(row, col)
  {
  
  	  if(this.state.seats[row*10+col])
	 {
		 this.setState(function(prevState) {
			 let copy = prevState.bgColors;
			copy[row*10+col] = 'blue';
		return {
			bgColors: copy
		};
	});
	 }
  }
  
  handleOnMouseOutFreePlace(row, col)
  {
    if(this.state.seats[row*10+col])
	 {
		 this.setState(function(prevState) {
			 let copy = prevState.bgColors;
			copy[row*10+col] = '#3355FF';
		return {
			bgColors: copy
		};
	});
  }
  }
	
	
  render() {
	  let colors = [];
		for(let i = 0; i < 100; i++)
		{
			colors[i] = this.state.bgColors[i];
		}
    return (
		<div onClick ={this.reserveSit}>
			<Screen/>
			<RowsContainer bgColors={colors} onStateChange={this.handleStateChange} onMouseOverFreePlace={this.handleOnMouseOverFreePlace} onMouseOutFreePlace={this.handleOnMouseOutFreePlace}/>
			<Legend/>
			
		</div>
    );
  }
}

export default CinemaRoom;
