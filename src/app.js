import jquery from 'jquery';
import angular from 'angular';

import AppController from './app/app.controller';

import d2Angular from 'd2.angular';

var myApp = angular.module('MyApp', ['d2.models', 'd2.api']);
angular.module('MyApp').controller('AppController', AppController);
angular.module('MyApp').run(function () {
    console.log('app started');
});

d2Angular({baseUrl: '/dhis/api/', appName: 'MyApp'});

export default myApp;
