import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { Route, Link } from "react-router-dom";
import MovieDetail from './MovieDetail';

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
        .then(data =>{ if (this._isMounted === true ) this.setState({ apiData: data.results }) });
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
        const results = this.state.apiData;
        return (
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
                   <img key={movie.title} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} width="170" alt={movie.title}/>
                   </a>
                )}
                </div>
                </div>
            )
        }
    }


export default LiveMovies;