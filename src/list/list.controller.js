class ListController {
    constructor(models, $routeParams) {
        if ($routeParams.modelName && models[$routeParams.modelName]) {
            this.modelName = $routeParams.modelName;
            this.source = models[$routeParams.modelName].list();
        }

        this.columns = ['name', 'code'];
    }
}

export default ListController;
