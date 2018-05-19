import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {app, facebookProv} from './firebase.js';
import './Repertuar.css';




class Repertuar extends Component {
    constructor(props){
        super(props);
        this.state = {
            array: [],
			movieData: null,
		 }
    }

    componentDidMount(){
        let tempArr = [];
        let arr = [];
		// const context = this;
        let options = { weekday: 'short', month: '2-digit', day: 'numeric' };
		for (let i=0; i<7; i++) {
            let date = new Date();
            date.setDate(date.getDate() + i)
            tempArr.push(date.toLocaleDateString("pl-PL",options))
        }
		this.setState({ array: tempArr });
        app.database().ref().child("seances")
            .on("child_added", snap => {
                app.database().ref().child("seances").child(snap.key)
                    .once('value', childSnap => {
                        arr.push(childSnap.val());
                    });
                    console.log(arr)
                });
                this.setState({ movieData: arr })


/*
		ref.on('value', function(snapshot){
			arr = [];
			snapshot.forEach(function(childSnapshot) {
				arr.push(childSnapshot.val());
			})
			printMoviesTitles(arr);
		})

		function printMoviesTitles(seances){
			let moviesTitles = [];
			seances.forEach(seance => {
				if(!ifStringExists(seance.title, moviesTitles)){
					moviesTitles.push(seance.title);
				}
			})
			context.setState({ titles: moviesTitles});
		}

		function ifStringExists(string, array){
			return (array.indexOf(string) > -1);
        } */
    }
    /* handleTitles(arr){
        return arr.filter((value) => {
            value.
        })
         { this.state.movieData.map(seans => <tr key={seans.date}><th>{seans.title}</th></tr>) }
    } */

    render() {
        console.log(this.state.movieData);
        return (
            <React.Fragment>
                <table>
                    <tbody>
                        <tr>
							<th>Title</th>
                            { this.state.array.map(day => <th key={day}>{day}</th>) }
                            </tr>

                   </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default Repertuar;