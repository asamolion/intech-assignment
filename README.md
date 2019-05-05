# IPC Assignment

This project was built using the following technologies

-   React
-   SCSS
-   Cypress
-   Leaflet
-   Parcel Bundler

## How to run

To run the project, first install Parcel.

```
$ npm i -g parcel-bundler
```

Then run the following command from the project folder. This will start the dev server at `http://localhost:1234`

```
$ parcel src/index.html
```

## Testing

The tests are written in Cypress so they are e2e tests rather than unit tests. To run the test suite use the Cypress GUI.

```
$ npx cypress open
```

**NOTE**: The Cypress tests require that the app be running in the background. So please make sure of that.
