const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dance-contact', {useNewUrlParser: true});
const port = 8000;

//Defining mongoose schema

var ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    feedback: String
});

var Contact = mongoose.model('Contact', ContactSchema);

app.use('/static', express.static('static'));// for serving static files
app.use(express.urlencoded());

app.set('view engine', 'pug'); //set the template engine in  pug
app.set('views', path.join(__dirname, 'views'));  //set the views directory


app.get('/', (req,res) =>{
    res.status(200).render('home.pug');

})

app.get('/contact', (req,res) =>{
    res.status(200).render('contact.pug');
    
})

app.post('/contact', (req,res) =>{
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("Thank you for giving your valuable time for us. Your feedback really matters.")
    }).catch(() =>{
        res.status(400).send("Please give right information")
    })

    // res.status(200).render('contact.pug');
    
})
app.listen(port, () => {
    console.log(`Your app is running at port ${port}`);
})