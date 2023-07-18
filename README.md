# Get started with this map app

This app is done with ReactJS, TypeScript and the Google Maps API. It allows user to search for addresses and display them on a map.

## Create the credentials file

To get started, navigate to `src > data` folder, and run `touch credentials.ts` to create a credentials file. It must contain all the necessary variables for the app to work properly.

The files should look like this:

`export const apiKey: string = 'api-key';
export const apiBaseLink: string =
  'desired-link';
`

PS: dotenv package has polyfill errors so this has been done a as workaround.\
Credentials/file will be provided to the persons who need to access the API. Otherwise you can use your own.

## Run `npm start`

To be done in the project root directory.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
