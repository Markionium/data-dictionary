class AppController {
    constructor(models, Api) {
        this.name = 'MyApp';
        models.dataElement.list()
            .then((dataElementCollection) => {
                dataElementCollection.forEach(printName);
            });
    }
}

let printName = (dataElementModel) => {
    console.log(dataElementModel.name);
};

export default AppController;
