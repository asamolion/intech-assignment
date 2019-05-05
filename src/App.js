import React from 'react';
import ReactDOM from 'react-dom';
import Downshift from 'downshift';
import Fuzzysort from 'fuzzysort';

import ApiClient from './api.js';
import Map from './components/Map.js';
import CurrentUsage from './components/CurrentUsage.js';
import HistoricalUsage from './components/HistoricalUsage.js';
import { calculateDistance } from './utils.js';

import './style.scss';

function getStationData(cb) {
	Promise.all([
		ApiClient.getStationInformation(),
		ApiClient.getStationStatus()
	]).then(res => {
		const stationInformation = res[0].data.data.stations;
		const stationStatus = res[1].data.data.stations;
		const stations = [];

		stationInformation.forEach((station, index) => {
			stations.push({
				...station,
				...stationStatus[index]
			});
		});

		cb(stations);
	});
}

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			lastUpdated: Date.now(),
			history: [],
			currentData: [],
			filteredStations: [],
			selectedStation: '',
			distance: ''
		};

		this.handleChange = this.handleChange.bind(this);
	}

	reset() {
		getStationData(stations => {
			this.setState({
				history: [stations],
				currentData: stations,
				filteredStations: stations
			});
		});
	}

	componentDidMount() {
		this.reset();

		this.historyInterval = setInterval(() => {
			const { history, lastUpdated } = this.state;

			getStationData(stations => {
				this.setState(prevState => ({
					currentData: stations,
					history: prevState.history.concat([stations])
				}));
			});
		}, 2000);
	}

	componentWillUnmount() {
		clearInterval(this.historyInterval);
	}

	handleChange(evt) {
		this.setState(
			{
				[evt.target.name]: evt.target.value
			},
			this.filterStations
		);
	}

	filterStations() {
		const { currentData, selectedStation, distance } = this.state;

		if (!distance || !selectedStation) {
			this.setState({
				filteredStations: currentData
			});
			return;
		}

		const filteredStations = currentData.filter(station => {
			return (
				calculateDistance(
					selectedStation.lat,
					selectedStation.lon,
					station.lat,
					station.lon
				) <= distance
			);
		});

		this.setState({
			filteredStations
		});
	}

	renderSearch() {
		const { currentData, distance } = this.state;

		return (
			<React.Fragment>
				<Downshift
					defaultHighlightedIndex={0}
					onSelect={selectedItem => {
						this.setState(
							{
								selectedStation: currentData.find(
									station => station.name === selectedItem
								)
							},
							this.filterStations
						);
					}}
				>
					{({
						getInputProps,
						getMenuProps,
						getItemProps,
						isOpen,
						inputValue,
						clearSelection
					}) => (
						<div>
							<div className="field">
								<input
									{...getInputProps({
										onChange: e => {
											if (e.target.value === '') {
												clearSelection();
											}
										}
									})}
									className="search-field"
									type="text"
									name="searchQuery"
									placeholder="Station"
								/>
							</div>

							<div className="autocomplete" {...getMenuProps()}>
								<div className="autocomplete-items">
									{isOpen
										? Fuzzysort.go(
												inputValue,
												currentData,
												{
													key: 'name',
													limit: 20
												}
										  )
												.map(
													suggestion =>
														suggestion.target
												)
												.map(suggestion => {
													return (
														<div
															key={suggestion}
															{...getItemProps({
																item: suggestion
															})}
														>
															{suggestion}
														</div>
													);
												})
										: null}
								</div>
							</div>
						</div>
					)}
				</Downshift>

				<div className="field">
					<input
						name="distance"
						type="number"
						placeholder="Distance"
						value={distance}
						onChange={evt => {
							this.handleChange(evt);
						}}
					/>{' '}
					KM
				</div>
			</React.Fragment>
		);
	}

	render() {
		const {
			currentData,
			filteredStations,
			history,
			selectedStation
		} = this.state;

		return (
			<div>
				{this.renderSearch()}
				<hr />

				<Map stations={filteredStations} />

				<CurrentUsage
					station={selectedStation}
					allStations={currentData}
				/>

				<HistoricalUsage data={history} />
			</div>
		);
	}
}

export default App;
