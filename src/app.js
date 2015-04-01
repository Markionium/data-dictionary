//import 'babel/browser-polyfill';
import jquery from 'jquery';
import angular from 'angular';
import 'angular-route';
import 'angular-material';

import AppController from './app/app.controller';

import d2Angular from 'd2-angular';

var myApp = angular.module('MyApp', ['d2.models', 'd2.api', 'd2.components', 'ngMaterial', 'ngRoute']);
angular.module('MyApp').controller('AppController', AppController);
angular.module('MyApp').config(($mdThemingProvider) => {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('deep-orange');
});

angular.module('MyApp').config(($routeProvider) => {
    $routeProvider.when('/:modelName', {
        templateUrl: 'list/list.html',
        controller: 'listController',
        controllerAs: 'listCtrl'
    });
});

class ListController {
    constructor(models, $routeParams) {
        //console.log($routeParams);
        console.log(models[$routeParams.modelName]);

        if ($routeParams.modelName && models[$routeParams.modelName]) {
            this.source = models[$routeParams.modelName].list();
        }


        this.columns = ['id', 'name'];
    }
}

angular.module('MyApp').controller('listController', ListController);

d2Angular({baseUrl: '/dhis/api/', appName: 'MyApp'});

export default myApp;
