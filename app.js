const express = require('express');
const data = require('./data.json');

const app = express();
const { projects } = data;


//middleware
app.set('view engine', 'pug');

app.use('/static', express.static('public')); 


//created routes
app.get('/', (req, res) => {
    res.render('index', { projects } )    
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/projects/:id', (req, res, next) => {
    const {id} = req.params;
    const project = projects[id];

    if (project) {
        res.render('project', { project });
    } else {
        next();
    }
});

//error handler
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "Oops! Looks like the page you requested doesn't exist";
    next(err);
});

//global error handler.
app.use((req, res, next) => {
    if (err.status === 404) {
        res.status(404).render('page-not-found', err);
    } else {
        err.message = err.message || 'Oops! It looks like something went wrong on the server.';
        res.status(err.status || 500);
        res.render('error', err);
    }
});


//listner/host
app.listen(3000, () => {
    console.log('The app is running on localhost:3000');
});