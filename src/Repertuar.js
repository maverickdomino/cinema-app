import React, { Component } from 'react';
import {app} from './firebase.js';
import './Repertuar.css';
import { Link } from "react-router-dom";

class Repertuar extends Component {
    constructor(props){
        super(props);
        this.state = {
            repertoireDays: [],
			repertoireDays2: [],
			titles: [],
			hours: [],
			moviesDays: [],
			allTitles: [],
			stan: true,
		}
		this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        let tempArr = [];
        let arr = [];
		let days2 = [];
		let ids = []
		const context = this;
        let options = { weekday: 'short', month: '2-digit', day: 'numeric' };
        
		for (let i=0; i<7; i++) {
            let date = new Date();
            date.setDate(date.getDate() + i)
            tempArr.push(date.toLocaleDateString("pl-PL",options))
        }
		let indOfSem = -1; //position of semicolon in the data string
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

			})
			printMoviesTitles(arr);
		})

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

			context.setState({ titles: moviesTitles,
								moviesDays: dates,
								hours: hours,
								allTitles: allTitles,
								});
		}	
		function ifStringExists(string, array){
			return (array.indexOf(string) > -1);
		}
    }
	
	handleClick(index)
	{
		let ids = [];
		const ref = app.database().ref().child("seances");
		ref.on('value', function(snapshot){
		snapshot.forEach(function(childSnapshot) {
				ids.push(childSnapshot.key);
			})
		})
		this.props.onClick(index,ids);
	}
    render() {
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
									titleAll={this.state.allTitles} onClick={this.handleClick}/></td>) }
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
		this.handleClick = this.handleClick.bind(this);
    }
	
	handleClick(index)
	{
		this.props.onClick(index);
	}
	
	render() {
		return (
			<div>
				{this.props.titleAll.map((title,index) => (this.props.repertoireDay === this.props.movieDay[index]) && (this.props.title === title) ? <div onClick={() => this.handleClick(index)}><Link to="/rezerwacja">{this.props.hour[index]}</Link></div> : '')}
			</div>
		);
	}
}

export default Repertuar;