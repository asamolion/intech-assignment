import axios from 'axios';

import { API_ENDPOINT } from './constants.js';

const client = axios.create({
	baseURL: API_ENDPOINT
});

export default {
	getStationInformation: function() {
		return client.get('/en/station_information.json');
	},

	getStationStatus: function() {
		return client.get('/en/station_status.json');
	}
};
