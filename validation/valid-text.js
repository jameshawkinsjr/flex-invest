const validText = str => {
    return typeof str === 'string' && str.trim().length > 0;
}

const validNum = num => {
    return typeof num === 'number';
}

module.exports = { validText, validNum };