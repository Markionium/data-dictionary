import angular from 'angular';
import 'src/d2.angular/table/d2-table';
import 'src/d2.angular/table/d2-table.html';

describe('Table Directive', () => {
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
    }));
    
    it('should have be a table element', () => {
        expect(element[0].classList.contains('d2-table')).to.be.true;
    });

    describe('controller', () => {
        it('should have an array of column names', () => {
            expect(controller.columnNames).to.deep.equal(['uid', 'name', 'lastUpdated']);
        });

        it('should transform a columnName into a readable header fieldname', () => {
            expect(controller.getHeaderName('lastUpdated')).to.equal('Last Updated');
        });

        it('should have a property for rows that is empty', () => {
            expect(controller.rows).to.be.an('array');
        });

        it('should have set the sourcePromise', () => {
            expect(controller.sourcePromise.then).to.not.be.undefined;
        });

        it('should resolve a promise and add the new data to rows', inject(($q) => {
            let newData = [
                {uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow'},
                {uid: 'f1', name: 'BFG', lastUpdated: 'Last year'},
                {uid: 'c1', name: 'BFG', lastUpdated: 'Today'}
            ];

            scope.tableOptions.source = $q.when(newData);
            scope.$apply();

            expect(controller.rows).to.deep.equal(newData);
        }));
    });

    describe('table header', () => {
        let headerElement;

        beforeEach(() => {
            headerElement = element.find('thead');
        });

        it('should only have one row', () => {
            expect(headerElement.children().length).to.equal(1);
        });

        it('should display correct number of columns', () => {
            expect(headerElement.children().children().length).to.equal(3);
        });

        it('should display the correct column names', () => {
            let thElements = headerElement.children().children();

            expect(thElements[0].textContent).to.equal('Uid');
            expect(thElements[1].textContent).to.equal('Name');
            expect(thElements[2].textContent).to.equal('Last Updated');
        });
    });

    describe('data rows', () => {
        let tableBodyElement;

        beforeEach(() => {
            tableBodyElement = element.find('tbody');
        });

        it('should have one table row for each of the data rows', () => {
            expect(tableBodyElement.children().length).to.equal(controller.rows.length);
        });

        describe('single row', () => {
            let firstDataRow;

            beforeEach(() => {
                firstDataRow = tableBodyElement.children().first();
            });

            it('should have the same amount of fields like the number of columns', () => {
                expect(firstDataRow.children().length).to.equal(3);
            });

            it('should have the right data values', () => {
                expect(firstDataRow.children()[0].textContent).to.equal('a1');
                expect(firstDataRow.children()[1].textContent).to.equal('ANC');
                expect(firstDataRow.children()[2].textContent).to.equal('Yesterday');
            });

            it('should update the data values when the source changes', inject(($q) => {
                let newData = [
                    {uid: 'b1', name: 'BDC', lastUpdated: 'Tomorrow'},
                    {uid: 'f1', name: 'BFG', lastUpdated: 'Last year'},
                    {uid: 'c1', name: 'BFG', lastUpdated: 'Today'}
                ];

                scope.tableOptions.source = $q.when(newData);
                scope.$apply();

                firstDataRow = tableBodyElement.children().first();
                expect(firstDataRow.children()[0].textContent).to.equal('b1');
                expect(firstDataRow.children()[1].textContent).to.equal('BDC');
                expect(firstDataRow.children()[2].textContent).to.equal('Tomorrow');
            }));
        });
    });
});
