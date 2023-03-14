// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'storageeasyjob',
    appId: '1:369119938369:web:e962734a2ea8c23b9343c0',
    databaseURL: 'https://storageeasyjob-default-rtdb.firebaseio.com',
    storageBucket: 'storageeasyjob.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyDJ_FN6sZZq6Waw3a9CabgPvLVD_ICsp1Y',
    authDomain: 'storageeasyjob.firebaseapp.com',
    messagingSenderId: '369119938369',
  },
  apiKey:'?api_token=8530e6ef219a32b9dedb067db776ac3a64f5f8225c77b78fc81a30ffed78d1a7',
  apiUrl:'https://apiperu.dev/api/dni/',
  production: false,
  apiBaseUrl: 'https://backend-dev.ide-app.com:',
  puerto: '6050',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
import { Usuario } from '../app/interfaces/Usuario';
