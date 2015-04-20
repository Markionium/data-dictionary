import 'babel/browser-polyfill';

//Third party
import jquery from 'jquery';
import angular from 'angular';
import 'angular-route';
import 'angular-animate';
import 'angular-aria';

//DHIS2
import d2Angular from 'd2.angular';

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

angular.module('dataDictionary').directive('d2FormForModelFieldType', function ($compile) {
    return {
        restrict: 'E',
        link: function (scope, element) {
                let fieldTemplate = '';

                switch (scope.field.type) {
                    case 'select':
                        selectField();
                        break;
                    case 'textarea':
                        fieldTemplate = `<textarea name="{{field.name}}" ng-model="model[field.property]" ng-required="field.required"></textarea>`;
                        textField(fieldTemplate);
                        break;
                    default:
                        fieldTemplate = `<input name="{{field.name}}" type="{{field.type}}" placeholder="{{field.placeholder}}" ng-model="model[field.property]" ng-required="field.required"/>`;
                        textField(fieldTemplate);
                }


            function selectField() {
                let fieldTemplate = angular.element(`
                        <label>{{field.name}}</label>
                        <select name="{{field.name}}" ng-model="model[field.property]" ng-required="field.required">
                            <option ng-value="option" ng-repeat="option in field.options" ng-bind="option | lowercase"></option>
                        </select>
                `);

                element.append(fieldTemplate);
                $compile(fieldTemplate)(scope);
            }

            function textField(fieldTemplate) {
                fieldTemplate = angular.element(`
                    <d2-input>
                        <label>{{field.name}}</label>
                        ${fieldTemplate}
                    </d2-input>
                `);

                element.append(fieldTemplate);
                $compile(fieldTemplate)(scope);
            }
        }
    };
});

angular.module('dataDictionary').directive('d2FormForModel', function () {
    return {
        restrict: 'E',
        scope: {
            model: '='
        },
        template: `
           <div>
             <div class="d2-form-fields d2-form-fields-head" ng-show="hasHeaderFields()">
                 <div ng-repeat="field in formFields | filter: {isHeadField: true}">
                     <d2-form-for-model-field-type></d2-form-for-model-field-type>
                 </div>
             </div>
             <div class="d2-form-fields" ng-show="hasNormalFields()">
                 <div ng-repeat="field in formFields | filter: {isHeadField: false}">
                     <d2-form-for-model-field-type></d2-form-for-model-field-type>
                 </div>
             </div>
           </div>
       `,
        link: postLink
    };

    function postLink(scope, element) {
        let fieldsToNeverShow = ['id', 'publicAccess', 'created', 'lastUpdated'];
        let headFieldNames = ['name', 'shortName', 'code'];
        let typeMap = {
            'text': ['TEXT', 'IDENTIFIER'],
            'select': ['CONSTANT']
        };
        let propertyNames = scope.model.modelDefinition.getOwnedPropertyNames()
            .filter(propertyName => !fieldsToNeverShow.includes(propertyName))

        scope.formFields = propertyNames
            .map(getFieldConfig)
            .map(typeOverrides)
            .filter(fieldConfig => {
                if (fieldConfig.type) {
                    return true;
                }
                console.warn('No field type found for ' + fieldConfig.name, fieldConfig);
            });

        scope.hasHeaderFields = () => scope.formFields.filter(fieldConfig => fieldConfig.isHeadField).length
        scope.hasNormalFields = () => scope.formFields.filter(fieldConfig => !fieldConfig.isHeadField).length

        function getType(typeFromModel) {
            let inputType = undefined;

            Object.keys(typeMap)
                .forEach(function (typeMapKey) {
                   if (typeMap[typeMapKey].indexOf(typeFromModel) >= 0) {
                       inputType = typeMapKey;
                   }
                });

            return inputType;
        }

        function typeOverrides(fieldConfig) {
            if (fieldConfig.name === 'description') {
                fieldConfig.type = 'textarea';
            }
            return fieldConfig;
        }

        function getFieldConfig(propertyName) {
            let modelOptions = scope.model.modelDefinition.modelValidations[propertyName];

            let fieldConfig = {
                name: propertyName,
                type: getType(modelOptions.type),
                placeholder: '',
                property: propertyName,
                isHeadField: headFieldNames.includes(propertyName),
                required: modelOptions.required
            };

            if (modelOptions.constants) {
                fieldConfig.options = modelOptions.constants;
            }

            return fieldConfig;
        }
    }
});

d2Angular({
    baseUrl: '/dhis/api/',
    appName: 'dataDictionary'
});

export default dataDictionary;
