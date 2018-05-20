import React, { Component } from 'react';
import { /*Route,*/ Link } from "react-router-dom";
import './MovieDetail.css';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            toggleViewMore: false
        }
        this.toggleViewMore = this.toggleViewMore.bind(this);
    }
    toggleViewMore(){
        this.state.toggleViewMore ? this.setState({toggleViewMore: false}) : this.setState({toggleViewMore: true})
    }

    render() {
        const text = this.state.toggleViewMore ? (
            <span>
                {this.props.overview.substr(200,this.props.overview.length)}
                <a onClick={this.toggleViewMore}> ...czytaj mniej</a>
            </span>
        ) : (
            `...czytaj więcej`
        );

         if (!this.props.genres || !this.props.cast) return <div>Loading...</div>
         return (
             <React.Fragment>
                <img id="modal-bg-image" src={`https://image.tmdb.org/t/p/original${this.props.backdrop_path}`} alt="my" />
                <div className="wrapper-details">
                    <span className="modal-close" onClick={this.props.handleClose}><Link to="/"><i className="fas fa-long-arrow-alt-left"></i></Link></span>
                        <div className="image-column">
                            <img src={`https://image.tmdb.org/t/p/original${this.props.poster_path}`} width="250" alt={this.props.id} />
                        </div>
                    <div className="modal-content">
                        <span className="movie-title">{this.props.title}</span><br />
                            <div className="movie-details">
                                <div className="movie-genres">
                                    {this.props.genres.map(genre => <div key={genre.id} className="genre-container"><span className="movie-genre-item" > {genre.name} </span></div>)}
                                </div><br />
                                <span className="titles">Data premiery:</span>{this.props.release_date}<br /><br />
                                <span className="titles">Obsada:</span>{this.props.cast[0].name}, {this.props.cast[1].name}<br /><br />
                                <span className="titles">Opis:</span>
                                {this.props.overview.length >= 200 &&
                                    <span>{this.props.overview.substr(0,199)}
                                    <a onClick={this.toggleViewMore}>{text}</a><br /><br /></span>
                                }
                                {this.props.overview.length < 200 && <span>{this.props.overview}<br /><br /></span>}
                                <span className="titles">Budżet:</span>{this.props.budget === 0 ? <span>Brak informacji</span> : <span>{this.props.budget} $</span>} <br /><br />
                                <span className="titles">Czas trwania:</span> {this.props.runtime} min
                                </div>
                                </div>
                                </div>
                                </React.Fragment>
                            )
                        }
                    }


                    export default MovieDetail;