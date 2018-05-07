import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class UpcomingMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: []
        }
    }
    componentDidMount() {
           fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=4ed1fcc5ffc6bf4d248c44f2928822e8&language=pl-PL&page=1')
        .then(response => response.json())
        .then(data => this.setState({ apiData: data.results }));
    }

    render() {
        const results = this.state.apiData.filter(filteredMovies => filteredMovies.popularity < 100 );
        return (
            <React.Fragment>
             <ul>
             {results.map( movie =>
                <li className="movies-live-list" key={movie.title}><img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} width="150" alt={movie.title}/><span className="movie-desc">Tytuł: {movie.title}<br />  Data premiery: {movie.release_date}<br />
                test<br /> test2 <br />test3</span></li>
            )}
             </ul>
             </React.Fragment>
        )
    }
}

export default UpcomingMovies;
