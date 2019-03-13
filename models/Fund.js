const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FundSchema = new Schema({
    symbol: {
        type: String,
    },
    fund_name: {
        type: String,
        required: true,
    },
    asset_class_1: {
        type: String,
    },
    asset_class_2: {
        type: String,
    },
    exp_ratio: {
        type: String,
    },
    aum: {
        type: String,
    },
    pct_of_all_401k_assets: {
        type: String,
    },
    yr1: {
        type: String,
    },
    yr3: {
        type: String,
    },
    yr5: {
        type: String,
    },
    yr10: {
        type: String,
    },
});

module.exports = Fund = mongoose.model('fund', FundSchema);