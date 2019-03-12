const Validator = require('validator');
const validText = require('./valid-text');
const validNum = require('./valid-num');

module.exports = function validateProjectionInput(data) {
    let errors = {};

    data.yearToRetire = validNum(data.yearToRetire) ? data.yearToRetire : '';
    data.income = validNum(data.income) ? data.income : '';
    data.savingRate = validNum(data.savingRate) ? data.savingRate : '';
    data.employerMatch = validNum(data.employerMatch) ? data.employerMatch : '';

    // FEEDBACK
    // Not sure what validations we would need here
    // If the inputs are submitted through a controlled form, the user shouldn't
    // be able to submit anything outside of bounds.
    // These are the things we can validate: https://github.com/chriso/validator.js#validators

    // Thoughts: 

    // if (!Validator.isAfter(data.yearToRetire, Date.now())) {
    //     errors.yearToRetire = 'Year must be in the future';
    // }

    // if (!Validator.isFloat( data.income, {min: 0} )) {
    //     errors.income = 'Income must be greater than 0';
    // }

    // if (!Validator.isFloat( data.savingRate, {min: 0} )) {
    //     errors.income = 'Saving Rate must be greater than 0';
    // }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};