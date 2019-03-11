const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    yearToRetire: {
        type: Number,
        required: true,
    },
    income: {
        type: Number,
        required: true,
    },
    currentSavings: {
        type: Number,
        required: true
    },
    savingRate: {
        type: Number,
        required: true,
    },
    employerMatch: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Projection = mongoose.model('projection', ProjectionSchema);