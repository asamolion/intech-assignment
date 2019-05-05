import 'cypress-testing-library/add-commands';

// import ApiClient from '../../src/api.js';

describe('intechww assignment test', () => {
	beforeEach(function() {
		Promise.all([
			cy.fixture('station_information.json'),
			cy.fixture('station_status.json')
		]).then(responses => {
			cy.server(); // enable response stubbing
			cy.route({
				method: 'GET', // Route all GET requests
				url:
					'https://gbfs.citibikenyc.com/gbfs/en/station_information.json', // that have a URL that matches '/users/*'
				response: responses[0] // and force the response to be: []
			});
			cy.route({
				method: 'GET', // Route all GET requests
				url: 'https://gbfs.citibikenyc.com/gbfs/en/station_status.json', // that have a URL that matches '/users/*'
				response: responses[1] // and force the response to be: []
			});
		});

		cy.visit('http://localhost:1234');
	});

	it('should render only 1 marker with 0 distance', () => {
		cy.getByTestId('search-input').type('lexingtoncl');

		cy.getByText('Lexington Ave & Classon Ave').click();

		cy.getByTestId('distance-input')
			.type(0)
			.blur();

		cy.get('.leaflet-marker-icon').should('have.length', 1);
	});

	it('should render markers according to distance', () => {
		cy.getByTestId('search-input').type('lexingtoncl');

		cy.getByText('Lexington Ave & Classon Ave').click();

		cy.getByTestId('distance-input')
			.type(3)
			.blur();

		cy.get('.leaflet-marker-icon').should('have.length', 3);
	});
});
