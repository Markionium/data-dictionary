import angular from 'angular';

function d2TableDirective() {
    class D2TableDirectiveController {
        
    }

    return {
        restrict: 'E',
        replace: true,
        scope: {
            name: '=nameStuff'
        },
        templateUrl: 'd2-angular/table/d2-table.html',
        controller: D2TableDirectiveController,
        controllerAs: 'tableCtrl',
        bindToController: true
    };
}

export default d2TableDirective;
