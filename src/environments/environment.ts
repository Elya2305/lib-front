// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  searchBookUrl: 'http://localhost:8080/book/all',
  detailsBookUrl: 'http://localhost:8080/book',
  searchLocalBookUrl: 'http://localhost:8080/lib/search',
  booksUrl: 'http://localhost:8080/lib',
  classTypeUrl: 'http://localhost:8080/classification',
  classAllUrl: 'http://localhost:8080/classification/all',
  classTypeDeleteUrl: 'http://localhost:8080/classification/delete',
  labelUrl: 'http://localhost:8080/label',
  labelByBookUrl: 'http://localhost:8080/label/by-book'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
