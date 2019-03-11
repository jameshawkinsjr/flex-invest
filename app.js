const mongoose = require ('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
// const db = require('./config/keys').mongoURI;

const users = require('./routes/api/users');
const projection = require('./routes/api/projection');
const funds = require('./routes/api/funds');

const app = express();

const uristring = process.env.PROD_MONGODB

mongoose
    .connect(uristring, {useNewUrlParser: true})
    .then( () => console.log('Connected to MongoDB successfully'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded( { extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/projection', projection);
app.use('/api/funds', funds);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));