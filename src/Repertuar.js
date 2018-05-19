import React, { Component } from 'react';
import {app} from './firebase.js';
import './Repertuar.css';
import { Link } from "react-router-dom";

class Repertuar extends Component {
    constructor(props){
        super(props);
        this.state = {
            repertoireDays: [], 	// array of days to display in Repertuar component (array of 7 elements)
			repertoireDays2: [], 	// array of days to compare with this.state.moviesDays (array of 7 elements)
			ids: [],						
			titles: [], 			// titles of movies played in the cinema (unique titles)
			hours: [], 				// array of times(hours) of played movies (size of array is equal to size of elements in database)
			moviesDays: [], 		// array of days of played movies (size of array is equal to size of elements in database)
			allTitles: [], 			// array of movie's titles which are played in the cinema (size of array is equal to size of elements in database, elements do not have to be unique)
			stan: true,
		}
		this.handleClick = this.handleClick.bind(this); //binding function
    }

    componentDidMount(){
        let tempArr = []; 	// temporary array to hold this.state.repertoireDays
        //let arr = []; 	// temporary array
		let days2 = []; 	// temporary array to hold this.state.repertoireDay2 
		//let ids = []; 
		const context = this;
        let options = { weekday: 'short', month: '2-digit', day: 'numeric' };
        
		for (let i=0; i<7; i++) { 	// loop to create 7-element array (tempArr[7]) of repertoire days
            let date = new Date();
            date.setDate(date.getDate() + i)
            tempArr.push(date.toLocaleDateString("pl-PL",options))
        }
		let indOfSem = -1; 			//position of semicolon in the data string
		for(let i = 0; i<7; i++) 	// loop to create 7-element array (days2[7]) of repertoire days - converting from tempArr[7]
		{
			indOfSem = tempArr[i].indexOf(','); 						// searching for semicolon in tempArr[i] element
			days2.push(tempArr[i].slice(indOfSem+2,tempArr[i].length)); //push a string to days[i] element
		}
      
		this.setState({ repertoireDays: tempArr, 	//setting state
						repertoireDays2: days2});
		
        const ref = app.database().ref().child("seances"); 	//connecting with database
															// ref - a reference to database
    
		ref.on('value', function(snapshot){
			let arr = []; // temporary array to hold movies from database
			let ids = [];// temporary array to hold movie's id's
			snapshot.forEach(function(childSnapshot) { 	// create an array of movies 
				arr.push(childSnapshot.val()); // create an array of movies 
				ids.push(childSnapshot.key);  // array of movie's id's
			})
			printMoviesTitles(arr,ids); //calling a function with arr[] and ids[] argument
		})

		function printMoviesTitles(seances,ids){
			let moviesTitles = []; 			// temporary array to hold this.state.titles
			let dates = []; 				// temporary array to hold this.state.moviesDays
			let hours = []; 				// temporary array to hold this.state.hours
			let allTitles = []; 			// temporary array to hold this.state.allTitles
			seances.forEach(seance => { 	// for each element in seances[]
				if(!ifStringExists(seance.title, moviesTitles)){ 	// if seance.title doesn't exist in moviesTitles[]
					moviesTitles.push(seance.title); 					// push seance.title into moviesTitles[] 
				}
				dates.push(seance.date); 		// push seance.date into dates[]
				hours.push(seance.time); 		// push seance.time into hours[]
				allTitles.push(seance.title); 	// push seance.title into allTitles[]
			})

			context.setState({ titles: moviesTitles,  // setting state
								moviesDays: dates,
								hours: hours,
								allTitles: allTitles,
								ids: ids,
								});
		}	
		function ifStringExists(string, array){ // function to check if string exists in an array
			return (array.indexOf(string) > -1);
		}
    }
	
	handleClick(index) 	// function to handle a click on repertoire hour of movie with index
	{
		/*let ids = []; 										// array of movie ids
		const ref = app.database().ref().child("seances"); 	// connecting to database, ref - a reference to database 
		ref.on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot) { 			// for each element in database
				ids.push(childSnapshot.key); 					// push movie's id to ids[]
			})
		})*/
		this.props.onClick(this.state.ids[index]); 						// send index and ids in props to index.js
	}
    render() { // render method
					// for each element in this.state.repertoire days print the element
					// for each element in this.state.titles print the element
						// for each element in this.state.repertoireDays2 
							// render  MovieHours component
        return (
			<div>
				<React.Fragment>
					<table>
						<tbody>
							<tr>
								<th>Title</th>
								{ this.state.repertoireDays.map(day => <th>{day}</th>) } 	
							</tr>
								{ this.state.titles.map((title) => <tr><th>{title}</th> 	
									{ this.state.repertoireDays2.map(day => <td> 
										<MovieHours title={title} repertoireDay={day}  
										movieDay={this.state.moviesDays} hour={this.state.hours}
										titleAll={this.state.allTitles} onClick={this.handleClick}
										ids={this.state.ids}/></td>) 
									}
							</tr>) }
						</tbody>
					</table>
				</React.Fragment>
			</div>
		)
    }
}

class MovieHours extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this); // binding function
    }
	
	handleClick(index) // function to handle a click on repertoire hour of movie with index
	{
		this.props.onClick(index); // send index in props to Repertuar Component
	}
	
	render() {
			// for each title in database 
				// check if this.props.repertoireDay (day from repertuar) is equal to movie day (in database) and if this.props.title (title in repertuar) is equal to title in database
						// then print div with link to CinemaRoom Component 
						// else do nothing 
		return (
			<div>
				{this.props.titleAll.map((title,index) => (this.props.repertoireDay === this.props.movieDay[index]) && (this.props.title === title) ? <div onClick={() => this.handleClick(index)}><Link to={`/${this.props.ids[index]}`}>{this.props.hour[index]}</Link></div> : '')}
			</div>
		);
	}
}

export default Repertuar;