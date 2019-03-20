const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const config = require('./config');
const User = require('./app/models/user')
const apiRoutes = require('./api')

const app = express();

//setting
const port = process.env.PORT || 3000;
mongoose.connect(config.database, {useNewUrlParser: true})
// .then(res=>{
//     console.log('Bd online');
// })
mongoose.Promise=global.Promise;

app.set('supersecret', config.secret);


// Middlewarwes
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(morgan('dev'))

//routes
app.get('/rey', (req, res)=>{
    res.json({message : 'Hola rey'})
})

app.get('/setup', (req, res)=>{
    const testUser = new User({
        name: 'Marcelo',
        password: '123456',
        admin: true
    });

    testUser.save((err)=>{
       if (err) {
         return console.log('err');
       }
       res.json({
           success: true
       })

    })
});

//api
app.use('/api', apiRoutes)

app.listen(3000, ()=>{
    console.log('Server on port 3000');
})