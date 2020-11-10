var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        ifEquals: (arg1, arg2, options) => {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('phpmyadmin', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize
    .authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

var dashboardItem = sequelize.define('Dashboard', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    subtitle: {
        type: Sequelize.STRING
    },
    isLocked: {
        type: Sequelize.BOOLEAN
    },
    path: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.INTEGER
    },
})

app.get('/', async (req, res) => {

    let days = await dashboardItem.findAll();
    days = days.map(elem => elem.dataValues)
    res.render('home', { days });
});

app.get('/candy', (req, res) => {
    res.render('candy');
});

app.get('/forca', (req, res) => {
    res.render('forca');
});

app.listen(3000);