import React, { Component } from 'react';
import './CinemaRoom.css';
import Screen from './Screen.js';
import RowsContainer from './RowsContainer.js';
import Legend from './Legend.js';
import {app} from './firebase.js';

class CinemaRoom extends Component {
	constructor(props) {
		super(props);
		let seats = []; 				//temporary array to hold this.state.seats
		let bgColors = []; 				// temporary array to hold this.state.bgColors
		let context = this;	
		let movieID = this.props.id; 	// id of the movie
		const ref = app.database().ref().child("seances").child(movieID); 	//connecting with database,  ref - reference 
		
		ref.on('value', function(snapshot){
			seats = snapshot.val().sits; 		// copying sits from database to seats[]
				for(let i = 0; i < 100; i++) 	// loop for setting background colors of seats depends on state of seats
				{
					if(seats[i] === true)
						bgColors.push('#3355FF');
					else
						bgColors.push('red');
				}
				context.state = { 	// setting the state
					seats: seats, 
					bgColors: bgColors,
					chosenSeats: []}; 	// array of chosen seats (array of objects: { row: numberOfRow, column: number of Column }
	
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});

		this.handleStateChange = this.handleStateChange.bind(this);						// binding
		this.handleOnMouseOverFreePlace = this.handleOnMouseOverFreePlace.bind(this);
		this.handleOnMouseOutFreePlace = this.handleOnMouseOutFreePlace.bind(this);
		this.myFunction = this.myFunction.bind(this);
		this.getChosenSeatsArray = this.getChosenSeatsArray.bind(this);
	}
	
	componentWillUnmount()
	{
		if((this.state.chosenSeats.length) > 0)
		{
			let copySeats = this.state.seats;
			let indexes = this.getChosenSeatsArray();
			for(let i = 0; i < indexes.length; i++)
			{
				this.reservation(indexes[i],true);
			}
			
		}
	}
	
	getChosenSeatsArray() // function to return array of indexes of chosen seats
	{
		let indexes = [];
		let copyChosenSeats = this.state.chosenSeats;
		for(let i = 0; i < copyChosenSeats.length; i++)
			{
				indexes.push(copyChosenSeats[i].row * 10 + copyChosenSeats[i].seat);
			}
		return indexes;
	}
	
	myFunction()
	{
		console.log(this.state.chosenSeats.length);
		if((this.state.chosenSeats.length) > 0)
		{
			let indexes = this.getChosenSeatsArray();
			let copyBgColors = this.state.bgColors;
			
			for(let i = 0; i < indexes.length; i++)
			{
				copyBgColors[indexes[i]] = 'red';
			}
			
			this.setState({
				chosenSeats: [],
				bgColors: copyBgColors,
			});
			alert("Reservation completed!");
			this.forceUpdate();
		}
		else
		{
			alert("Musisz wybrać miejsca, żeby zarezerwować!");
		}
	}
	
	reservation(number, value){ 				// function to reserve/unreserve seat in cinema
			let movieID = this.props.id;
			const ref = app.database().ref().child("seances").child(movieID);
			ref.child("sits").child(number).set(value);
	}

	handleStateChange(row, col) { 		// function to handle click on seat with number row and col
			if(this.state.seats[row*10+col]) // if seat is free
			{
			  //console.log(this.state.chosenSeats);
				if(this.state.chosenSeats.length === 10) 	// if there are alreeady 10 chosen seats 
				{
					console.log('You can not choose more than 10 seats'); // alert
				}
				else  										// if are less than 10 chosen seats
				{ 
					this.setState(function(prevState) { 
						let copySeats = prevState.seats;				// temp new array of this.state.seats
						let copyBgColors = prevState.bgColors;			// temp new array of this.state.bgColors
						let copyChosenSeats = prevState.chosenSeats; 	// temp new array of this.state.chosenSeats
					
						copySeats[row*10+col] = false;					// set seat to false
						copyBgColors[row*10+col] = 'green';				// seat bgColor to green
						copyChosenSeats.push({row: row, seat: col});	// push this seat to chosen
						this.reservation(row*10+col,false);				// set seat to false in database

						return {										// return new states
							seats: copySeats,
							bgColors: copyBgColors,
							chosenSeats: copyChosenSeats,
						};
					});
				}
				//console.log(this.state.chosenSeats.length);
			}
			else							// if seat is chosen
			{		
				let copyChosenSeats = this.state.chosenSeats; 		// new temp array of chosen seats
				let searchRow = row; 								// clicked row ..
				let searchSeat = col;								// and col
				let ind = -1;										// index of element in ChosenSeat array 
				for(let i = 0; i < copyChosenSeats.length; i++) {	// search if this seat is chosen
					if (copyChosenSeats[i].row === searchRow && copyChosenSeats[i].seat === searchSeat) {
						ind = i;
						break;
					}
				}
			  
				if(ind !== -1) // if this seat is chosen
				{
					copyChosenSeats.splice(ind,1);		// remove this seat from chosenSeats

					this.setState(function(prevState) {	
						let copySeats = prevState.seats;		// temp arr to hold state of seats
						let copyBgColors = prevState.bgColors;	//temp arr to hold state of bgColors
				
						copySeats[row*10+col] = true;			// set seat to true
						copyBgColors[row*10+col] = '#3355FF';	// seat bgColor to 
						this.reservation(row*10+col,true); 		// set seat to false in database
						return {								// return new states
							seats: copySeats,
							bgColors: copyBgColors,
							chosenSeats: copyChosenSeats,
						};
					});

				}
				
			}
	}
	  
	handleOnMouseOverFreePlace(row, col) {	// function to handle mouse over a seat
		if(this.state.seats[row*10+col]) 		// if seat is free
		{
			this.setState(function(prevState) {
				let copy = prevState.bgColors;		// temp array to hold state of bgColors
				copy[row*10+col] = 'blue'; 			// set bgColor of this seat to blue
				return {
					bgColors: copy						// update state
				};
			});
		}
	}
	  
	handleOnMouseOutFreePlace(row, col) {	// function to handle mouse out a seat
		if(this.state.seats[row*10+col])		// if seat is free
		{
			this.setState(function(prevState) {
				let copy = prevState.bgColors;		// temp arr to hold state of bgColors 
				copy[row*10+col] = '#3355FF'; 		// set bgColor of this seat to 
				return {
					bgColors: copy 						// update state
				};
			});
		}
	}
		
	render() {
		return (
			<div className="cinemaRoomContainer">
				<div className="movieTitle">{this.props.title}</div>
				<div className="movieTime">{this.props.day}, {this.props.hour}</div>
				<div className="movieRoom">Room {this.props.room}</div>
				<Screen/>
				<RowsContainer bgColors={this.state.bgColors} onStateChange={this.handleStateChange} onMouseOverFreePlace={this.handleOnMouseOverFreePlace} onMouseOutFreePlace={this.handleOnMouseOutFreePlace}/>
				<Legend/>
				<div class="reservationButton"><button onClick={this.myFunction}>Rezerwuj</button></div> 
			</div>
		);
	}
}

export default CinemaRoom;
