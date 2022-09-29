//express is used for making network/server request
const express = require('express')
const app = express();
//morgan: middleware to log http request and error
const morgan = require('morgan')
//mongoose
const mongoose = require('mongoose')

//import the Blog file from model folder
const Blog = require('./models/blog')

//connect to mongodb
const dbUri = 'mongodb+srv://netninja:Siddiq12345@nodetuts.uru0y2a.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch(err => console.log(err))


//for sending single line
/* app.get('/', (req, res) =>{
    res.send('<p>home page</p>');
})
app.get('/about', (req, res) =>{
    res.send('<p>about page</p>')
}) */

//EJS is a simple templating language that lets you generate HTML markup with plain JavaScript.
//to register the engine
app.set('view engine', 'ejs')

//listen for requet
// app.listen(3000);


//middleware and static files like style.css on public folder
//to use external file we need to use this
app.use(express.static('public'))

//middleware
// app.use((req, res, next) => {
//     console.log('new request made')
//     console.log('host: ', req.hostname)
//     console.log('path: ', req.path)
//     console.log('method: ', req.method)
//     next()
// })

//the above middleware can be simplified by using morgan middleware
app.use(morgan('dev'))

//routes for all the blogs
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/blogs', (req, res) => {
    Blog.find()
    .then(result => {
        res.render('index', { title: 'All Blogs', blogs: result })
    })
    .catch(err => console.log(err))
})



// to get data statically from mongoose and mongo
/* 
//mongoose and mongo data sending routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    })
    blog.save()
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

//to get all the blogs
app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

//to find blog by id
app.get('/single-blog', (req, res) => {
    Blog.findById('62f14806059e523cae78d30b')
    .then(result => res.send(result))
    .catch(err => console.log(err))
})
 */



//for sending file
/* 
app.get('/', (req, res) =>{
    //by using sendFile
    // res.sendFile('./views/index.html', { root: __dirname});

    //by using render
    const blogs = [
        {title: 'my Blog 1', snippet: 'Lorem ipsum dolor, sit amet'},
        {title: 'my Blog 1', snippet: 'Lorem ipsum dolor, sit amet'},
        {title: 'my Blog 1', snippet: 'Lorem ipsum dolor, sit amet'}
    ]
    res.render('index', { title: 'Home', blogs: blogs || blogs })
}) */

app.get('/about', (req, res) =>{
    res.render('about', { title: 'About' })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' })
})

//redirect to 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})
