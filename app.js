const mongoose = require ('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require('./config/keys').mongoURI;

const users = require('./routes/api/users');
const projection = require('./routes/api/projection');
const funds = require('./routes/api/funds');

const app = express();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/public'));
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
    })
  }

mongoose
    .connect(db, {useNewUrlParser: true})
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