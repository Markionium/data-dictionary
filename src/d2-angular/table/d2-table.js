import angular from 'angular';
import d2TableDirective from './d2-table.directive';

//Build the angular module
angular.module('d2-angular.table', []);
angular.module('d2-angular.table').directive('d2Table', d2TableDirective);
