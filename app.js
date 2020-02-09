const express = require('express')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const app = express()


//config db
const db = require('./config/keys').mongoURI
//mongo connect
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('db connected'))
    .catch(err => console.log(err));

//ejs
app.use(expressLayout)
app.set('view engine', 'ejs')

//bodyParser
app.use(express.urlencoded({ extended: false }))

//route
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


app.listen(3000, (req, res) => console.log('app started...'))