import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {app, facebookProv} from './firebase.js';
import './Repertuar.css';




class Repertuar extends Component {
    constructor(props){
        super(props);
        this.state = {
            array: [],
            firebaseArr: [],
        }
    }

    componentDidMount(){
        let tempArr = [];
        let arr = [];
        const ref = app.database().ref().child("seances");
        let promise = new Promise(() => {
            ref.once('value').then( snap => {
                snap.forEach(childSnap => arr.push(childSnap.val())); });
        })
        promise.then(() => {
            this.setState({firebaseArr: arr})
        });
        let options = { weekday: 'short', month: '2-digit', day: 'numeric' };
        for (let i=0; i<7; i++) {
            let date = new Date();
            date.setDate(date.getDate() + i)
            tempArr.push(date.toLocaleDateString("pl-PL",options))
        }
        console.log(arr);
        this.setState({ array: tempArr });
    }

    render() {
        console.log(this.state.firebaseArr, this.state.array);
        return (
            <React.Fragment>
                <table>
                    <tbody>
                        <tr>
                            { this.state.array.map(day => <th>{day}</th>) }
                        </tr>
                        <tr>
                            <td> something </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default Repertuar;