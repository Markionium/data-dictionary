//Third party
import jquery from 'jquery';
import angular from 'angular';
import 'angular-route';
import 'angular-animate';
import 'angular-aria';

//DHIS2
import d2Angular from 'd2.angular';

import FormlyClass from 'd2-angular/form/d2-form-formly-fields-for-model.service';
console.log(FormlyClass);

//App
import AppController from './app/app.controller';
import ListController from './list/list.controller';
import EditController from './edit/edit.controller';

let dataDictionary = angular.module('dataDictionary', ['d2.models', 'd2.api', 'd2-angular', 'ngRoute'])
    .controller('appController', AppController)
    .controller('listController', ListController)
    .controller('editController', EditController);

angular.module('dataDictionary').config(($routeProvider) => {
    $routeProvider
        .when('/:modelName', {
            templateUrl: 'list/list.html',
            controller: 'listController',
            controllerAs: 'listCtrl'
        })
        .when('/:modelName/edit/:modelId', {
            templateUrl: 'edit/edit.html',
            controller: 'editController',
            controllerAs: 'editCtrl',
            resolve: {
                modelToEdit: function (models, $route, $q) {
                    let {modelName, modelId} = $route.current.params;

                    if (models[modelName]) {
                        return models[modelName]
                            .get(modelId);
                    }

                    return $q.reject(['Could not load model (', modelName, ') for this id (', modelId, ')'].join(''));
                },
                modelName: function ($route) {
                    return $route.current.params.modelName;
                }
            }
        })
        .when('/:modelName/add', {
            templateUrl: 'edit/edit.html',
            controller: 'editController',
            controllerAs: 'editCtrl',
            resolve: {
                modelToEdit: function (models, $route, $q) {
                    let modelName = $route.current.params.modelName;

                    if (models[modelName]) {
                        return models[modelName].create();
                    }

                    return $q.reject(['Could not create new model for (', modelName, ')'].join(''));
                },
                modelName: function ($route) {
                    return $route.current.params.modelName;
                }
            }
        });
});

d2Angular({
    baseUrl: '/dhis/api/',
    appName: 'dataDictionary'
});

export default dataDictionary;
