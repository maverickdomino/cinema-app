import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {app, facebookProv} from './firebase.js';
import './Repertuar.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Repertuar extends Component {
    constructor(props){
        super(props);
        this.state = {
            repertoireDays: [],
			repertoireDays2: [],
			titles: [],
			ids: [],
			hours: [],
			moviesDays: [],
			allTitles: [],
		 }
		 this.funkcja = this.funkcja.bind(this);
		 //this.funkcja2 = this.funkcja2.bind(this);
    }

    componentDidMount(){
        let tempArr = [];
        let arr = [];
		let days2 = [];
		let ids = []
		//let moviesDays = [];
		//let hours = [];
		//console.log(daysCounter);
		const context = this;
		
        let options = { weekday: 'short', month: '2-digit', day: 'numeric' };
        
		for (let i=0; i<7; i++) {
            let date = new Date();
            date.setDate(date.getDate() + i)
            tempArr.push(date.toLocaleDateString("pl-PL",options))
        }
		console.log(typeof tempArr[4]);
		let indOfSem = -1;
		for(let i = 0; i<7; i++)
		{
			indOfSem = tempArr[i].indexOf(',');
			days2.push(tempArr[i].slice(indOfSem+2,tempArr[i].length));
		}
      
		this.setState({ repertoireDays: tempArr,
						repertoireDays2: days2});
		
        const ref = app.database().ref().child("seances");
    
		ref.on('value', function(snapshot){
			arr = [];
			snapshot.forEach(function(childSnapshot) {
				arr.push(childSnapshot.val());
				ids.push(childSnapshot.key);
				//arr2.push(childSnapshot.val());
				//arr2.push(childSnapshot.val());
			})
			
			
			printMoviesTitles(arr);
		})
		//console.log(arr);
		function printMoviesTitles(seances){
			let moviesTitles = [];
			let dates = [];
			let hours = [];
			let allTitles = [];
			seances.forEach(seance => {
				if(!ifStringExists(seance.title, moviesTitles)){
					moviesTitles.push(seance.title);
					
				}
				dates.push(seance.date);
				hours.push(seance.time);
				allTitles.push(seance.title);
			})
//console.log(dates);
//console.log(hours);	
//console.log(allTitles);	

			context.setState({ titles: moviesTitles,
								moviesDays: dates,
								hours: hours,
								allTitles: allTitles,
								ids: ids
								});
		}
		console.log(this.state.titles);	
		function ifStringExists(string, array){
			return (array.indexOf(string) > -1);
		}
		//this.funkcja();
		/*console.log(this.state.repertoireDays);
		console.log(this.state.moviesDays);*/
    }
	
	funkcja()
	{
		//console.log(this.state.ids);
		/*let arr1 = [];
		let arr2 = [];
		const ref = app.database().ref().child("seances");
		ref.on('value', function(snapshot){
			snapshot.forEach(function(childSnapshot) {
				arr1.push(childSnapshot.key);
				arr2.push(childSnapshot.val());
		})
		})
			console.log(arr1);
			console.log(arr2);*/
			//let gge = this.state.moviesDays;
			//console.log(this.state.repertoireDays);
		/*console.log(this.state.repertoireDays);
		console.log(this.state.moviesDays);
		const a = this.state.repertoireDays;
		const b = this.state.moviesDays;
		console.log(typeof a[0]);
		console.log(typeof b[3]);
		console.log(Date.parse(b[0]));
		console.log(a[0]===b[3]);*/
			//console.log("Previous Post ID: " + prevChildKey);

			//console.log(arr);
		/*let days2 = [];	
		let days = this.state.repertoireDays;
		let indOfSem = -1;
		for(let i = 0; i<7; i++)
		{
			indOfSem = days[i].indexOf(',');
			days2.push(days[i].slice(indOfSem+2,days[i].length));
		}
		
		this.setState({
			repertoireDays2: days2,
		});*/
		/*let bum = this.state.repertoireDays2;
		console.log(bum);*/
	//});
	/*const a = this.state.repertoireDays2;
		const b = this.state.repertoireDays;
		console.log(a);
		console.log(b);*/
	
}
	handleClick(index)
	{
		console.log(index);
	}
	
    render() {
	
        return (
		 <Router>
            <React.Fragment>
                <table>
                    <tbody>
                        <tr>
							<th>Title</th>
                            { this.state.repertoireDays.map(day => <th>{day}</th>) }
                        </tr>
						    { this.state.titles.map((title) => <tr><th>{title}</th>
							{ this.state.repertoireDays2.map((day,noDays) => <td>
							<MovieHours title={title} repertoireDay={day} 
														movieDay={this.state.moviesDays} hour={this.state.hours}
														titleAll={this.state.allTitles} onClick={this.handleClick}/></td>) }
							
							</tr>) }
								<button onClick={this.funkcja}></button>
                   </tbody>
                </table>
            </React.Fragment>
			</Router>
        )
    }
}



class MovieHours extends Component {
	constructor(props){
        super(props);
		 /*console.log(this.props.movieDay);
		 console.log(this.props.repertoireDay);
		 console.log(this.props.hour);
		 console.log(this.props.title);
		 console.log(this.props.titleAll);
		 console.log(this.props.repertoireDay==this.props.movieDay);
		 console.log('-----------------------');*/
		 
		 this.handleClick = this.handleClick.bind(this);
    }
	
	handleClick(index)
	{
		this.props.onClick(index);
	}
  render() {
    return (
		<div>
		
		{this.props.titleAll.map((title,index) => (this.props.repertoireDay == this.props.movieDay[index]) && (this.props.title == title) ? <button onClick={() => {this.handleClick(index)}}>{this.props.hour[index]}</button> : '')}
		
		</div>
		);
  }
}

export default Repertuar;