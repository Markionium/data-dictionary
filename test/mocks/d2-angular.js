import angular from 'angular';

export default function () {
    //Global d2 angular module
    angular.module('d2.angular', []);
    angular.module('d2.angular').factory('d2', () => {});

    //D2 models
    angular.module('d2.models', ['d2.angular']);
    angular.module('d2.models').factory('models', function () {
        return {};
    });
    angular.module('d2.models').factory('modelDefinitions', function () {
        return {};
    });

    angular.module('d2.api', ['d2.angular']);
    angular.module('d2.api').factory('Api', () => {
        return {};
    });

    angular.module('d2.components', []);
}