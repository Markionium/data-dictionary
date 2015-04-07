import d2 from 'd2';
import angular from 'angular';

import models from 'd2-angular/models/models.service';
import modelDefinitions from 'd2-angular/models/model-definitions.service';
import Api from 'd2-angular/api/Api';

//UI Components
import 'd2-angular/table/d2-table.module';

let isUndefined = angular.isUndefined;

function continueBootstrap(appName, extraDependencies = []) {
    return function () {
        angular.bootstrap(document.querySelector('body'), [appName].concat(extraDependencies));
        angular.resumeBootstrap();
    };
}

function logBootstrapError(e) {
    console.error('Error during bootstrap process');
    console.trace(e.trace);
    console.error(e.message);
}

function buildD2AngularModule(d2) {
    //Global d2 angular module
    angular.module('d2', []).factory('d2', () => d2);

    //D2 models
    angular.module('d2.models', ['d2']);
    angular.module('d2.models').factory('models', models);
    angular.module('d2.models').factory('modelDefinitions', models);

    angular.module('d2.api', ['d2']);
    angular.module('d2.api').factory('Api', () => {
        return Api;
    });

    angular.module('d2-angular', ['d2', 'd2-angular.table']);
}

function initLibrary(options) {
    //Delay the angular bootstrap and bootstrap it manually as it fails when adding ng-app to the html.
    window.name = 'NG_DEFER_BOOTSTRAP!';

    if (isUndefined(options) || isUndefined(options.appName)) {
        throw new Error('App name should be provided to be able to bootstrap your app');
    }

    return d2(options)
        .then(buildD2AngularModule)
        .then(continueBootstrap(options.appName, options.extraDependencies))
        .catch(logBootstrapError);
}

export default initLibrary;
