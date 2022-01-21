const express = require('express')
const app = express()
const formidable = require('formidable');
app.set('view engine', 'ejs');
const nodemailer = require("nodemailer");

// localhost port number
const PORT = 4000

// middleware to reach static directories 
app.use(express.static('public'))

// path to files 
app.get('/', function (req, res) {
    res.render('pages/home');
});

app.get('/about', function (req, res) {
    res.render('pages/about');
});

app.get('/team', function (req, res) {
    res.render('pages/team');
});

app.get('/booking', function (req, res) {
    res.render('pages/booking');
});

app.get('/menu', function (req, res) {
    res.render('pages/menu');
});

app.get('/galerie', function (req, res) {
    res.render('pages/galerie');
});

app.get('/events', function (req, res) {
    res.render('pages/events');
});

app.get('/contact', function (req, res) {
    res.render('pages/contact');
});

app.get('/feedback', function (req, res) {
    res.render('pages/feedback');
});

app.listen(PORT, () => console.log('listening on port ' + PORT))