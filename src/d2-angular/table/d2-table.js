import angular from 'angular';
import d2TableDirective from './d2-table.directive';
import d2TablePagerDirective from './d2-table-pager.directive';

//Build the angular module
angular.module('d2-angular.table', []);
angular.module('d2-angular.table').directive('d2Table', d2TableDirective);
angular.module('d2-angular.table').directive('d2TablePager', d2TablePagerDirective);
