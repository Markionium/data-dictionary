class EditController {
    constructor(modelToEdit, modelName) {
        this.modelToEdit = modelToEdit;
        this.modelName = modelName;
    }

    save() {
        let validationStatus = this.modelToEdit.validate();
        console.log(validationStatus);

        this.modelToEdit.save()
            .then(() => alert('Success'))
            .catch(error => {
                console.log(error);
                alert('Failed')
            });
    }
}

export default EditController;