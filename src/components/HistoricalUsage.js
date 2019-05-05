import React from 'react';

import { Bar, Line as LineChart } from 'react-chartjs';

import { reduceStations } from '../utils.js';

const HistoricalUsage = props => {
	const { history } = props;

	const data = {
		labels: [
			'Bikes Available',
			'E-Bikes Available',
			'Bikes Disabled',
			'Docks Available',
			'Docks Disabled'
		],
		datasets: []
	};
	props.data.map(current => {
		data.datasets.push({
			fillColor: 'rgba(151,187,205,0.0)',
			strokeColor: 'rgba(151,187,205,1)',
			data: current.reduce(reduceStations, [0, 0, 0, 0, 0])
		});
	});
	return (
		<div>
			<h1>Historical Usage</h1>
			<Bar data={data} width={800} height={400} redraw />
		</div>
	);
};

export default HistoricalUsage;
