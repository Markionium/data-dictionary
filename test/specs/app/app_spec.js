import angular from 'angular';

describe('', () => {
    it('should have loaded angular', () => {
        expect(angular).to.equal(window.angular);
    });
});
