const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("we're connected!");
});


const gifSchema = new mongoose.Schema({
    name: String,
    id: String,
    url: String,
    caption: String,
    vote: Number
});

const Gif = mongoose.model('Gif', gifSchema);

// const fluffy = new Gif({ name: 'fluffy' });
// fluffy.save(function (err, fluffy) {
//     if (err) return console.error(err);
// });

// Gif.find(function (err, kittens) {
//     if (err) return console.error(err);
//     console.log(kittens);
// })
module.exports = {
    Gif,
}