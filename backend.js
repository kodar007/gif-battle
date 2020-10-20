var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var _ = require('lodash');
var cors = require('cors');
var { Gif } = require('./db');
var app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('hi from api');
})

// CREATE =============================

// GET a random gif from giphy, return that to our user

app.get('/random', (req, res) => {
    const apiKey = process.env['GIPHY_API_KEY'];
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&filter=G`;
    request.get(url, (error, request, body) => {
        body = JSON.parse(body);
        const gif = {
            id: body.data.id,
            url: body.data.image_original_url
        }
        res.json(gif);
    })
})

// POST create a gif with caption

app.post('/', (req, res) => {
    const gif = new Gif(req.body);
    // store into our database
    gif.save(function (err, gif) {
        if (err) return res.json(err);
        res.json({ message: 'successfully stored gif!' });
    });
})

// Battle =============================

// GET: return a battle (2 gifs)

app.get('/versus', (req, res) => {
    // res.send('getting versus');
    Gif.find((err, data) => {
        data = _.shuffle(data);
        const twoGifs = data.slice(0, 2);
        res.json(twoGifs);
    });
})

// POST: vote on a certain gif

app.post('/vote', (req, res) => {
    Gif.find({ id: req.body.id }, (err, data) => {
        const gif = data[0];
        gif.vote += 1;
        gif.save(function (err, newGif) {
            if (err) return res.json(err);
            res.json({ message: 'vote incremented!' });
        });
    });
})

// Leaderboard =============================

// GET: leaderboard

app.get('/leaderboard', (req, res) => {
    Gif.find((err, data) => {
        data = data.sort((a, b) => b.vote - a.vote);
        res.json(data);
    });
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// module.exports = Webtask.fromExpress(app);
