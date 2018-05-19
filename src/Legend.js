import React, {Component} from 'react';
import './dominikStyles.css';

class Legend extends Component {
	render() {
		return(
		<div class='legend'>
			<div class='legendTitle'>Legend</div>
			<div class='legendRows'>
			<div class='legendRow'><div class='innerLegendRow'><div class='legendSeat legendFree'></div><div class='legendText'>Place free</div></div></div>
			<div class='legendRow'><div class='innerLegendRow'><div class='legendSeat legendOccupied'></div><div class='legendText'>Place occupied</div></div></div>
			<div class='legendRow'><div class='innerLegendRow'><div class='legendSeat legendChosen'></div><div class='legendText'>Place chosen</div></div></div>
			</div>
		</div>
		);	
	}	
}

export default Legend;