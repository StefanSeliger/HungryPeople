const express = require('express')
const app = express()
const formidable = require('formidable');
require('dotenv').config()
app.set('view engine', 'ejs');
const nodemailer = require("nodemailer");

// localhost port number
const PORT = 4000

// middleware to reach static directories 
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // parsed data from form

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
    },
    logger: true // shows if there is a successfull connection
});

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

// Booking & Reservation
app.get('/booking', function (req, res) {
    res.render('pages/booking');
});

app.post("/booking_reservation", (req, res) => {
    console.log(req.body) // form data / key -> value pairs
    const reservationData = {
        name: req.body.name,
        mail: req.body.mail,
        phone: req.body.phone,
        people: req.body.people,
        date: req.body.date,
        time: req.body.time,
    }
    transporter.sendMail({
        from: `"Hungry People Team" <${process.env.EMAIL}>`, // sender address
        to: reservationData.mail, // list of receivers
        subject: "Your Reservation at Hungry People - confirmed", // Subject line
        text: `Thank you for your reservation ${reservationData.name}! \n
                We set your table for ${reservationData.people} on ${reservationData.date} at ${reservationData.time}`, // plain text body
        html: `<h2>Thank you for your reservation ${reservationData.name}!</h2> <br>
                <p>We set your table for ${reservationData.people} on ${reservationData.date} at ${reservationData.time}</p>`, // html body
    });
    res.redirect('/booking') // back to "/booking"
})

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

app.post("/contact_confirmation", (req, res) => {
    console.log(req.body) // form data / key -> value pairs
    const contactData = {
        contactName: req.body.contactName,
        contactEmail: req.body.contactEmail,
        contactPhone: req.body.contactPhone,
        contactMessage: req.body.contactMessage,
    }
    transporter.sendMail({
        from: `"Hungry People Team" <${process.env.EMAIL}>`, // sender address
        to: contactData.contactEmail, // list of receivers
        subject: "Thank you for your message!", // Subject line
        text: `Thank you for your message ${contactData.contactName}!  We will get to you as soon as possible`, // plain text body
        html: `<h2>Thank you for your message ${contactData.contactName}!</h2> <br>
                <p>Your Message was: ${contactData.contactMessage}</p> <br>
                <p>We will get in touch with you as soon as possible!</p>`, // html body
    });
    res.redirect('/contact') // back to "/booking"
})

app.get('/feedback', function (req, res) {
    res.render('pages/feedback');
});

app.post("/feedback_confirmation", (req, res) => {
    console.log(req.body) // form data / key -> value pairs
    const feedbackData = {
        feedbackName: req.body.feedbackName,
        feedbackEmail: req.body.feedbackEmail,
        feedbackMessage: req.body.feedbackMessage,
        feedbackStars: req.body.feedbackStars,
    }
    transporter.sendMail({
        from: `"Hungry People Team" <${process.env.EMAIL}>`, // sender address
        to: feedbackData.feedbackEmail, // list of receivers
        subject: "Thank you for your message!", // Subject line
        text: `Thank you for your rating of ${feedbackData.feedbackStars} Stars ${feedbackData.feedbackName}! We hope to see you again soon.`, // plain text body
        html: `<h2>Thank you for your rating of ${feedbackData.feedbackStars} Stars ${feedbackData.feedbackName}!</h2> <br>
                <p>Your Message was: ${feedbackData.feedbackMessage}</p> <br>
                <p>We hope to see you again soon</p>`, // html body
    });
    res.redirect('/contact') // back to "/booking"
})

app.listen(PORT, () => console.log('listening on port ' + PORT))