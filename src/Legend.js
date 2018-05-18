import React, {Component} from 'react';
import './dominikStyles.css';

class Legend extends Component {
	render() {
		return(
		<div className='legend'>
			<div className='legendTitle'>Legend</div>
			<div className='legendRows'>
			<div className='legendRow'><div className='innerLegendRow'><div className='legendSeat legendFree'></div><div className='legendText'>Place free</div></div></div>
			<div className='legendRow'><div className='innerLegendRow'><div className='legendSeat legendOccupied'></div><div className='legendText'>Place occupied</div></div></div>
			<div className='legendRow'><div className='innerLegendRow'><div className='legendSeat legendChosen'></div><div className='legendText'>Place chosen</div></div></div>
			</div>
		</div>
		);
		
	}
	
}

export default Legend;