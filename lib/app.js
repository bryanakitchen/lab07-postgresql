const express = require('express');
const Artist = require('./models/Artist');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/api/v1/artists', (req, res, next) => {
  Artist
    .find()
    .then(artists => res.send(artists))
    .catch(next);
});

app.post('/api/v1/artists', (req, res, next) => {
  Artist
    .insert(req.body)
    .then(artist => res.send(artist))
    .catch(next);
});

app.get('/api/v1/artists/:id', (req, res, next) => {
  Artist
    .findById(req.params.id)
    .then(artist => res.send(artist))
    .catch(next);
});



module.exports = app;
