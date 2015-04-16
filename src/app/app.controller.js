class AppController {
    constructor(models) {

        this.columns = ['id', 'name'];
    }
}

let printName = (dataElementModel) => {
    console.log(dataElementModel.name);
};

export default AppController;
