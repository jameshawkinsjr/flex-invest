const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FundSchema = new Schema({
    rank: {
        type: Number,
        min: 1,
    },
    fundName: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
        uppercase: true,
    },
    // FEEDBACK
    // https://mongoosejs.com/docs/schematypes.html#mixed
    // Mixed type schema should allow us to create a POJO
    // for yearly returns, e.g. { 1: 7%, 3: 12%, 5: 13%, 10: 14%}
    // Not sure if this is the best way to do this.
    return: {
        type: Schema.Types.Mixed,
        required: true,
    },
    assetsUnderManagment: {
        type: Number,
    },
    fundType: {
        type: [String],
    },
});

module.exports = Fund = mongoose.model('fund', FundSchema);