// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  usuarios: [
    { nombres: 'Angel', apellidos: 'Santamaria Herrera', celular: '97045532', fechaNacimiento: '2000-12-04', usuario: 'angel', correo: 'angelsantamaria0412@gmail.com', clave:'123'},
    { nombres: 'Piero', apellidos: 'Salazar Calle', celular: '923937155', fechaNacimiento: '2000-12-04', usuario: 'piero', correo: 'pieromental@gmail.com', clave:'123'},
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
