const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const loginAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // find all posts
        const postData = await Post.findAll({
            include: [
                { 
                    model: User,
                    attributes: ['username'],
                }
            ],
        });
        // convert to plain to read data
        const posts = postData.map((post) => post.get({ plain: true }));
        // render post page with logged in true and display relevant posts
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error)
    }
})

// login auth to ensure user is logged in prior to access page
router.get('/dashboard', loginAuth, async (req, res) => {
    try {
        // find all posts
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                { 
                    model: User,
                    attributes: ['username'],
                }
            ],
        });
        // convert to plain to read data
        const posts = postData.map((post) => post.get({ plain: true }));
        // render post page with logged in true and display relevant posts
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error)
    }
})

// login auth to ensure user is logged in prior to access page
router.get('/posts/:id', loginAuth, async (req, res) => {
    try {
        // find post by id
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['username'],
                        }
                    ]
                }
            ],
        });
        // convert to plain to read data
        const post = postData.get({ plain: true });
        
            // render post page with logged in true and display relevant posts
            req.session.save(() => {
                req.session.post_id = req.params.id
                console.log(req.session.post_id)
                res.render('post', {
                    post,
                    logged_in: req.session.logged_in,
                });
            })
        } catch (error) {
        res.status(500).json(error)
    }
})

// login auth to ensure user is logged in prior to access page
router.get('/new', loginAuth, (req, res) => {
    res.render('newpost', {
        // check if user is logged in
        logged_in: req.session.logged_in
    })
})

// login auth to ensure user is logged in prior to access page
router.get('/edit/:id', loginAuth, async (req, res) => {
    try {
        // find post by id
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                model: Comment,
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    }
                ]
                }
            ],
          });
        // convert to plain to read data
        const post = postData.get({ plain: true });

        // render post page with logged in true and display relevant posts
        req.session.save(() => {
            req.session.post_id = req.params.id
        })
        res.render('editpost', {
            post,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/login', (req, res) => {
    // check if user is already logged in / redirect to dash
    if(req.session.logged_in){
        return res.redirect('/dashboard');
    }
    // allow through to login page
    return res.render("login")
})

router.get('/signup', (req, res) => {
    // check if user is already logged in / redirect to dash
    if(req.session.logged_in){
        return res.redirect('/dashboard');
    }
    // allow through to login page
    return res.render("signup")
})

// when post logout, destroy session
router.get('/logout', (req, res) => {
    // check if user is actually logged in
    if (req.session.logged_in) {
        // end and destroy session
      req.session.destroy(() => {
        res.render('homepage');
        res.status(204).end();
      });
    } else {
        // if user was not logged in end and send error
      res.status(404).end();
    }
});

module.exports = router;