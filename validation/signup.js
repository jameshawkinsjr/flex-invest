const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateSignupInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';
    data.email = validText(data.email) ? data.email: '';
    data.password = validText(data.password) ? data.password : '';

    if (!Validator.isLength(data.name, {min: 1, max: 30} )) {
        errors.name = 'Name must be between 1 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required.';
    }

    if (!Validator.isLength(data.password, {min: 8} )) {
        errors.password = 'Password must be at least 8 characters';
    }

    if (!Validator.isLength(data.handle, {max: 50} )) {
        errors.password = 'Password must be fewer than 50 characters';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}