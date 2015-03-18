import jquery from 'jquery';
import angular from 'angular';

import AppController from './app/app.controller';

import d2Angular from 'd2.angular';

var myApp = angular.module('MyApp', ['d2.models', 'd2.api', 'd2.components']);
angular.module('MyApp').controller('AppController', AppController);

d2Angular({baseUrl: '/dhis/api/', appName: 'MyApp'});

export default myApp;
