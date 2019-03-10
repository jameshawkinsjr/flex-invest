const Validator = require('validator');
const validText = require('./valid-text');
const validNum = require('./valid-num');

module.exports = function validateFundInput(data) {
    let errors = {};

    // FEEDBACK
    // Not sure what kind of validations are needed here
    // if we're seeding the database with info and will
    // presumably be sanitizing our own inputs.
    
    data.rank = validNum(data.rank) ? data.rank : '';
    data.fundName = validText(data.fundName) ? data.fundName : '';
    data.symbol = validText(data.symbol) ? data.symbol : '';
    data.assetsUnderManagment = validNum(data.assetsUnderManagment) ? data.assetsUnderManagment : '';

    
    ////////////////////////////////////
    // Probably need custom written validations for these if we're going to 
    // validate them -- like "valid-returns" and "valid-type-array" or something

    // data.return = validNum(data.return) ? data.return : '';
    // data.fundType = validNum(data.fundType) ? data.fundType : '';
    ////////////////////////////////////


    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
