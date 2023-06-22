// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { isDevMode } from '@angular/core';

export class environment {

  public urls = isDevMode() ? {
    production: false,

    loginUrl: "http://localhost:3001/api/auth/login/",
    registerUrl: "http://localhost:3001/api/auth/register/",
    productsUrl: "http://localhost:3001/api/products/",
    productImagesUrl: "http://localhost:3001/api/products/images/",
    ordersUrl: "http://localhost:3001/api/orders/",
    cartsUrl: "http://localhost:3001/api/carts/",
    cartItemsUrl: "http://localhost:3001/api/carts/cart-items/"
  } : {
    production: true,

    loginUrl: "https://ez-shop-beta.herokuapp.com/api/auth/login",
    registerUrl: "https://ez-shop-beta.herokuapp.com/api/auth/register",
    productsUrl: "https://ez-shop-beta.herokuapp.com/api/products/",
    productImagesUrl: "https://ez-shop-beta.herokuapp.com/api/products/images/",
    ordersUrl: "https://ez-shop-beta.herokuapp.com/api/orders/",
    cartsUrl: "https://ez-shop-beta.herokuapp.com/api/carts/",
    cartItemsUrl: "https://ez-shop-beta.herokuapp.com/api/carts/cart-items/"
  }
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
