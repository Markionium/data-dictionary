import {SELECT} from 'd2-angular/form/fields/fields';

class EditController {
    constructor(modelToEdit, modelName, d2FormFields) {
        this.modelToEdit = modelToEdit;
        this.modelName = modelName;
        this.fieldManager = d2FormFields.getManager();
        this.fieldManager.setFieldOrder(['name', 'shortName', 'code']);
        this.fieldManager.setHeaderFields(['name', 'shortName']);

        this.fieldManager
            .addFieldOverrideFor('type', {
                type: SELECT,
                templateOptions: {
                    options: [
                        'int',
                        'string',
                        'bool',
                        'trueOnly',
                        'date',
                        'username'
                    ]
                }
            })
            .addFieldOverrideFor('aggregationOperator', {
                type: SELECT,
                templateOptions: {
                    options: [
                        'sum',
                        'average',
                        'avg',
                        'count',
                        'stddev',
                        'variance',
                        'min',
                        'max'
                    ]
                },
                hideExpression: ($viewValue, $modelValue, scope) => !(['bool', 'trueOnly', 'int']
                    .includes(scope.model.type))
            })
            .addFieldOverrideFor('numberType', {
                type: SELECT,
                templateOptions: {
                    options: [
                        'number',
                        'int',
                        'posInt',
                        'negInt',
                        'zeroPositiveInt',
                        'unitInterval',
                        'percentage'
                    ]
                },
                hideExpression: ($viewValue, $modelValue, scope) => scope.model.type !== 'int'
            })
            .addFieldOverrideFor('textType', {
                type: SELECT,
                templateOptions: {
                    options: [
                        'text',
                        'longText'
                    ]
                },
                hideExpression: ($viewValue, $modelValue, scope) => scope.model.type !== 'string'
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
