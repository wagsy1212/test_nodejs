const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const route = require('./routes');
const Board = require('./app/model/Board');
const { multipleMongooseToObject } = require('./util/mongoose');
const { CONNECT_DB, GET_DB, connectToMongoDB } = require('./config/mongodb');
// import express from 'express';
// import morgan from 'morgan';
// import { engine } from 'express-handlebars';

const START_SERVER = () => {
    const app = express();
    const port = 3000;

    // Path Image
    app.use(express.static('./src/public'));

    // HTTP logger
    app.use(morgan('combined'));

    // Tempalte Engine
    app.engine('.hbs', engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b
        }
    }));
    app.set('view engine', '.hbs');
    app.set('views', './src/resources/views');

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // override with POST having ?_method=PUT
    app.use(methodOverride('_method'))

    // route init
    // route(app);
    app.get('/', async (req, res, next) => {
        Board.find({})
            .then(courses => res.render('home', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next)
    })

    app.get('/mongodb', async (req, res) => {
        // console.log(await GET_DB().listCollections().toArray());
        res.send('MONGODB');
    })

    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
}

connectToMongoDB()
    .then(() => console.log('Connected to MongoDB Cloud Atlas!'))
    .then(() => START_SERVER())
    .catch(error => {
        console.error(error);
        process.exit(0);
    })