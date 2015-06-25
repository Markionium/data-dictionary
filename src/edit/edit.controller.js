import {SELECT, MULTISELECT} from 'd2-angular/form/fields/fields';

let headerFieldsMap = new Map([
    ['dataElementGroupSet', ['name', 'code']],
    ['categoryOptionCombo', ['name', 'code']],
    ['category', ['name', 'code']],
    ['categoryCombo', ['name', 'code']]
]);

let fieldOrder = new Map([
    ['dataElement', [
        'name', 'code', 'description', 'formName', 'domainType', 'type', 'numberType', 'aggregationOperator',
        'zeroIsSignificant', 'url', 'categoryCombo', 'optionSet', 'commentOptionSet', 'legendSet', 'aggregationLevels']],
    ['dataElementGroupSet', ['name', 'code', 'description', 'compulsory', 'dataDimension']],
    ['category', ['name', 'code', 'dataDimension', 'dataDimensionType', 'categoryOptions']],
    ['categoryCombo', ['name', 'code', 'dimensionType', 'skipTotal', 'categories']],
    ['categoryOptionGroupSet', ['name', 'description', 'dataDimension', 'categoryOptionGroups']],
    ['indicator', ['name', 'shortName', 'code', 'description', 'annualized', 'decimals', 'indicatorType', 'legendSet', 'url']],
    ['indicatorType', ['name', 'factor', 'number']],
    ['indicatorGroupSet', ['name', 'description', 'compulsory', 'indicatorGroups']]
]);

let defaultFieldIgnoreList = ['id', 'publicAccess', 'created', 'lastUpdated', 'user', 'userGroupAccesses', 'attributeValues'];
let fieldIgnoreList = new Map([
    ['dataElementGroupSet', defaultFieldIgnoreList.concat(['dataElementGroupSet'])],
    ['categoryOptionCombo', defaultFieldIgnoreList.concat(['categoryCombo', 'categoryOptions'])],
    ['categoryOption', defaultFieldIgnoreList.concat([])], //TODO: It is missing some fields (startDate, endDate)
    ['categoryOptionGroup', defaultFieldIgnoreList.concat(['categoryOptionGroupSet'])],
    ['categoryOptionGroupSet', defaultFieldIgnoreList.concat(['code'])], //TODO: Should code really be missing
    ['indicator', defaultFieldIgnoreList.concat(['denominatorDescription', 'numeratorDescription', 'denominator', 'numerator'])],
    ['indicatorType', defaultFieldIgnoreList.concat(['code'])], //TODO: Should code really be missing
    ['indicatorGroup', defaultFieldIgnoreList.concat(['code', 'indicatorGroupSet'])], //TODO: Should code really be missing
    ['indicatorGroupSet', defaultFieldIgnoreList.concat(['code'])], //TODO: Should code really be missing
]);

class EditController {
    constructor(modelToEdit, modelName, d2FormFields, models) {
        this.modelToEdit = modelToEdit;
        this.modelName = modelName;
        this.fieldManager = d2FormFields.getManager(fieldIgnoreList.has(modelName) ? fieldIgnoreList.get(modelName) : defaultFieldIgnoreList);
        this.fieldManager.setFieldOrder(fieldOrder.has(modelName) ? fieldOrder.get(modelName) : ['name', 'shortName', 'code']);
        this.fieldManager.setHeaderFields(headerFieldsMap.has(modelName) ? headerFieldsMap.get(modelName) : ['name', 'shortName']);

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
            })
            .addFieldOverrideFor('aggregationLevels', {
                type: MULTISELECT,
                source: models.organisationUnitLevel.list()
                    .then(collection => {
                        return collection.toArray()
                            .map(item => {
                                return {
                                    name: item.name,
                                    id: item.level
                                };
                            });
                    })
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
