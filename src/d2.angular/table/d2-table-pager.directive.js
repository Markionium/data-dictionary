function d2TablePagerDirective() {
    return {
        restict: 'E',
        require: '^d2Table',
        templateUrl: 'd2.angular/table/d2-table-pager.html',
        controllerAs: 'tableCtrl',
        link: function (scope, element, attr, controller) {
            scope.getNextPageClick = function () {
                controller.tableDataSource = controller.pager.getNextPage();
                controller.initialise();
            };

            scope.getPreviousPageClick = function () {
                controller.tableDataSource = controller.pager.getPreviousPage();
                controller.initialise();
            };

            scope.goToPageClick = function (pageNr) {
                controller.tableDataSource = controller.pager.goToPage(pageNr);
                controller.initialise();
            };

            scope.$watch(function () {
                return controller.pager;
            }, function (newVal, oldVal) {
                let pages = [];

                if (!controller.pager || newVal === oldVal) {return;}

                if (controller.pager.page >= 3) {
                    pages.push({pageNr: 1, active: false});

                    if (controller.pager.page > 3) {
                        pages.push({separator: '...'});
                    }
                }

                for (let i = controller.pager.page - 1; i < controller.pager.page + 2 && i <= controller.pager.pageCount; i += 1) {
                    if (i > 0) {
                        pages.push({pageNr: i, active: controller.pager.page === i ? true : false});
                    }
                }

                if (controller.pager.page <= controller.pager.pageCount - 2) {
                    if (controller.pager.page !== controller.pager.pageCount - 2) {
                        pages.push({separator: '...'});
                    }
                    pages.push({pageNr: controller.pager.pageCount, active: false});
                }

                scope.pagination = pages;
            });
        }
    };
}

export default d2TablePagerDirective;
