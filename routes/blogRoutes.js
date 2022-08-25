const express = require('express')


//controllers
const blogController = require('../controllers/blogController')

// const Blog = require('./models/blog');
//instead of above line  we can use  a router
const router = express.Router()



//routes for all the blogs
// router.get('/', (req, res) => {
//     res.redirect('/blogs')
// })

router.get('/', blogController.blog_index )


//post data
router.post('/', blogController.blog_create_post)


// router.get('/about', (req, res) =>{
//     res.render('about', { title: 'About' })
// })

router.get('/create', blogController.blog_create_get)



//routing particular blog
router.get('/:id', blogController.blog_details)


//delete blog reques
router.delete('/:id', blogController.blog_delete)


module.exports = router