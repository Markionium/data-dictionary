class AppController {
    constructor(models) {
        this.name = 'MyApp';

        this.source = models.user.list();
        this.columns = ['id', 'name'];
    }
}

let printName = (dataElementModel) => {
    console.log(dataElementModel.name);
};

export default AppController;
