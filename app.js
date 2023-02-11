const express = require('express');
const { ServerApiVersion } = require('mongodb');
require('dotenv').config();
const username = process.env.DB_Username;
const apikey = process.env.DB_Password; 
const ContactSchema = require('./model/form');
const app = express();
const path = require('path');
//const bodyparser = require('body-parser')
var mongoose = require('mongoose');


//connection with mongodb cluster
const db = `mongodb+srv://${username}:${apikey}@cluster0.spkwxtx.mongodb.net/dancecontact?retryWrites=true&w=majority`;
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    serverApi: ServerApiVersion.v1
}).then(()=>{
    console.log("Connection succesful")
    
}).catch((err)=>{
    console.log("connection failed");
})
const port = 8000;



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
    var myData = new ContactSchema(req.body);
    myData.save().then(() => {
        
        res.redirect("contact");
        
    }).catch(() =>{
        res.status(400).send("Please give right information")
    })
    
})
app.listen(port, () => {
    console.log(`Your app is running at port ${port}`);
})