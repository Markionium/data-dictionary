function d2TablePagerDirective() {
    return {
        restict: 'E',
        require: '^d2Table',
        templateUrl: 'd2.angular/table/d2-table-pager.html',
        controllerAs: 'tableCtrl'
    };
}

export default d2TablePagerDirective;