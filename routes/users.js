const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
//login page
router.get('/login', (req, res) => res.render('login'))

//login page
router.get('/register', (req, res) => res.render('register'))

//user handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = []
    console.log(req.body);
    //check empty
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'please fill the filds' })

    }

    //password macth
    if (password2 !== password) {
        errors.push({ msg: 'passwors not match' })
    }
    //password length
    if (password.length < 6) {
        errors.push({ msg: 'please choose stranger password' })

    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }
    else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                console.log(newUser)
                res.send('hello')

                newUser.save();
            }
        })

    }
});





module.exports = router;