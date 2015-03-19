function d2TableDirective($q) {
    function D2TableDirectiveController() {
        this.tableDataSource;
        this.sourcePromise;
        this.columnNames;
        this.rows = [];

        this.initialise();
    }

    D2TableDirectiveController.prototype = {
        initialise() {
            this.sourcePromise = $q.when(this.tableDataSource);
            this.updateRows();
        },

        getHeaderName(columnName) {
            return columnName.replace(/([A-Z])/, ($0) => ' ' + $0).replace(/^(.)/, ($0) => $0.toUpperCase());
        },

        updateRows() {
            this.sourcePromise.then((data) => {
                if (data.toArray) {
                    if (data.pager) {
                        this.pager = data.pager;
                    }
                    data = data.toArray();
                }
                this.rows = data;
            });
        }
    };

    return {
        restrict: 'E',
        replace: true,
        scope: {
            columnNames: '=',
            tableDataSource: '='
        },
        templateUrl: 'd2.angular/table/d2-table.html',
        controller: D2TableDirectiveController,
        controllerAs: 'tableCtrl',
        bindToController: true,
        link: ($scope, element, attr, controller) => {
            $scope.$watch('tableCtrl.tableDataSource', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    controller.initialise();
                }
            });
        }
    };
}

export default d2TableDirective;
