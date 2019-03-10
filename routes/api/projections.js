const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Projection = require('../../models/Projection');
const validateProjectionInput = require('../../validation/projections');


// Get saved projections for a user
router.get('/user/:user_id', (res, req) => {
    Projection.find( {user: req.params.user_id})
        .then(projections => res.json(projections))
        .catch(err => 
            res.status(404).json({ noprojectionsfound: 'No projections found for this user'}
        )
    );
});

// Get saved projections by projection id
router.get('/:id', (req, res) => {
    Projection.findById(req.params.id)
        .then(projection => res.json(projection))
        .catch( err => 
            res.status(404).json({ noprojectionfound: 'No projection found with that id'}
        )
    );
});

// Submit a new projection model
// Currently behind authentication in order to save for a specific user
// If someone isn't logged in, we (probably) won't persist the projection
// to the server. If we want to do that, we'd probably need an open
// route to just save any projections

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const {errors, isValid} = validateProjectionInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newProjection = new Projection({
            user: req.user.id,
            yearToRetire: req.body.yearToRetire,
            income: req.body.income,
            savingRate: req.body.savingRate,
            employerMatch: req.body.employerMatch 
        });

        newProjection.save().then(projection => res.json(projection));
    }
);

module.exports = router;