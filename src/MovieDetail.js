import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import './MovieDetail.css';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        }
    }

    formatNumber(number) {
        let newNumber = number.toString();
        let numLength = Math.floor(newNumber.length/3);
        let luls = newNumber.slice(0, -3);
        console.log(newNumber, numLength, luls);
    }
    /* componentDidUpdate() {
        fetch(`https://image.tmdb.org/t/p/original${this.props.backdrop_path}`)
        .then(response => response.json())
        .then(() => this.setState({ isLoaded: true }));
    } */
    // --------------------- try to implement conditional rendering for images --------------------
    // {this.state.movie.genres.map( genre => <span>{genre.name}</span>)}
    render() {
        console.log(this.formatNumber(100023));
         if (!this.props.genres || !this.props.cast) return <div>Loading...</div>
         return (
             <React.Fragment>
            <img id="modal-bg-image" src={`https://image.tmdb.org/t/p/original${this.props.backdrop_path}`} alt="my" />
            <div className="wrapper">
            <span className="modal-close" onClick={this.props.handleClose}><Link to="/"><i className="fas fa-long-arrow-alt-left"></i></Link></span>
            <div className="image-column">
            <img src={`https://image.tmdb.org/t/p/original${this.props.poster_path}`} width="250" alt={this.props.id} />
            </div>
            <div className="modal-content">
            <span className="movie-title">{this.props.title}</span><br />
            <div className="movie-details">
            <div className="movie-genres">
            {this.props.genres.map(genre => <span className="movie-genre-item" key={genre.id}> {genre.name} </span>)}
            </div><br />
            <span className="titles">Data premiery:</span>{this.props.release_date}<br /><br />
            <span className="titles">Obsada:</span>{this.props.cast[0].name}, {this.props.cast[1].name}<br /><br />
            <span className="titles">Opis:</span>{this.props.overview}<br /><br />
            <span className="titles">Budżet:</span>{this.props.budget === 0 ? <span>Brak informacji</span> : <span>{this.props.budget} $</span>} <br /><br />
                            <span className="titles">Czas trwania:</span> {this.props.runtime} min
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }

    // {this.props.genres[0].name}
}

export default MovieDetail;