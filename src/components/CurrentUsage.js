import React from 'react';

import { Bar as BarChart } from 'react-chartjs';

import { reduceStations } from '../utils.js';

const CurrentUsage = props => {
	const { station, allStations } = props;
	const chartData = {
		labels: [
			'Bikes Available',
			'E-Bikes Available',
			'Bikes Disabled',
			'Docks Available',
			'Docks Disabled'
		],
		datasets: [
			{
				fillColor: 'rgba(151,187,205,0.5)',
				strokeColor: 'rgba(151,187,205,0.8)',
				highlightFill: 'rgba(151,187,205,0.75)',
				highlightStroke: 'rgba(151,187,205,1)'
			}
		]
	};

	if (station) {
		chartData.datasets[0].data = [
			station.num_bikes_available,
			station.num_ebikes_available,
			station.num_bikes_disabled,
			station.num_docks_available,
			station.num_docks_disabled
		];
	} else {
		chartData.datasets[0].data = allStations.reduce(reduceStations, [
			0,
			0,
			0,
			0,
			0
		]);
	}

	return (
		<div className="">
			<h1>Current Usage - {station ? station.name : 'Global'}</h1>
			<BarChart data={chartData} width={800} height={400} redraw />
		</div>
	);
};

export default CurrentUsage;
