import React, {Component} from 'react';
import './AuthForm.css'

class Information extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
}

	 handleClick(e){
       this.props.history.push('/autoryzacja');
    }

	render() {
		return(
		<div className="container-auth">
			<header><h1>Zaloguj się aby móc dokonać rezerwacji</h1></header>
			<button className="Button" type="button" onClick={this.handleClick}>
              zaloguj się
            </button>
		</div>
		);
		
	}
	
}

export default Information;