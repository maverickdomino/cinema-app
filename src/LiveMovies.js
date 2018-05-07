import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class LiveMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: []
        }
    }
    componentDidMount() {
        // fetch('https://api.themoviedb.org/3/movie/76341?api_key=4ed1fcc5ffc6bf4d248c44f2928822e8')
           fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=4ed1fcc5ffc6bf4d248c44f2928822e8&language=pl-PL')
        .then(response => response.json())
        .then(data => this.setState({ apiData: data.results }));
    }

    render() {
        const results = this.state.apiData;
        return (
            <Router>
            <React.Fragment>
            <Route path="/" exact render={() => {
                return (
                <ul>
                {results.map( movie =>
                   <li className="movies-live-list" key={movie.title}><img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} width="150" alt={movie.title}/><span className="movie-desc">Tytuł: {movie.title}<br />  Data premiery: {movie.release_date}<br />
                   Średnia ocen: {movie.vote_average}<br />Ilość głosów: {movie.vote_count} <br /><br /><br /><Link to={`/${movie.id}`}>Czytaj więcej...</Link></span></li>
               )}
                </ul>
            );
            }} />
             <Route path="/:id" exact render={(props)=>{
                 const selectedMovie = results.filter(movie => movie.id === parseInt(props.match.params.id) );
                 console.log(selectedMovie);
                 console.log(selectedMovie.id);
                 return (
                     <div>  {selectedMovie.id} </div>
                    )
                }} />
                </React.Fragment>
             </Router>
        )
    }
}

export default LiveMovies;
