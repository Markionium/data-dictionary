//import 'babel/browser-polyfill';
import jquery from 'jquery';
import angular from 'angular';
import 'angular-route';
import 'angular-animate';
import 'angular-aria';

import AppController from './app/app.controller';
import ListController from './list/list.controller';

import d2Angular from 'd2.angular';

let dataDictionary = angular.module('dataDictionary', ['d2.models', 'd2.api', 'd2-angular', 'ngRoute'])
    .controller('AppController', AppController)
    .controller('listController', ListController);

angular.module('dataDictionary').config(($routeProvider) => {
    $routeProvider.when('/:modelName', {
        templateUrl: 'list/list.html',
        controller: 'listController',
        controllerAs: 'listCtrl'
    });
});

d2Angular({
    baseUrl: '/dhis/api/',
    appName: 'dataDictionary'
});

export default dataDictionary;
