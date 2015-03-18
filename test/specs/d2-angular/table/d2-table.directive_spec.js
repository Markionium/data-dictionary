import angular from 'angular';
import 'src/d2-angular/table/d2-table';
import 'src/d2-angular/table/d2-table.html';

describe('Table Directive', () => {
    let element;
    let scope;

    beforeEach(module('d2-angular/table/d2-table.html'));
    beforeEach(module('d2-angular.table'));
    beforeEach(inject(($compile, $rootScope) => {
        element = angular.element('<d2-table name-stuff="name"></d2-table>');

        scope = $rootScope.$new();
        scope.name = 'Mark';

        $compile(element)(scope);
        scope.$digest();
    }));
    
    it('should have be a table element', function () {
        expect(element[0].classList.contains('d2-table')).to.be.true;
    });

    it('should show the name Mark', () => {
        expect(element.find('td').html()).to.equal('Mark');
    });
});
