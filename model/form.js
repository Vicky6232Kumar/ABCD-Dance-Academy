// import mongoose from 'mongoose';
const mongoose = require('mongoose')
const formSchema = new mongoose.Schema({
    name: String,
    phone: String,
    feedback: String,
    date: {
        type:Date,
        default:Date.now

    }
});
const ContactSchema = mongoose.model('ContactSchema', formSchema);

module.exports = ContactSchema;
