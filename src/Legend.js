import React, {Component} from 'react';
import './Legend.css';

class Legend extends Component {
	render() {
		return(
		<div className='legendContainer'>
			<div className='legendTitle'>Legend</div>
			<div className='legendElements'>
				<div className='legendElement'>
					<div className='legendSeat legendFree'></div>
					<div className='legendText'>Place free</div>
				</div>
				<div className='legendElement'>
					<div className='legendSeat legendOccupied'></div>
					<div className='legendText'>Place occupied</div>
				</div>
				<div className='legendElement'>
					<div className='legendSeat legendChosen'></div>
					<div className='legendText'>Place chosen</div>
				</div>
			</div>
		</div>
		);	
	}	
}

export default Legend;