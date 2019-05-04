import React from 'react';

import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

import { greenIcon, redIcon, orangeIcon } from './icons.js';

const Map = props => {
	const { stations } = props;
	return (
		<LeafletMap center={[40.73454567, -73.99074142]} zoom={13}>
			<TileLayer
				attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			{stations.map(station => {
				const {
					num_bikes_available,
					num_docks_available,
					station_id,
					lat,
					lon
				} = station;

				const availabilityPercentage =
					(num_bikes_available / num_docks_available) * 100;

				if (num_bikes_available === 0) {
					var icon = redIcon;
				} else if (availabilityPercentage > 75) {
					var icon = greenIcon;
				} else {
					var icon = orangeIcon;
				}

				return (
					<Marker
						icon={icon}
						key={station_id}
						position={[lat, lon]}
					/>
				);
			})}
		</LeafletMap>
	);
};

export default Map;
