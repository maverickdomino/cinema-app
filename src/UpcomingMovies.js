import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class UpcomingMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
        }
    }
    componentDidMount() {
           fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=4ed1fcc5ffc6bf4d248c44f2928822e8&language=pl-PL&page=1')
        .then(response => response.json())
        .then(data => this.setState({ apiData: data.results }));
    }

    render() {
        const results = this.state.apiData.filter(filteredMovies => {
            let now = new Date();
            let cDate = new Date(filteredMovies.release_date.toString())
            return now < cDate;
        });

        return (
            <React.Fragment>
            <div className="sections-title">NADCHODZĄCE PREMIERY</div>
             <ul>
             {results.map( movie =>
                <li className="movies-live-list" key={movie.title}>
                    <div className="upcoming-movies-container">
                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} width="150" alt={movie.title}/>
                        <span className="movie-desc">
                            <span>{movie.title}</span><br /><br/>
                            <span>Data premiery:<br /> {movie.release_date}</span>
                        </span>
                    </div>
                </li>
            )}
             </ul>
             </React.Fragment>
        )
    }
}

export default UpcomingMovies;
