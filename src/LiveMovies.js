import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
//import { Route, Link } from "react-router-dom";
import MovieDetail from './MovieDetail';
import UpcomingMovies from './UpcomingMovies';
import {app} from './firebase.js';

class LiveMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            movieDetail: [],
            castDetail: [],
            showModal: false
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    _isMounted = true;

    componentWillUnmount() {
        this._isMounted = true;
    }
    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

   componentDidMount() {
           fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=4ed1fcc5ffc6bf4d248c44f2928822e8&language=pl-PL')
        .then(response => response.json())
        .then(data =>{
            if (this._isMounted === true ) this.setState({ apiData: data.results });
            this.generateMovies(data.results);
        });
    }
    generateMovies(arr){
        const hours = ["10:30", "14:30", "18:45", "21:50"];
        const hallsNumber = 8;
        const titlesArray = arr.map(movie => movie.title);
        app.database().ref().child("seances").limitToLast(1)
            .once('value', snapshot => {
                for (let date in snapshot.val()){
                this.generateSeances(titlesArray, snapshot.val()[date].date, hallsNumber, hours, titlesArray)
                }
            })
    }
    generateSeances(arr, date, halls, hours, titles){
        let day = date.substr(0,2);
        let month = date.substr(3,5);
        let currentDate = new Date();
        let daysArray = [];
        for (let i=0; i<7; i++){
            if(currentDate.getDate() > parseInt(day,10) && currentDate.getMonth()+1 >= parseInt(month,10)) {
                    daysArray.push(`${('0'+currentDate.getDate().toString()).slice(-2)}.${('0'+(currentDate.getMonth()+1).toString()).slice(-2)}`)
            }
            currentDate.setDate(currentDate.getDate()+1);
        }
        for (let y=0; y<daysArray.length; y++){
            for(let i=1; i<=halls; i++){
                for(let z=0; z<hours.length; z++){
                    let titleRandomNumber = Math.floor(Math.random()*(titles.length+1));
                    if (titleRandomNumber < titles.length){
                        app.database().ref().child("seances").push().set({
                            date: daysArray[y],
                            hall: i,
                            sits: this.generateSeats(),
                            time: hours[z],
                            title: titles[titleRandomNumber]
                        })
                    }
                }
            }
        }
    }
    generateSeats(){
        let arr = [];
        for (let i=0; i<100; i++){
            let me = Math.random() >= 0.5
            arr.push(me)
        }
        return arr;
    }

    fetchData(value){
         fetch(`https://api.themoviedb.org/3/movie/${value}?api_key=4ed1fcc5ffc6bf4d248c44f2928822e8&language=pl-PL`)
        .then(response => response.json())
        .then(data =>{ if (this._isMounted === true ) this.setState({ movieDetail: data }) });
        fetch(`https://api.themoviedb.org/3/movie/${value}/credits?api_key=4ed1fcc5ffc6bf4d248c44f2928822e8`)
        .then(response => response.json())
        .then(data => { if (this._isMounted === true ) this.setState({ castDetail: data }) });
    }

    render() {
        const results = this.state.apiData.filter(filteredMovies => {
            let now = new Date();
            let cDate = new Date(filteredMovies.release_date.toString())
            return now > cDate;
        });
        return (
            <React.Fragment>
            <div className="section-live">
            <div className="sections-title">FILMY AKTUALNIE GRANE</div>
                <div className="image-container">
        <ReactModal
           isOpen={this.state.showModal}
           style={{content: { overflow: 'hidden'}, overlay: {backgroundColor: 'rgba(255, 255, 255, 0.3)'}}}
           ariaHideApp={false}
           contentLabel="Movie Details Modal"
        >
        <MovieDetail {...this.state.movieDetail} {...this.state.castDetail}
                    handleClose={this.handleCloseModal} />
        </ReactModal>
                {results.map( movie =>
                    <a key={movie.id} onClick={() => {this.fetchData(movie.id);this.handleOpenModal()}}>
                   <img key={movie.title} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} width="170" height="260" alt={movie.title}/>
                   </a>
                )}
                </div>
                </div>
                <div className="section-upcoming">
                    <UpcomingMovies />
                </div>
                </React.Fragment>
            )
        }
    }


export default LiveMovies;