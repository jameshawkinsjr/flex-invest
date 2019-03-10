const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateProjectionInput(data) {
    let errors = {};

    // FEEDBACK
    // Not sure what kind of validations are needed here
    // if we're seeding the database with info and will
    // presumably be sanitizing our own inputs.
    
    data.rank = validNum(data.yearToRetire) ? data.yearToRetire : '';
    data.fundName = validText(data.income) ? data.income : '';
    data.symbol = validText(data.savingRate) ? data.savingRate : '';
    data.assets = validNum(data.employerMatch) ? data.employerMatch : '';
    // data.return = validNum(data.employerMatch) ? data.employerMatch : '';
    // data.fundType = validNum(data.employerMatch) ? data.employerMatch : '';


    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};