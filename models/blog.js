const mongoose = require('mongoose')
const Schema = mongoose.Schema;


//to create schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true })

//to connect with database blogs
//second parameter is the object(schema) to attach
const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog