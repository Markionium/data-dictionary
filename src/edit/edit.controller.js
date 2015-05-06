class EditController {
    constructor(modelToEdit, modelName, d2FormFields) {
        this.modelToEdit = modelToEdit;
        this.modelName = modelName;
        this.fieldManager = d2FormFields.getManager();

        this.fieldManager
            .addFieldOverrideFor('type', {
                type: 'select',
                options: [
                    'int',
                    'string',
                    'bool',
                    'trueOnly',
                    'date',
                    'username'
                ],
                onChange: model => console.log('New type value is ' + model.type)
            })
            .addFieldOverrideFor('aggregationOperator', {
                type: 'select',
                options: [
                    'sum',
                    'average',
                    'avg',
                    'count',
                    'stddev',
                    'variance',
                    'min',
                    'max'
                ],
                hideWhen: model => ['bool', 'trueOnly', 'int'].includes(model.type) === false,
                onChange: model => console.log('New aggregationOperator value is ' + model.aggregationOperator)
            })
            .addFieldOverrideFor('numberType', {
                type: 'select',
                options: [
                    'number',
                    'int',
                    'posInt',
                    'negInt',
                    'zeroPositiveInt',
                    'unitInterval',
                    'percentage'
                ],
                hideWhen: model => model.type !== 'int',
                onChange: model => console.log('New numberType value is ' + model.numberType)
            })
            .addFieldOverrideFor('textType', {
                type: 'select',
                options: [
                    'text',
                    'longText'
                ],
                hideWhen: model => model.type !== 'string'
            });
    }

    save() {
        let validationStatus = this.modelToEdit.validate();
        console.log(validationStatus);

        this.modelToEdit.save()
            .then(() => window.alert('Success'))
            .catch(error => {
                window.alert(error);
            });
    }
}

export default EditController;
