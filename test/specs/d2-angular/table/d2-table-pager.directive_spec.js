import angular from 'angular';
import 'src/d2.angular/table/d2-table';
import 'src/d2.angular/table/d2-table.html';
import 'src/d2.angular/table/d2-table-pager.html';

describe('Table pager', () => {
    let element;
    let scope;
    let isolatedScope;
    let controller;

    beforeEach(module('d2.angular/table/d2-table.html'));
    beforeEach(module('d2.angular/table/d2-table-pager.html'));
    beforeEach(module('d2.angular.table'));
    beforeEach(inject(($compile, $rootScope) => {
        element = angular.element('<d2-table column-names="tableOptions.columnNames" table-data-source="tableOptions.source"></d2-table>');

        scope = $rootScope.$new();
        scope.tableOptions  = {
            columnNames: ['uid', 'name', 'lastUpdated'],
            source: [
                {uid: 'a1', name: 'ANC', lastUpdated: 'Yesterday'},
                {uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow'},
                {uid: 'c1', name: 'BFG', lastUpdated: 'Today'}
            ]
        };

        $compile(element)(scope);
        scope.$digest();

        isolatedScope = element.scope();
        controller = element.controller('d2-table');
        controller.pager = {
            page:1,
            pageCount: 65,
            total: 3216,
            nextPage: 'http://localhost:8080/dhis/api/users?page=2',
            hasNextPage: false
        };
        scope.$apply();
    }));

    it('should have a pager element', function () {
        expect(element[0]).not.to.be.undefined;
    });

    describe('without pager', () => {
        beforeEach(() => {
            delete controller.pager;
            scope.$apply();

            element = element.find('.d2-table-pager');
        });

        it('should not have a pager tag', () => {
            expect(element[0]).to.be.undefined;
        });
    });

    describe('next button', () => {
        let nextButton;

        beforeEach(() => {
            nextButton = element.find('.next-button');
        });

        it('should be shown', () => {
            expect(nextButton).not.to.be.undefined;
        });

        it('should not be shown', () => {
            controller.pager.hasNextPage = false;
            nextButton = element.find('.next-page');

            expect(nextButton[0].classList.contains('ng-hide')).to.be.true;
        });
    });
});