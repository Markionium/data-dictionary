class ListController {
    constructor(models, $routeParams) {
        if ($routeParams.modelName && models[$routeParams.modelName]) {
            this.source = models[$routeParams.modelName].list();
        }

        this.columns = ['id', 'name'];
    }
}

export default ListController;
