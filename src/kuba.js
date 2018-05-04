import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Kuba extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData = []
        }
    }
    componentDidMount() {
        fetch(API + DEFAULT_QUERY)
        .then(response => response.json())
        .then(data => this.setState({ apiData: data.myFetchedData }));
    }
    // metoda componentDidMount, jak nazwa wskazuje dziala w momencie gdy caly komponent sie wyrenderuje, wiec jest idealna dla pobierania danych z API
    // Dziala to tak, ze najpierw wyrenderuje sie caly component, ale nie wyrzuci bledow, bo componentDidMount to taka wewnetrzna funkcja stworzona na potrzeby Reacta - gdy pierwszy render sie wykona, robi automatycznie sie drugi, i tym razem w ,,render()'' mozesz wykorzystac pobrane dane


    render() {
        return (
            <div> Tutaj maja wyswietlac sie dane </div>
        )
    }

}

// w index.js na samej gorze dopisz ,,import Kuba from './Kuba';, a potem miedzy <div'y> wstaw komponent w postaci <Kuba />


export default Kuba;
