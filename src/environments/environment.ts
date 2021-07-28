// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// const url = 'http://10.52.2.34:3300';
const url = window.location.origin.includes('localhost')? 
'http://localhost:3300' : 
'http://10.52.2.34:3300' ;

console.log('Current Backend Server : ' + url);

export const environment = {
  production: false,
  base_url: url,
  maintenance: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
