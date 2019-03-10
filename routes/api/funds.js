const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Fund = require('../../models/Fund');
const validateFundInput = require('../../validation/funds');


// Get all funds
router.get('/', (req, res) => {
    Fund.find()
        .sort( { rank: -1 })
        .then(funds => res.json(funds))
        .catch( err => res.status(400).json( {nofunds: "No funds found"}));
});

// FEEDBACK
// Get funds by ID (or symbol?)
router.get('/:id', (req, res) => {
    Fund.findById(req.params.id)
        .then(fund => res.json(fund))
        .catch( err => 
            res.status(404).json({ nofundfound: 'No fund found with that id'}
        )
    );
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const {errors, isValid} = validateFundInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newFund = new Fund({
            rank: req.body.rank,
            fundName: req.body.fundName,
            symbol: req.body.symbol,
            return: req.body.return,
            assetsUnderManagment: req.body.assetsUnderManagment,
            fundType: req.body.fundType,
        });

        newFund.save().then(fund => res.json(fund));
    }
);

module.exports = router;