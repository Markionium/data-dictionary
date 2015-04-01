function d2TableDirective($q) {
    function D2TableDirectiveController() {
        this.isLoading = false;
        this.tableDataSource;
        this.sourcePromise;
        this.columnNames;
        this.rows = [];

        this.initialise();
    }

    D2TableDirectiveController.prototype = {
        initialise() {
            this.isLoading = true;
            this.sourcePromise = $q.when(this.tableDataSource);
            this.updateRows();
        },

        getHeaderName(columnName) {
            return columnName.replace(/([A-Z])/, ($0) => ' ' + $0).replace(/^(.)/, ($0) => $0.toUpperCase());
        },

        updateRows() {
            this.sourcePromise
                .then((data) => {
                    if (data.pager) {
                        this.pager = data.pager;
                    }
                    if (data.toArray) {
                        data = data.toArray();
                    }
                    this.rows = data;
                })
                .finally(() => this.isLoading = false);
        }
    };

    return {
        restrict: 'E',
        replace: true,
        scope: {
            columnNames: '=',
            tableDataSource: '='
        },
        template: `
            <div class="d2-table">
                <div class="mask">
                    <div ng-show="tableCtrl.isLoading" layout="row" layout-sm="column" layout-align="space-around">
                        <md-progress-circular md-mode="indeterminate"></md-progress-circular>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th ng-repeat="columnName in tableCtrl.columnNames"
                                ng-bind="tableCtrl.getHeaderName(columnName)">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="row in tableCtrl.rows">
                            <td data-title="{{::tableCtrl.getHeaderName(columnName)}}"
                                ng-repeat="columnName in ::tableCtrl.columnNames"
                                ng-bind="::row[columnName]">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <d2-table-pager></d2-table-pager>
            </div>
        `,
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
